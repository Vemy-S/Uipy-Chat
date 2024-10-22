import { Credentials } from "../types"
    
export const setLocalStorage = (result: Credentials) => {
    localStorage.setItem('credentials', JSON.stringify(result))
    localStorage.setItem('auth', JSON.stringify('true'))
}