/**
 * This file defines the Login page. It communicates with the backend to log-in 
 * previous users, fetches the user's stored data, and creates the interactive elements 
 * the user uses on the page.  
 */

// Import libraries and modules 
import './Login.css';
import { NavLink, useNavigate } from "react-router-dom";
import { TransparentBox } from '../../components/TransparentBox/TransparentBox';
import { CenterContainer } from '../../components/CenterContainer/CenterContainer';
import { useState, useContext } from 'react';
import { AuthContext } from "../../context/AuthContext"; // Import context
import axios from 'axios';

// Render login form and handle authentication
export function Login() {
    // Define variables for username & password
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Access login function from context
    const { login } = useContext(AuthContext); 

    // Use navigate for redirecting
    const navigate = useNavigate(); 

    // Handle form submission during login process
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send login request to server
            const response = await axios.post(`http://localhost:5001/auth/login`, 
                { username, password }, 
                { withCredentials: true });
            
            // Check if login was successful
            if (response.status === 200) {

                // Return successful login response and direct to homepage
                console.log("Login successful:", response.data);
                login(response.data.user); 
                navigate('/'); 
            }

        // Error handling message if login process fails
        } catch (error) {
            console.error("Error logging in:", error);
            alert("Login failed. Please check your credentials and try again.");
        }
    };

    // Creation of Login page and redirects to Signup page if needed
    return (
        <>
            <h1>Login to ClimaCloset</h1>
            <CenterContainer>
                <TransparentBox>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input 
                            type="text" 
                            id="username"
                            required
                            placeholder="Username" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <label htmlFor="password">Password:</label>
                        <input 
                            type="password"
                            id="password"
                            required
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit">Submit</button>
                    </form>
                    <p>Don't have an account? Click 
                    <NavLink to="/Signup"> here </NavLink>
                    to sign up!
                    </p>
                </TransparentBox>
            </CenterContainer>
        </>
    );
}
