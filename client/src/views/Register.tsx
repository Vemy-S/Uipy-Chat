import { useAuth } from "../hooks/useAuth"
import { createAccount } from "../services/authService"
import AuthForm from "./AuthForm"


type RegisterProps = {
    mode: 'createAccount'
}

export default function Register({mode}: RegisterProps) {
    const {handleInput, handleSubmit, formValues} = useAuth(createAccount)

   return <AuthForm handleInput={handleInput} handleSubmit={handleSubmit} formValues={formValues} mode={mode} />
}

