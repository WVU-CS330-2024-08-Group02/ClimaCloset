import { NavLink } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./Navbar.css"; // Styles for navbar elements
import closetIcon from "../../assets/ClosetIcon.ico";
import profileImage from "../../assets/pfp/DefaultProfile.png";
import defaultProfileImage from "../../assets/pfp/DefaultProfile.png";

export function Navbar() {
    const { isLoggedIn } = useContext(AuthContext); // Use correct state name

    return (
        <Nav className="navbar">
            {/* Left Section */}
            <Nav className="navbar-left">
                <NavLink to="/About">
                    <img alt="Logo" src={closetIcon} className="image-button" />
                </NavLink>
            </Nav>

            {/* Middle Section */}
            <Nav className="navbar-middle">
                <NavLink to="/" className="nav-button">Home</NavLink>
                <NavLink to="/Preferences" className="nav-button">Preferences</NavLink>
                <NavLink to="/Weather" className="nav-button">Weather</NavLink>
            </Nav>

            {/* Right Section */}
            <Nav className="navbar-right">
                {isLoggedIn ? (
                    <>
                        {/* Profile Icon */}
                        <NavLink to="/Profile">
                            <img
                                alt="profile"
                                src={profileImage}
                                className="profile-button"
                            />
                        </NavLink>
                    </>
                ) : (
                    // Login Button
                    <>
                        <NavLink to="/Login">
                            <button className="login-button">Login</button>
                        </NavLink>

                        <NavLink to="/Profile">
                            <img
                                alt="profile"
                                src={defaultProfileImage}
                                className="profile-button"
                            />
                        </NavLink>
                    </>
                )}
            </Nav>
        </Nav>
    );
}