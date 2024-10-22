import { Request, Response } from 'express'
import prisma from '../config/prismaconfig'
import { CustomRequest } from '../middleware/authenticate'
import { messageSchema } from '../schema/userSchema'
import { io } from '../socket'

export const sendPrivate = async(req:CustomRequest, res:Response) => {
    const { id } = req.params
    const { content} = req.body
    const { user_id } = req.user
  
    try {
        const receiverId = parseInt(id, 10)

        const userReceiver = await prisma.user.findUnique({
            where: {
                user_id: receiverId
            }
        })

        if(!userReceiver) {
            return res.status(404).json({error: "User not found"})
        }

        const parseMessage = messageSchema.safeParse({
            content,
            receiverId: receiverId,
            senderId: user_id
        })
      
        if(!parseMessage.success){
            const errorMessages = parseMessage.error.errors.map(error => error.message)

            return res.status(400).json({
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
    const { id } = req.params
    try {
        const senderId = parseInt(id, 10)
        const messages = await prisma.message.findMany({
           where: { 
            OR: [
                { receiverId: user_id, senderId },
                { senderId: user_id, receiverId: senderId }
            ]},
           distinct: ['message_id'],
           orderBy: {
            message_id: 'asc'
           },
           include: {sender: {
            select: {
                user_id: true,
                username: true,
            },
           }, receiver: {
            select: {
                user_id: true,
                username: true
            }
           }}
        })

        res.json(messages)
    } catch (error) {
        console.log(error)
    }
}