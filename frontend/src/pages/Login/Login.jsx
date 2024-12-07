import './Login.css';
import { NavLink, useNavigate } from "react-router-dom";
import { TransparentBox } from '../../components/TransparentBox/TransparentBox';
import { CenterContainer } from '../../components/CenterContainer/CenterContainer';
import { useState, useContext } from 'react';
import { AuthContext } from "../../context/AuthContext"; // Import context
import axios from 'axios';

export function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(AuthContext); // Access login function from context
    const navigate = useNavigate(); // Use navigate for redirecting

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`http://localhost:5001/auth/login`, 
                { username, password }, 
                { withCredentials: true });
            
            if (response.status === 200) {
                // Login successful
                console.log("Login successful:", response.data);
                login(response.data.user); // Update context with user data
                navigate('/'); // Redirect to the homepage
            }
        } catch (error) {
            console.error("Error logging in:", error);
            alert("Login failed. Please check your credentials and try again.");
        }
    };

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