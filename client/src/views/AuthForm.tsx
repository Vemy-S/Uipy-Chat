import { Link } from "react-router-dom"
import AuthImage from "../components/authComponents/AuthImage"
import Welcome from "../components/authComponents/Welcome"

type authFormProps = {
    handleSubmit: (e: React.FormEvent<HTMLFormElement> ) => void ,
    handleInput: (e: React.ChangeEvent<HTMLInputElement> ) => void,
    mode: 'login' | 'createAccount'
    formValues: {
        username: string,
        password: string
    },
}

export default function AuthForm({ handleSubmit, handleInput, formValues, mode }: authFormProps) {
  return (
    <>
    <AuthImage/>
    <form
    onSubmit={handleSubmit}
    className="rounded-lg "
     >
        <Welcome mode={mode} />
        
        <div className={` p-4 rounded-full border mb-6 ${formValues.username ? 'bg-slate-200': ''} `}>
            {/*ICONO*/}
            <input 
                type="text"
                id="username"
                name="username"
                onChange={handleInput}
                value={formValues.username}
                className={` outline-none mr-2 rounded-lg ${formValues.username ? 'bg-slate-200' : ''}`}
                placeholder="Usuario"
            />
        </div>
        <div className={`p-4 rounded-full border my-2 ${formValues.password ? 'bg-slate-200': ''} `}>
            {/*ICONO*/}
            <input 
                type="password"
                id="password"
                name="password"
                onChange={handleInput}
                value={formValues.password}
                placeholder="Contraseña"
                className={` outline-none mr-2 rounded-lg ${formValues.password ? 'bg-slate-200' : ''}`}
            />
        </div>
        <button 
            type="submit"
            className="p-3 bg-indigo-600 rounded-full w-full text-white mt-8 "
        >
            {mode === 'login' ? 'Iniciar Sesión' : 'Registrarse'}
        </button>

        {mode === 'login' ? (
            <div className="flex gap-2">
            <p className="opacity-75">No tienes cuenta?</p>
            <Link to={'/register'} className="font-bold">Registrate</Link>
        </div>
        ): (
            <div className="flex gap-2">
            <p className="opacity-75">Ya tienes cuenta?</p>
            <Link to={'/login'} className="font-bold">Iniciar sesion</Link>
        </div>
        )}

        
  
    </form>

    
</>
  )
}
