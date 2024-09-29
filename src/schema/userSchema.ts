import z from "zod";


export const userSchema = z.object({
    username: z.string(),
    password: z.string()
})

export const messageSchema = z.object({
    content: z.string().min(1),
    receiverId: z.number(),
    senderId: z.number()
})