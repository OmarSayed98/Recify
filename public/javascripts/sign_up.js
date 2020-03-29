function matchPassword(confirmPass)
{

  var pass= document.getElementById('Password');
  if(pass.value !== confirmPass.value)
  {
    confirmPass.setCustomValidity("Passwords Don't Match");
  }
  else {
    confirmPass.setCustomValidity("");
  }
}
function emailTaken()
{
  var email= document.getElementById('UserEmail');
}