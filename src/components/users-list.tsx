import { Button } from "../components/ui/button"
import { IconPlus } from "@tabler/icons-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface UserListProps { 
    title: string 
    onClick: Function
    list: { img: string, name: string }[]
}

function UserList({
    title,
    onClick,
    list,
}: UserListProps) {
    return (
        <div className="px-2 py-2">
            <div className="flex px-2 py-2 items-center justify-between bg-background border">
                <div className="text-sm font-medium">
                    {/* Title */}
                    { title }
                </div>
                <div>
                    {/* Button */}
                    <Button variant="outline" size="sm" onClick={() => onClick()}>
                        <IconPlus/>
                        Adicionar
                    </Button>
                </div>
            </div>
            <div>
                { list.map(user => (
                    <div className="flex px-2 py-2 items-center justify-between bg-gray-50 border">
                        {/* User */}
                        <div>
                            <Avatar>
                                <AvatarImage src={user.img}/>
                                <AvatarFallback>{user.name}</AvatarFallback>
                            </Avatar>
                            <div className="text-sm font-medium">
                                {/* Title */}
                                { user.name }
                            </div>
                        </div>
                    </div>)) 
                    }
                
            </div>
        </div>
    )
}

export { UserList }