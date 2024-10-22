export interface Message  {
    id: number,
    username: string,
    senderId: number
    receiverId: number,
}

export type Credentials = {
    user_id: number,
    username: string,
    password: string
}