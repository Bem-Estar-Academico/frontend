import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";

export function ErrorComponent() {
    return (
        <div className='h-lvh flex items-center justify-center gap-4'>
            <div className="flex flex-col gap-4 w-sm">
                <img className='max-w-[500px]' src={"/undraw-page-eaten.svg"}/>
                <h2 className="mt-4 text-xl text-center">Erro no Servidor</h2>
                <p className='text-sm text-muted-foreground'>Parece que ocorreu um erro interno no servidor durante o processamento da sua solicitação. Nossa equipe foi notificada e está trabalhando para resolver o problema.</p>
                <p></p>
                <Button className="mt-4" asChild>
                    <Link to="/">Voltar para a página inicial</Link>
                </Button>
            </div>
        </div>
    )
}