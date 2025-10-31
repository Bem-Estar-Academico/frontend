export interface SocialWorkerProgressResponseDTO {
    id: number;
    full_name: string;
    email: string;
    is_active: boolean;
    user_type: string;
    last_review: string | null;
    progress: number;
  }