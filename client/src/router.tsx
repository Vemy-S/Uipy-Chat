import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout/Layout";
import Chat from "./views/Chat";
import Login from "./views/Login";
import Register from "./views/Register";
import ProtectedRoute from "./authRoutes/ProtectedRoute";
import PublicRoute from "./authRoutes/PublicRoute";
import LoginLayout from "./Layout/LoginLayout";
import Settings from "./views/Settings";

export const router = createBrowserRouter([
    {
        path:'/chat',
        element: (
            <ProtectedRoute>
                <Layout/>
            </ProtectedRoute>
        ),
        children: [
            {
                index:true,
                element: <Chat/>
                
            },
            {
                path: ':id',
                element: <Chat></Chat>
            }
        ]
    },
    {
        element: (
            <PublicRoute>
                <LoginLayout/>
            </PublicRoute>
        ),
        children: [
            {
                path:'/login',
                element: <Login mode='login'/>
            },
            {
                path: 'register',
                element: <Register mode='createAccount'/>
            }
        ]
    },
    {
        path:'/settings',
        element: (
            <ProtectedRoute>
                <Settings/>
            </ProtectedRoute>
        )
    }
])