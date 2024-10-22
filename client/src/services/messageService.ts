import axios from "axios"

export const sendMessage = async (message: any) => { 
    try {
        const url = `${import.meta.env.VITE_API_BASE_URL}/message/private/${message.receiverId}`
        const data = await axios.post(url, {
            content: message.content,
            senderId: message.senderId 
        }, {
            withCredentials: true
        })
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}

export const getMessages = async () => {
    try {
        const url = `${import.meta.env.VITE_API_BASE_URL}/message/private`
        const result = axios(url)
        console.log(result)
    } catch (error) {
        console.log(error)
    }
}