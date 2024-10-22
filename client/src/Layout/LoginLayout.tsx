import { Outlet } from "react-router-dom";

export default function LoginLayout() { //AuthLayout, cambiar
  return (
    <main 
      className="container mx-auto mt-6 md:mt-24 grid sm:grid-cols-2 md:gap-32  ">
        <Outlet/>
    </main>
  )
}
