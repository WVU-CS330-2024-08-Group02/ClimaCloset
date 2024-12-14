import { useState } from "react";
import { CenterContainer } from "../../components/CenterContainer/CenterContainer";
import { TransparentBox } from "../../components/TransparentBox/TransparentBox";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Signup.css';

export function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const navigate = useNavigate(); // Use navigate for redirecting

    const isPasswordValid = (password) => {
        const minLength = 8;
        const longEnough = password.length >= minLength;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        return longEnough && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            alert("Email is not valid format.");
        } else if (password !== rePassword) {
            alert("Your passwords do not match.");
        } else if (!isPasswordValid(password)) {
            alert("Password does not meet requirements.");
        } else {
            try {
                const response = await axios.post(`http://135.237.82.214:5000/auth/register`, 
                    { name, email, username, password });
                
                if (response.status === 201) {
                    console.log("Signup successful:", response.data);
                    // Redirect to the login page
                    navigate('/login');
                }
            } catch (error) {
                console.error("Error signing up:", error);
                alert("Signup failed. Please try again.");
            }
        }
    };

    return (
        <>
            <h1>Sign Up for ClimaCloset</h1>
            <CenterContainer>
                <TransparentBox>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name">Name:</label>
                        <input 
                            type="text" 
                            id="name"
                            required
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <label htmlFor="email">Email Address:</label>
                        <input 
                            type="text" 
                            id="email"
                            required
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor="username">Username:</label>
                        <input 
                            type="text" 
                            id="username" 
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
                        <label htmlFor="password">Re-enter Password:</label>
                        <input 
                            type="password"
                            id="re-password"
                            required
                            placeholder="Password"
                            value={rePassword}
                            onChange={(e) => setRePassword(e.target.value)}
                        />
                        <button type="submit">Submit</button>
                    </form>
                </TransparentBox>
            </CenterContainer>
        </>
    );
}