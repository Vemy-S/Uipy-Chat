import jwt from 'jsonwebtoken'
import { User } from '../types'

export const createToken = (payload: User): Promise<string> => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {expiresIn: '1d'},
            (err, token) => {
                if(err) reject(err)
                resolve(token)
            }
        )
    })
}

