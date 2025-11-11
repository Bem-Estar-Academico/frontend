import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import type { SocialWorkerProgressResponseDTO } from "@/types/team-progress-dto"
export interface SocialWorkerProgress {
    id: number;
    name: string;
    email: string;
    avatarUrl: string;
    lastAnalysisDate: string;
    workProgress: number;
}
export interface CardSocialWorkerProps {
    data: SocialWorkerProgressResponseDTO;
}

export function CardSocialWorker({ data }: CardSocialWorkerProps) {
    const { full_name, email, last_review, progress } = data;

    const formattedDate = last_review ? new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(new Date(last_review)) : null;

    return (
        <Card className="gap-3">
            <CardContent className='flex flex-col gap-4 items-center'>
                <Avatar className="size-24 ">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-gray-300">{full_name.charAt(0)}</AvatarFallback>
                </Avatar>

                <div className='flex flex-col justify-center items-center'>
                    <h3 className="text-lg font-medium">{full_name}</h3>
                    <p className="text-xs truncate max-w-[180px] text-gray-500">{email}</p>
                </div>
            </CardContent>

            <Separator className="w-full mt-4" />

            <CardFooter className='flex flex-col gap-2'>
               <div className='w-full flex gap-3 items-center'>
                 <Progress value={progress}/> <span className="text-sm font-medium">{progress}%</span>
               </div>
               <div className='w-full items-center flex flex-col text-xs md:text-md text-muted-foreground'>
              
                <span>Última análise feita em:</span>
                <span>{formattedDate || '---'}</span>
               
               </div>
            </CardFooter>
        </Card>
    )
}