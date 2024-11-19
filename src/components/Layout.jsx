import { Navbar } from "./Navbar/Navbar"
import { Outlet } from "react-router-dom"

/**
 * Layout component that provides a consistent structure for the application.
 *
 * @returns {JSX.Element} A component that includes the Navbar and a main content area with dynamic rendering.
 *
 * The Layout component renders:
 * - A `Navbar` component at the top of the page.
 * - A `main` section with a top margin of 3em to prevent content overlap with the navbar.
 * - An `Outlet` component inside the main section, which acts as a placeholder for nested routes in React Router.
 */
export function Layout() {
    return (
        <>
            <Navbar/>
            <main style={{marginTop: "3em"}}> 
                <Outlet />
            </main>
        </>
    )
}