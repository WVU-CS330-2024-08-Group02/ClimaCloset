export function Signup()  {
    return (
        <>
            <h1>Signup for ClimaCloset</h1>
            <div class="signup-area">
                <div>
                    <label for="name">Enter name</label>
                    <input type="text" id="name" placeholder="name" />
                </div>
                <div>
                    <label for="email">Enter email</label>
                    <input type="text" id="email" placeholder="email" />
                </div>
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