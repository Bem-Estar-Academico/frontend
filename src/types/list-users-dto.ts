export type ListUsersDTO = {
    skip?: number,
    limit?: number,
    user_type: "NTI" | "STUDENT" | "COORDINATOR" | "SOCIAL_WORKER"
}