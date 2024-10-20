//Account Backend Java Script
//main function for button click
//login function

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
