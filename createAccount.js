//Account Backend Java Script
//main function for button click

function userClick (){
	if (#signUp) { //prompt to start signUp function } 
	if (#logIn) {//prompt to start logIn function} 
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

//signin function
void signUp(string email){
  
if (matchEmail(email) == false)
{
  printf("Please input password:");
  //button call
  storeAccount(email, password);
}
else{
  printf("Account already exists, please log in");
}
  
}
