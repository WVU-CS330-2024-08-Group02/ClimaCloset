import { Overlay } from "react-bootstrap"
import { Navbar } from "./Navbar"
import { Outlet } from "react-router-dom"

export function Layout() {
    return (
        <>
            <Navbar/>
            <main style={{marginTop: "5em"}}> 
                <Outlet />
            </main>
        </>
    )
}