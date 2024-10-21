//Account Backend Java Script
//main function for button click

function userClick (){
	if (#signUp) {signUp();} 
	if (#logIn) {login();} 
	if (#forgetPassword) { //prompt forgot password}
};

// login
function login() {
	let email = prompt("What is your emaiL?");
	if (matchEmail(email)) {
		let password = prompt("What is your password"?);
		if (matchPassword(password))
			console.log("Success! Welcome to Clima Closet!);
		else
			console.log("Error! Password does not match");
	}
	else
		console.log("Account does not exist");
}

// check to see if email matches stored email
function matchEmail(emailToMatch) { 
	//loop through all stored emails
	let email;
	/*for (email: storedEmails) {
		if (email === emailToMatch)
			return true; // an email was matched
	}(this will be worked on in another sprint)*/ 
	return false;
	// Hard code for now
	console.log("No emails are stored currently");
}

// check to see if password matches stored password
function matchPassword(passwordToMatch) {
	// let storedPassword = password stored with input email (this will be worked on in next sprint)
	if (passwordToMatch === storedPassword)
		return true;
	else
		return false;
	// Hard code for now
	console.log("No passwords are stored currently");
}

//signUp function
void signUp(){
  let email = prompt("What is your email?");

  //checks to see if account is preexisting
  if (matchEmail(email) == false)
  {
    let password = prompt("Please input password:");
    //button call
    storeAccount(email, password);
  }
  else{
    console.log("Account already exists, please log in");
  }
}

//store account function
void storeAccount(String emailInput, String passwordInput){
  console.log("Account stored, allow access to webapp.");
}

//forgotPassword function 
function forgotPassword () {
	let email=prompt("What is the email associated with your account?"); 
	if (matchEmail(email) === true) { 
		let newPassword=prompt("What is your new password");
		if(matchPassword(password) === true) { 
			alert("Please reuse another password.");
		}
		else {
			let storedPassword = password;
			alert("Password reset. Please return to log in.");
		}
	}
	else {
		alert("Email not found. Please try again or sign up.");
	}
	
}
