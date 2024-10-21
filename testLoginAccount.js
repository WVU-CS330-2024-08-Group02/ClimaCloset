// Create Account function to test interfacing with the other parts of the website

 // Holds accounts stored
 const storedAccounts = JSON.parse(localStorage.getItem("sampleAccounts")) || {};

// Add event listener when DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("submitBtn").addEventListener("click", function(){
            const email = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            // values in local storage
            const savedEmail = localStorage.getItem('email');
            const savedPass = localStorage.getItem('password');

            // check if values match
            if ((email == savedEmail) && (password == savedPass)) {
                console.log("login successful")
            } else {
                console.log("Invalid credentials");
            }
    });
});