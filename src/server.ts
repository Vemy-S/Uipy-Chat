import express from 'express'
import userRouter from './router/userRouter'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import messageRouter from './router/messageRouter'

const app = express()
dotenv.config()
app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))
app.use('/api', userRouter)
app.use('/message', messageRouter)


export default app