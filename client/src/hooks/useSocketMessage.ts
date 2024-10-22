import { useEffect } from "react";
import { useMessageStore } from "../store/useMessageStore";
import { useSocketStore } from "../store/useSocketStore";
import type { Message } from "../types";

export const useSocketMessages = () => {
    const socket = useSocketStore(state => state.socket)
    const setTemporalMessage = useMessageStore(state => state.setTemporalMessage)
    useEffect(()=> {
        socket?.on('socketMessage', (message: Message) => {
                const receivedMessage = {
                    message_id: Date.now(),
                    content: message.content,
                    senderId: message.senderId,
                    receiverId: message.receiverId,
                    groupSender: null,
                    sender: {
                        user_id: message.senderId,
                        username: message.sender.username
                    },
                    receiver: {
                        user_id: message.receiverId,
                        username: message.receiver.username
                    }
                }
                setTemporalMessage(receivedMessage) 
        })
    }, [socket, setTemporalMessage])
}