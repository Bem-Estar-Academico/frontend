import { api } from "@/api"
import { router } from "@/main"
import { loginMutationOptions } from "@/mutations/login"
import type { User } from "@/types/user"
import { useMutation } from "@tanstack/react-query"
import { useEffect, useState, createContext, useContext } from "react"

export interface AuthState {
  isAuthenticated: boolean
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  // login: (username: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthState | undefined>(undefined)


export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const {mutateAsync: loginMutateAsync} = useMutation(loginMutationOptions);

  const loadProfile = async (token: string) => {
    return api.get<User>('/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (response.status === 200) {
          setUser(response.data)
          setIsAuthenticated(true)
          router.invalidate()
        } else {
          localStorage.removeItem('auth-token')
        }
      })
      .catch(() => {
        localStorage.removeItem('auth-token')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('auth-token')
  }

  const login = async (email: string, password: string) => {
    return loginMutateAsync({ email, password }).then(async (data) => {
      localStorage.setItem('auth-token', data.access_token)
      api.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`
      loadProfile(data.access_token)
    })
  }

  // Restore auth state on app load
  useEffect(() => {
    const token = localStorage.getItem('auth-token')
    if (token) {
      loadProfile(token)
    } else {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
      router.invalidate()
  }, [user, isAuthenticated])

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    )
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, user, login, logout }}>
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