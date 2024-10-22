import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { User } from "../types";

export interface decoded extends User {
    iat: number,
    exp: number
}

export interface CustomRequest extends Request {
    user?: decoded | JwtPayload,
    query: {
        username: string
    }
}

export const Autenthicate = async (req: CustomRequest, res:Response, next:NextFunction) => {
    const { token } = req.cookies
    try {
        if(!token) {
            return res.status(401).json({
                error: "Unauthorized"
            })
        }

        jwt.verify(token, process.env.JWT_SECRET, (err: jwt.VerifyErrors, decoded: decoded | JwtPayload ) => {
            if(err) {
                return res.status(401).json({error: "Invalid token"})
            }
            req.user = decoded
            next()
        })
 
    } catch (error) {
        console.log(error)
    }
}

