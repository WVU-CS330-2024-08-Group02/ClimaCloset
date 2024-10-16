//Account Backend Java Script
//main function for button click
//login function

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
