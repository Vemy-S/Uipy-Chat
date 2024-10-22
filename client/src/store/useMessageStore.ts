import { create } from "zustand";
import type { Message, CreatedMessage } from "../types";

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