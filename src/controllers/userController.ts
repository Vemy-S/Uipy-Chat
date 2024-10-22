import { Response } from "express"
import { CustomRequest } from "../middleware/authenticate"
import prisma from "../config/prismaconfig"

export const searchUser = async (req: CustomRequest, res: Response) => {
    const { username } = req.query
    try {
        const getUser = await prisma.user.findUnique({
            where: {username}
        })

        if(!getUser) {
            return res.status(404).json({
                error: 'User not found'
            })
        }
       
        res.json({
            username: getUser.username,
            user_id: getUser.user_id
        })
    } catch (error) {
        console.log(error)
    }
}
