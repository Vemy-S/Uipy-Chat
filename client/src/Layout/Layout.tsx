import { Outlet } from "react-router-dom";


export default function Layout() {
  return (
    <>
        {/* <main className="container w-2/3 mx-auto mt-5  bg-slate-100 justify-center flex min-h-screen rounded-lg">
            
        </main> */}
        <Outlet/>
    </>
  )
}
