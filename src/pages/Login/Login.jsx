import './Login.css';
import { NavLink } from "react-router-dom"
import { TransparentBox } from '../../components/TransparentBox/TransparentBox';
import { CenterContainer } from '../../components/CenterContainer/CenterContainer';
import { useState } from 'react';

/**
 * Login component that provides a form for users to log into ClimaCloset.
 * 
 * The form collects the user's username and password, with basic state management 
 * using React's `useState` hook. Upon form submission, it displays an alert with the 
 * entered username and password. The page also includes a link to the signup page 
 * for users who do not have an account.
 * 
 * @returns {JSX.Element} A login form for the user to input credentials.
 */
export function Login()  {

    const [username,setUsername] = useState("");
    const [password, setPassword] = useState("");

    /**
     * Handles the submission of the login form by displaying the entered
     * username and password in an alert box.
     * 
     * @param {React.FormEvent} e - The form submit event.
     */
    const handleSubmit = (e) => {
        e.preventDefault();

        alert(`Submission received.\n
            Username: ${username}\n
            Password: ${password}\n
        `)
    } 
    
    return (
        <>
            <h1>Login to ClimaCloset</h1>
            <CenterContainer>
                <TransparentBox>
                    <form onSubmit={handleSubmit}>
                        <label for="username">Username:</label>
                        <input 
                            type="text" 
                            id="username"
                            required
                            placeholder="Username" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <label for="password">Password:</label>
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
                    <NavLink to="/Signup">
                        <a> here </a>
                    </NavLink>
                    to sign up!
                    </p>
                </TransparentBox>
            </CenterContainer>
        </>
    )
}