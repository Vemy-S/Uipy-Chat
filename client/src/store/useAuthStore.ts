import { create } from "zustand";
import { Credentials } from "../types";
import { loginAccount, logout } from "../services/authService";
import { setLocalStorage } from "../services/setLocalStorage";

type UseAuthStore = {
    credentials: Credentials,
    isLogging: boolean,
    login: (username: Credentials['username'], password: Credentials['password']) => Promise<void>,
    clear: () => void,
}

const getInitialCredentials = () => {
    const localCredentials = localStorage.getItem('credentials')
    return localCredentials ? JSON.parse(localCredentials) : { username: '', password:'', user_id: 0 }
}

const getInitialAuth = () => {
    const localAuth = localStorage.getItem('auth')
    return localAuth ? JSON.parse(localAuth) : false
}

export const useAuthStore = create<UseAuthStore>((set)=> ({
    credentials: getInitialCredentials(),
    isLogging: getInitialAuth(),
    login: async (username, password) => {
        try {
            const result = await loginAccount(username, password)
            if(result){
                setLocalStorage(result)
                set(()=> ({
                    credentials: { username: result.username, password: '', user_id: result.user_id  },
                    isLogging: true
                }))
            }
        } catch (error) {
            console.log(error)
        }
    },
    clear: () => {
        try {
            logout()
            localStorage.setItem('auth', 'false')
            set(()=> ({
                credentials: {username: '', password: '', user_id: 0},
                isLogging: false
            }))
        } catch (error) {
            console.log(error)
        }
       
    },
   
}))


