type WelcomeProps = {
    mode: 'login' | 'createAccount'
}

export default function Welcome({mode}: WelcomeProps) {
  return (
    <>
    <div className="mb-10 ml-2">
        <h1 className="text-4xl text-indigo-600 mb-4">{mode === 'login' ? 'Bienvenido de vuelta' : 'Queri registrarte?'}</h1>
        <p className="text-sm">Simplifica tu vida y mejora tu comunicacion utilizando <span className="font-bold text-indigo-300">Uipy Chat</span></p>
    </div>
    <p className="text-sm ml-3 text-indigo-800 mb-2">{mode === 'login' ? 'Inicia sesion para continuar': 'Registrate para continuar'}</p>
    </>
  )
}
