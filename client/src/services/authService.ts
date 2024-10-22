import axios from "axios";
import { Credentials } from "../types";

export const createAccount = async (username: Credentials['username'], password: Credentials['password']) => {
    try {
        const url = `${import.meta.env.VITE_API_BASE_URL}/api/register`
        const result = await axios.post(url, {
            username, password
        },{
            withCredentials: true
        })
        console.log(result.data)
        if(result.status !== 201){
            throw Error('Failed register')
        }
        
        return result.data

    } catch (error) {
        console.log(error)
    }
}

export const loginAccount = async (username: Credentials['username'], password: Credentials['password']) => {
    try {
        const url = `${import.meta.env.VITE_API_BASE_URL}/api/login`
        const result = await axios.post(url, {
            username, password
        }, {
            withCredentials: true
        })
        
        return result.data.user
    } catch (error) {
        console.log(error)
    }
}

export const logout = async () => {
    try {
        const url = `${import.meta.env.VITE_API_BASE_URL}/api/logout` 
        const result = await axios.post(url, {}, {
            withCredentials: true
        })
        console.log(result)
    } catch (error) {
        console.log(error)
    }
}


