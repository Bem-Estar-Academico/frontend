import { ClipboardCheck, ClipboardPen } from "lucide-react"
import { Button } from "./ui/button"
import { Link } from "@tanstack/react-router"
import { Badge } from "./ui/badge"

interface EditalCardProps {
    id: number,
    title: string,
    description: string,
    lastModification: Date,
    canSubscribe?: boolean,
    isOpen?: boolean,
    registered?: boolean,
}


export default function EditalCard({
    id,
    title,
    description,
    lastModification,
    canSubscribe = false,
    isOpen = true,
    registered = false,
}: Readonly<EditalCardProps>) {
    return (
        <div className="flex border rounded-xl p-6 shadow-sm items-center justify-between gap-12">
            <div className="flex flex-col gap-1.5 flex-1">
                <div className="flex items-center gap-4">
                    <div className="text-xs text-muted-foreground">
                        {lastModification.toLocaleString()}
                    </div>
                    <Badge 
                        variant="default"
                        className={isOpen ? "bg-green-500" : "bg-red-700"}
                    >
                        {isOpen ? "Aberto" : "Fechado"}
                    </Badge>
                </div>
                <div className="text-sm font-semibold">
                    {title}
                </div>
                <div className="text-sm text-muted-foreground">
                    {description}
                </div>
            </div>
            {canSubscribe && isOpen && (
                <div>
                    {registered ? (
                    <Button variant={"outline"} disabled>
                        <ClipboardCheck/>
                        Inscrito
                    </Button>
                    ) : (
                    <Button variant={"outline"} asChild>
                        <Link
                        to={"/editais/$id/inscricao"}
                        params={{ id: String(id) }}
                        >
                        <ClipboardPen/>
                        Cadastre-se
                        </Link>
                    </Button>
                    )}
            </div>
            )}

        </div>
    )
}