import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";

export function NotFoundComponent() {
    return (
       <div className='h-lvh flex items-center justify-center gap-4'>
        <div className="flex flex-col gap-4 w-sm">
            <img className='max-w-[500px]' src={"/undraw-page-not-found.svg"}/>
            <h2 className="mt-4 text-xl text-center">Página não encontrada</h2>
            <p className='text-sm text-muted-foreground'>A página que você busca não existe mais ou está temporariamente indisponível. Verifique se o URL está correto ou tente novamente em alguns minutos</p>
            <p></p>
            <Button className="mt-4" asChild>
                <Link to="/">Voltar para a página inicial</Link>
            </Button>
        </div>
       
       </div>
    )
}