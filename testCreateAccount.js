// Create Account function to test interfacing with the other parts of the website


// Add event listener when DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
        // When signup Button is clicked
        document.getElementById("signupBtn").addEventListener("click", function(){

            // Variables from text boxes
            const email = document.getElementById("newusername").value;
            const password = document.getElementById("newpassword").value;
            const rePassword = document.getElementById("repassword").value;

            // only save if passwords match
            if (rePassword == password) {
                localStorage.setItem('email',email);
                localStorage.setItem('password',password);
                console.log("Account creation successful");
                window.location.href="login-page.html"; // Send user to login page
                alert("Account creation successful!");
            }
    });
});
