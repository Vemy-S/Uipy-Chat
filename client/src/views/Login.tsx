import { useAuth } from "../hooks/useAuth"
import { useAuthStore } from "../store/useAuthStore"
import AuthForm from "./AuthForm"

type LoginProps = { // hacer authProps para mode login | createAccount
    mode: 'login'
}

export default function Login({mode}: LoginProps) {
    const login = useAuthStore(state => state.login)
    const { handleInput, handleSubmit, formValues } = useAuth(login)
  
    return <AuthForm handleInput={handleInput} handleSubmit={handleSubmit} formValues={formValues} mode={mode} />
}
