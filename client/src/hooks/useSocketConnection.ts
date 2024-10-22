import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useSocketStore } from "../store/useSocketStore";
import io from "socket.io-client";


export const useSocketConnection = () => {
    const socket = useSocketStore(state => state.socket)
    const connect = useSocketStore(state => state.connect)
    const userId = useAuthStore(state => state.credentials.user_id)

        useEffect(()=>  {
            if(!socket){
                const newSocket = io(import.meta.env.VITE_API_BASE_URL)
                connect(newSocket)
                newSocket.emit('register', userId)
            }
        }, [socket, connect])
}
    
    
