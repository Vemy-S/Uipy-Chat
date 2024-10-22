import { Server as SocketServer } from 'socket.io'
import { createServer } from 'http'
import app from './server'
import { corsOption } from './config/CorsOptions'

const server = createServer(app)
export const io = new SocketServer(server, {
    cors: corsOption
})

const userSocket = new Map()
io.on('connection', (socket) => {
    
    console.log('User has connected', socket.id)

    socket.on('register', (userId) => {
        userSocket.set(userId, socket.id) 
        console.log('UserID', userId, 'Socket:', socket.id)
    })
   
    socket.on('socketMessage', message => {
        const userSocketReceiver = userSocket.get(message.receiverId)
        io.to(userSocketReceiver).emit('socketMessage', message)
    })

    socket.on('disconnect', () => {
        console.log('User has disconected', socket.id)
        userSocket.forEach((value, key) => {
            if(socket.id === value){ 
                userSocket.delete(key)
            }
        })
    })
})

export default server