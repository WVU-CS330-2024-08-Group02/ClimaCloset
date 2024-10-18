
// Function handles clicks, depending on button id


function onClick(event) {
    var elementId = event.target.id; // get id from button

    if (elementId === "signUp")
    {
        alert("Sign-up button click detected!");
    } 
    else if (elementId === "logIn")
    {
        alert("Login button click detected!");
    }
    else if (elementId === "forgotPassword")
    {
        alert("Forgot password button click detected!");
    }
}

