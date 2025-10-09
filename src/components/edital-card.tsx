interface EditalCardProps {
    title: string,
    description: string,
    lastModification: Date
}


export default function EditalCard({
    title,
    description,
    lastModification
}: Readonly<EditalCardProps>) {
    return (
        <div className="flex flex-col border rounded-xl p-6 gap-1.5 shadow-sm">
            <div className="text-xs text-muted-foreground">
                {lastModification.toLocaleString()}
            </div>
            <div className="text-sm font-semibold">
                {title}  
            </div>
            <div className="text-sm text-muted-foreground">
                {description}
            </div>
        </div>
    )
}