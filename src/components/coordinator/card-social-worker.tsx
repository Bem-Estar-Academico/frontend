import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { AvatarFallback } from "@radix-ui/react-avatar"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"


export interface SocialWorkerProgress {
    id: number;
    name: string;
    email: string;
    avatarUrl: string;
    lastAnalysisDate: string;
    workProgress: number;
}

export interface CardSocialWorkerProps {
    data: SocialWorkerProgress
}

export function CardSocialWorker({ data }: CardSocialWorkerProps) {
    const { name, email, avatarUrl, lastAnalysisDate, workProgress } = data;

    const formattedDate = new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(new Date(lastAnalysisDate));

    return (
        <Card className="gap-3">
            <CardContent className='flex flex-col gap-4 items-center'>
                <Avatar className="size-24">
                    <AvatarImage src={avatarUrl} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <div className='flex flex-col justify-center items-center'>
                    <h3 className="text-lg font-medium">{name}</h3>
                    <p className="text-sm text-gray-500">{email}</p>
                </div>
            </CardContent>

            <Separator className="w-full mt-4" />

            <CardFooter className='flex flex-col gap-2'>
               <div className='w-full flex gap-3 items-center'>
                 <Progress value={workProgress}/> <span className="text-sm font-medium">{workProgress}%</span>
               </div>
               <div className='w-full items-center flex flex-col text-xs md:text-md text-muted-foreground'>
                <span>Última análise feita em:</span>
                <span>{formattedDate}</span>
               </div>
            </CardFooter>
        </Card>
    )
}