import { Link, NavLink } from "react-router-dom"
import Nav from 'react-bootstrap/Nav'
import "./navbar.css"

export function Navbar() {
    return (
        <Nav className="navbar">
            <Nav className="navbar-left">
                <img alt="Logo" src="src/assets/ClosetIcon.ico" style={{ width: "40", height: "40px"}}></img>
            </Nav>
            <Nav className="navbar-middle">
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
            <Nav className="navbar-right">
                <img alt="profile" src="src/assets/ProfileIcon.ico" style={{ width: "40", height: "40px"}}></img>
            </Nav>
        </Nav>
    )
}