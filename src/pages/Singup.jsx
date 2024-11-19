import { CenterContainer } from "../components/CenterContainer";
import { TransparentBox } from "../components/TransparentBox";
import './Signup.css';


export function Signup() {
    return (
        <>
            <CenterContainer>
                <TransparentBox className="signup-area">
                    <label for="name">Enter your name</label>
                    <input 
                        type="text" 
                        id="name"
                        placeholder="name">
                    </input>

                    <label for="email">Enter an email address</label>
                    <input 
                        type="text" 
                        id="email"
                        placeholder="email">
                    </input>

                    <label for="username">Enter a username</label>
                    <input 
                        type="text" 
                        id="username" 
                        placeholder="username">
                    </input>

                    <label for="password">Enter a password</label>
                    <input 
                        type="password"
                        id="password"
                        placeholder="password">
                    </input>

                    <label for="password">Re-enter your password</label>
                    <input 
                        type="password"
                        id="re-password"
                        placeholder="password">
                    </input>

                    <button>Submit</button>
                </TransparentBox>
            </CenterContainer>
        </>
    )
}