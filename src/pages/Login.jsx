import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import './Login.css'; // Uncomment this line if you're using a CSS file

export function Login({ setAuthenticated }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevent default form submission behavior

        try {
            const response = await axios.post(
                'http://localhost:5001/auth/login',
                { username, password },
                { withCredentials: true }  // Ensures cookies are sent with the request
            );

            if (response.data.message === 'Login successful') {
                setAuthenticated(true);  // Update authentication state in parent component
                navigate('/');  // Redirect to the main page (or home page)
            } else {
                setError('Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Login failed:', error);
            setError('Invalid credentials');  // Set error state to show error message
        }
    };

    return (
        <>
            <h1>Login to ClimaCloset</h1>
            <div className="login-area">
                <div>
                    <label htmlFor="username">Enter username</label>
                    <input
                        type="text"
                        id="username"
                        placeholder="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Enter password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {error && <div className="error-message">{error}</div>}  {}
                <button onClick={handleSubmit}>Submit</button>  {}
            </div>
        </>
    );
}
