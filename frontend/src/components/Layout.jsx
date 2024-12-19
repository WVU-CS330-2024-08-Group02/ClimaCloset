/**
 * This file renders the navbar component and provides a consistent structure
 * for all of the pages. This file allows for the content to be rendered dynamically 
 * when moving between pages.
 */

// Import libraries and modules
import { Navbar } from "./Navbar/Navbar"
import { Outlet } from "react-router-dom"

// Export the layout and navbar to all of the pages
export function Layout() {
    return (
        <>
            <Navbar/>
            <main style={{marginTop: "3.5em"}}> 
                <Outlet />
            </main>
        </>
    )
}