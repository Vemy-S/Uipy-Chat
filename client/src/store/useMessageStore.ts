import { create } from "zustand";

//TEST, esto se puede manejar con interface y extends para solo incluir sender y receiver.
export type CreatedMessage = {
    content: string,
    senderId: number,
    receiverId: number,
    groupSender: string | null,
}

type Message = {
    message_id: number,
    content: string,
    senderId: number,
    receiverId: number,
    groupSender: string | null,
    sender: {
        username: string,
        user_id: number
    },
    receiver: {
        username: string,
        user_id: number
    }
}

type useMessageStore = {
    messageList: Message[],
    message: CreatedMessage | null
    getMessageList: (data: Message[] ) => void
    clearMessageList: () => void,
    setMessage: (message: CreatedMessage | null) => void
    setTemporalMessage: (socketMessage: Message) => void
}

export const useMessageStore = create<useMessageStore>((set)=> ({
    messageList: [],
    message: null,
    getMessageList: (data) => {
        set({messageList: data})
    },
    clearMessageList: () => {
        set({messageList: []})
    },
    setMessage: (message) => {
        set({message})
    },
    setTemporalMessage: (socketMessage) => { // setTemporalList
        set((state)=> ({
            messageList: [...state.messageList, socketMessage ]
        }))
    },

}))