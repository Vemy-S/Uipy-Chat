import { create } from "zustand";

type useSocketStore = {
    socket: SocketIOClient.Socket | null
    connect: (socket: SocketIOClient.Socket | null) => void
    disconnect: () => void
}

export const useSocketStore = create<useSocketStore>((set) => ({
    socket: null,
    connect: (socket) => {
        set({ socket })
    },
    disconnect: () => {
        set({socket: null})
    }
}))