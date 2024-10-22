import { Navigate } from "react-router-dom"
import { useAuthStore } from "../store/useAuthStore"
import { PropsWithChildren } from "react"


export default function ProtectedRoute({ children }: PropsWithChildren) {
    const isLogging = useAuthStore(state => state.isLogging)
    
    return isLogging ? children : <Navigate to="/login"/>
}
