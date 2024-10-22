import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMessageStore } from "../store/useMessageStore";

export const useGetMessage = () => {
    const {id} = useParams()
    const getMessageList = useMessageStore(state => state.getMessageList)

    useEffect(()=> {
       const getMessages = async () => {
        console.log(id)
        try {
            const url = `${import.meta.env.VITE_API_BASE_URL}/message/private/${id}`
            const { data } = await axios(url, {
                withCredentials: true
            })
            getMessageList(data)
        } catch (error) {
            console.log(error)
        }
       }
       if(id) {
        getMessages()
       }
    }, [id, getMessageList])
}