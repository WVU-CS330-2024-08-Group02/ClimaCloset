import './Login.css';

export function Login()  {
    return (
        <>
            <h1>Login to ClimaCloset</h1>
            <div class="login-area">
                <div>
                    <label for="username">Enter username</label>
                    <input type="text" id="username" placeholder="username" />
                </div>
                <div>
                    <label for="password">Enter password</label>
                    <input type="password" id="password" placeholder="password" />
                </div>
                <button>Submit</button>
            </div>
        </>
    )
}