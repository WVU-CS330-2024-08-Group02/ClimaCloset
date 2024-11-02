import { Link, NavLink } from "react-router-dom"
import Nav from 'react-bootstrap/Nav'
import "./navbar.css"

export function Navbar() {
    return (
        <Nav className="navbar">
            <NavLink to="/">
                <button className="navbutton">Home</button>
            </NavLink>
            <NavLink to="/Closet">
                <button className="navbutton">Settings/Preferences</button>
            </NavLink>
            <NavLink to="/Weather">
                <button className="navbutton">Weather</button>
            </NavLink>
        </Nav>
    )
}