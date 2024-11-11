import { Link, NavLink } from "react-router-dom"
import Nav from 'react-bootstrap/Nav'
import "./navbar.css"

export function Navbar() {
    return (
        <Nav className="navbar">
            <Nav className="navbar-left">
                <NavLink to="/About">
                    <img alt="Logo" src="src/assets/ClosetIcon.ico" className="image-button"></img>
                </NavLink>
            </Nav>
            <Nav className="navbar-middle">
                <NavLink to="/">
                    <a className="navbutton">Home</a>
                </NavLink>
                <NavLink to="/Closet">
                    <a className="navbutton">Settings/Preferences</a>
                </NavLink>
                <NavLink to="/Weather">
                    <a className="navbutton">Weather</a>
                </NavLink>
            </Nav>
            <Nav className="navbar-right">
                <NavLink to="/Login">
                    <button className="loginbutton">Login</button>
                </NavLink>
                <NavLink to="/Profile">
                    <img alt="profile" src="src/assets/ProfileIcon.ico" className="image-button"></img>
                </NavLink>
            </Nav>
        </Nav>
    )
}