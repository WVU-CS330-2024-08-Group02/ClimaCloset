//Account Backend Java Script
//main function for button click

function userClick (){
  if (#signupClick) {
    //prompt to start signUp function
  } else if (#logInClick) {
    //prompt to start logIn function
  } else {
    //prompt forgot password
  }
};
//login function
=======

// login
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

// check to see if email matches stored email
function matchEmail(emailToMatch) { 
	//loop through all stored emails
	if (emailToMatch === stored email)
		return true; // an email was matched
	else
		return false;
}

// check to see if password matches stored password
function matchPassword(passwordToMatch) {
	let storedPassword = password stored with input email
	if (passwordToMatch === storedPassword)
		return true;
	else
		return false;
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
