import { Navigate } from "react-router-dom"
import { useAuthStore } from "../store/useAuthStore"
import { PropsWithChildren } from "react"

export default function PublicRoute({ children }: PropsWithChildren) {
  const isLogging = useAuthStore(state => state.isLogging)
  return isLogging ? <Navigate to="/chat" /> : children
}
