
export type Credentials = {
    user_id: number,
    username: string,
    password: string
}

export type Message = {
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

//TEST, esto se puede manejar con interface y extends para solo incluir sender y receiver.
export type CreatedMessage = {
    content: string,
    senderId: number,
    receiverId: number,
    groupSender: string | null,
}

export type User = {
    user_id: number,
    username: string
}