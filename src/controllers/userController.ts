import { Request, Response } from 'express'
import prisma from '../config/prismaconfig'
import { userSchema } from '../schema/userSchema'
import bcrypt from 'bcrypt'
import { createToken } from '../libs/jwt'


export const register = async (req:Request, res:Response) =>{
  const { username, password } = req.body
    try {
        const userParse = userSchema.safeParse({ username, password })

        if(!userParse.success) {
            return res.status(404).json({
                error:"validation failed",
                issues: userParse.error.issues
            })
        }
        
        const existUser = await prisma.user.findUnique({
            where: { username }
        })
        
        if(existUser){
            return res.status(400).json({error: "User exist"})
        }

        const hashedPassword = await bcrypt.hash(userParse.data.password, 10)

        const user = await prisma.user.create({
            data: { 
                username: userParse.data.username,
                password: hashedPassword
            }
       })

       const token = await createToken(user)
       res.cookie('token', token)


        res.status(201).json({message: "User created"})
    } catch (error) {
        console.error(error)
    }
}

export const login = async (req:Request, res:Response) => {
    const { username, password } = req.body
    try {
        const userParse = userSchema.safeParse({username, password})

        if(!userParse.success) {
            return res.status(404).json({
                error:"validation failed",
                issues: userParse.error.issues
            })
        }

        const user = await prisma.user.findUnique({
            where: {
                username: userParse.data.username
            }
        })
        const isMatch = await bcrypt.compare(userParse.data.password, user.password)
        
        if(!user) {
            return res.status(404).json({error: "User not found"})
        }
        
        if(!isMatch){
            return res.status(401).json({ error: "Invalid password" })
        }

        const token = await createToken(user)
        res.cookie('token', token)

        res.json(user)
    } catch (error) {
        console.error(error)
    }
}

