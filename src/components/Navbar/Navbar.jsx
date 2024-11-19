import { NavLink } from "react-router-dom"
import Nav from 'react-bootstrap/Nav'
import "./navbar.css" // Styles for navbar elements

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
                    <a className="nav-button">Home</a>
                </NavLink>
                <NavLink to="/Closet">
                    <a className="nav-button">Preferences</a>
                </NavLink>
                <NavLink to="/Weather">
                    <a className="nav-button">Weather</a>
                </NavLink>
            </Nav>
            <Nav className="navbar-right">
                <NavLink to="/Login">
                    <button className="login-button">Login</button>
                </NavLink>
                <NavLink to="/Profile">
                    <img alt="profile" src="src/assets/CamProfile.png" className="profile-button"></img>
                </NavLink>
            </Nav>
        </Nav>
    )
}