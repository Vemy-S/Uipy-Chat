import express from 'express'
import { corsOption } from './config/CorsOptions'
import authRouter from './router/authRouter'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import messageRouter from './router/messageRouter'
import cors from 'cors'
import userRouter from './router/userRouter'

const app = express()

dotenv.config()
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOption))
app.use(morgan('dev'))
app.use('/api', authRouter)
app.use('/message', messageRouter)
app.use('/user', userRouter)

export default app