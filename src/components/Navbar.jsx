import { Link } from "react-router-dom"
import "./navbar.css"

export function Navbar() {
    return (
        <div className="navbar">
            <Link to="/">
                <button className="navbutton">Home</button>
            </Link>
            <Link to="Closet">
                <button className="navbutton">Settings/Preferences</button>
            </Link>
            <Link to="/Weather">
                <button className="navbutton">Weather</button>
            </Link>
        </div>
    )
}