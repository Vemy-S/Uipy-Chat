import { useState } from "react"
import { Credentials } from "../types"
import { useNavigate } from "react-router-dom"

export const useAuth = (authFunction: (username: Credentials['username'], password: Credentials['password']) => Promise<void>) => {
    const navigate = useNavigate()
   
    const [formValues, setFormValues] = useState({username: '', password:''})
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await authFunction(formValues.username, formValues.password)
        if(authFunction.name === 'createAccount') {
            return navigate('/login')
        }
        return navigate('/chat')
    }
    
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setFormValues({
            ...formValues,
            [e.target.id]: e.target.value
        })
    }

    return {
        handleInput,
        handleSubmit,
        formValues
    }
}