import { NavLink } from "react-router-dom"
import Nav from 'react-bootstrap/Nav'
import "./navbar.css" // Styles for navbar elements
import closetIcon from "../../assets/ClosetIcon.ico"
import profileImage from "../../assets/pfp/CamProfile.png" // Change when login is functional

export function Navbar() {
    return (
        <Nav className="navbar">
            <Nav className="navbar-left">
                <NavLink to="/About">
                    <img alt="Logo" src={closetIcon} className="image-button"></img>
                </NavLink>
            </Nav>
            <Nav className="navbar-middle">
                <NavLink to="/">
                    <a className="nav-button">Home</a>
                </NavLink>
                <NavLink to="/Preferences">
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
                    <img alt="profile" src={profileImage} className="profile-button"></img>
                </NavLink>
            </Nav>
        </Nav>
    )
}