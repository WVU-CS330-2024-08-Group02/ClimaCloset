import './Login.css';
import { NavLink } from "react-router-dom"
import { TransparentBox } from '../components/TransparentBox';
import { CenterContainer } from '../components/CenterContainer';

export function Login()  {
    return (
        <>
            <h1>Login to ClimaCloset</h1>
            <CenterContainer>
                <TransparentBox>
                    <form>
                        <label for="username">Enter your username</label>
                        <input 
                            type="text" 
                            id="username"
                            required
                            placeholder="username" 
                        />
                        <label for="password">Enter your password</label>
                        <input 
                            type="password"
                            id="password"
                            required
                            placeholder="password"
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