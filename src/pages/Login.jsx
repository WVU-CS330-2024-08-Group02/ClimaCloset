import './Login.css';
import { NavLink } from "react-router-dom"
import { TransparentBox } from '../components/TransparentBox';
import { CenterContainer } from '../components/CenterContainer';

export function Login()  {
    return (
        <>
            <h1>Login to ClimaCloset</h1>
            <CenterContainer>
                <TransparentBox className="login-area">
                    <div>
                        <label for="username">Enter username</label>
                        <input type="text" id="username" placeholder="username" />
                    </div>
                    <div>
                        <label for="password">Enter password</label>
                        <input type="password" id="password" placeholder="password" />
                    </div>
                    <button>Submit</button>
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