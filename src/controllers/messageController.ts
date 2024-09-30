import { Request, Response } from 'express'
import prisma from '../config/prismaconfig'
import { CustomRequest } from '../middleware/authenticate'
import { messageSchema } from '../schema/userSchema'



export const sendPrivate = async(req:CustomRequest, res:Response) => {
    const { content, receiverId } = req.body
    const { user_id } = req.user
    
    try {

        const user = await prisma.user.findUnique({
            where: {
                user_id: receiverId
            }
        })

        if(!user) {
            return res.status(404).json({error: "User not found"})
        }

        const parseMessage = messageSchema.safeParse({
            content,
            receiverId,
            senderId: user_id
        })
      
        if(!parseMessage.success){
            const errorMessages = parseMessage.error.errors.map(error => error.message)

            return res.status(404).json({
                error: errorMessages
            })
        }

        const sendMessage = await prisma.message.create({
            data: {
                content: parseMessage.data.content,
                sender: {
                    connect: { user_id: parseMessage.data.senderId }
                },
                receiver: {
                    connect: { user_id: parseMessage.data.receiverId }
                }
            }
        }) 

        res.json(sendMessage)

    } catch (error) {
        console.log(error)
    }
}

export const getMessages = async(req: CustomRequest, res: Response) =>{
    const { user_id } = req.user
    try {
        const messages = await prisma.message.findMany({
           where: { receiverId: user_id },
           include: {sender: {
            select: {
                user_id: true,
                username: true,
            }
           }}
        })

        res.json(messages)
    } catch (error) {
        console.log(error)
    }
}