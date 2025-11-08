import { api } from "@/api"
import { queryClient, router } from "@/main"
import { loginMutationOptions } from "@/mutations/login"
import { profileQueryOptions } from "@/queries/profile"
import type { User } from "@/types/user"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useEffect, useState, createContext, useContext } from "react"
import { toast } from "sonner"

export interface AuthState {
  isAuthenticated: boolean
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  hasRole: (role: string) => boolean
  hasAnyRole: (roles: string[]) => boolean
}

const AuthContext = createContext<AuthState | undefined>(undefined)

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: Readonly<AuthProviderProps>) {
  const [token, setToken] = useState<string | null>(localStorage.getItem('auth-token'))
  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
      delete api.defaults.headers.common['Authorization']
    }
  }, [token])

  const { data: user, isLoading, refetch: refetchProfile } = useQuery({
    ...profileQueryOptions(token || undefined), 
    enabled: !!token,
    retry: 1,
  })
  const { mutateAsync: loginMutateAsync } = useMutation(loginMutationOptions);

  useEffect(() => {
    if (user) {
      console.log("Setting up interceptor for token expiration handling.");
      api.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401 && window.location.pathname !== '/login') {
                toast.error("Você foi desconectado. Por favor, faça login novamente.", {id: 'token-expired'});
                logout();
            }
            return Promise.reject(error);
        }
      );
    }
  }, [user])

  const logout = () => {   
    localStorage.removeItem('auth-token')
    setToken(null)  
    queryClient.clear()
    router.navigate({to: '/login', search: { redirect: '/'}})
  }

  const login = async (email: string, password: string) => {
    const data = await loginMutateAsync({ email, password });
    localStorage.setItem('auth-token', data.access_token)
    await refetchProfile()
    setToken(data.access_token)
  }

  const hasRole = (role: string) => {
    if (!user) return false
    return user.user_type === role
  }

  const hasAnyRole = (roles: string[]) => {
    if (!user) return false
    return roles.includes(user.user_type)
  }

  if (isLoading && token) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    )
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user && !!token, isLoading, user: user || null, login, logout, hasRole, hasAnyRole }}>
      {children}
    </AuthContext.Provider>
  )}


export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}