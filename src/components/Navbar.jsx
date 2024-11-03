import { Link, NavLink } from "react-router-dom"
import Nav from 'react-bootstrap/Nav'
import "./navbar.css"

export function Navbar() {
    return (
        <Nav className="navbar">
            <Nav className="navbar-left">
                <a href="https://example.com" target="_blank">
                    <img alt="Logo" src="src/assets/ClosetIcon.ico" className="image-button"></img>
                </a>
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
                <NavLink to="/Profile">
                    <img alt="profile" src="src/assets/ProfileIcon.ico" className="image-button"></img>
                </NavLink>
            </Nav>
        </Nav>
    )
}