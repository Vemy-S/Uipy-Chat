import { Outlet } from "react-router-dom";


export default function Layout() {
  return (
    <>
        <main className="container w-2/3 max-w-screen-4xl mx-auto mt-5  ">
            <Outlet/>
        </main>
    </>
  )
}
