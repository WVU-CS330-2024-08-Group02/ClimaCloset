import { useState } from "react";
import { CenterContainer } from "../../components/CenterContainer/CenterContainer";
import { TransparentBox } from "../../components/TransparentBox/TransparentBox";
import './Signup.css';

/**
 * Signup component handles the user registration process, including form validation and submission.
 * 
 * It contains input fields for the user's name, email, username, password, and password confirmation.
 * The form ensures that the provided information meets the required validation rules (e.g., email format, password strength, and matching passwords).
 * 
 * @returns {JSX.Element} A form where users can enter their information to sign up.
 */
export function Signup() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");

    /**
     * Validates the given password based on predefined rules (e.g., length, upper and lowercase letters, numbers, and special characters).
     * 
     * @param {string} password - The password to be validated.
     * @returns {boolean} True if the password meets the required criteria, false otherwise.
     */
    const isPasswordValid = (password) => {
        const minLength = 8;

        const longEnough = password.length >= minLength; // Meets length requirement
        const hasUpperCase = /[A-Z]/.test(password); // Has at least one upper case character
        const hasLowerCase = /[A-Z]/.test(password); // Has at least one lower case character
        const hasNumber = /\d/.test(password); // Has at least one number
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password); // At least one special character

        return (longEnough && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar);
    }

    /**
     * Handles the form submission by validating the user's input and providing feedback if any issues are detected.
     * 
     * @param {React.FormEvent} e - The form submit event.
     */
    const handleSubmit = (e) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Ensure information is valid
        if (!emailRegex.test(email))
            {
                // Email is not valid format
                alert("Email is not valid format.");
            }
        else if (password !== rePassword)
        {
            // Passwords do not match
            alert("Your passwords do not match.");
        }
        else if (!isPasswordValid(password))
        {
            // Password not valid
            alert("Password does not meet requirements.");
        }
        else
        {
            // All fields valid, handle submit
            alert(`
                Given name: ${name}\n
                Given email: ${email}\n
                Given username: ${username}\n
                Given password: ${password}\n
            `)
        }
    }

    return (
        <>
            <h1>Sign Up for ClimaCloset</h1>
            <CenterContainer>
                <TransparentBox>
                    <form onSubmit={handleSubmit}>
                        <label for="name">Name:</label>
                        <input 
                            type="text" 
                            id="name"
                            required
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <label for="email">Email Address:</label>
                        <input 
                            type="text" 
                            id="email"
                            required
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <label for="username">Username:</label>
                        <input 
                            type="text" 
                            id="username" 
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

                        <label for="password">Re-enter Password:</label>
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
    )
}