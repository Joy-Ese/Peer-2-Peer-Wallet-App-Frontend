const baseUrl = "http://localhost:7236";

// Register (sign-up) API
function sendSignUpData() {
  var signUpData = {};
  signUpData["firstName"] = document.getElementById("firstName").value;
  signUpData["lastName"] = document.getElementById("lastName").value;
  signUpData["username"] = document.getElementById("userName").value;
  signUpData["password"] = document.getElementById("password").value;
  signUpData["confirmPassword"] = document.getElementById("conPassword").value;
  signUpData["email"] = document.getElementById("email").value;
  signUpData["phoneNumber"] = document.getElementById("phoneNumber").value;
  signUpData["address"] = document.getElementById("address").value;
  return signUpData;
}

const signUpForm = document.getElementById("signUpForm");

signUpForm.addEventListener("submit", function (e) {
  e.preventDefault();
  var myHeaders = new Headers();
  var payloadData = sendSignUpData();
  myHeaders.append("Content-Type", "application/json");
  fetch(`${baseUrl}/api/Auth/SignUp`, { 
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(payloadData),
  }).then(response => response.text())
  .then(result => {
    console.log(result)
    
    if(!result.status){
      return displayErrorForSignUp(result.message);
    }
    Validate();
    redirectToLogin();
  })
  .catch(error => console.log('error', error));
});

function displayErrorForSignUp(message){
  document.getElementById("error_msg_ForSignUp").innerHTML = message
}
function redirectToLogin() {
  setTimeout(function(){window.location.replace("http://127.0.0.1:5500/html/UserLogIn.html");},2000);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Validate Sign Up Form
  const form = document.getElementById("signUpForm");
  const firstname = document.getElementById("firstName");
  const lastname = document.getElementById("lastName");
  const username = document.getElementById("userName");
  const password = document.getElementById("password");
  const conPassword = document.getElementById("conPassword");
  const email = document.getElementById("email");
  const phonenum = document.getElementById("phoneNumber");
  const addr = document.getElementById("address");

  signUpForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Validate();
  })


  const sendData = (firstnameVal, sRate, Count) => {
    if(sRate === Count){
        swal("Hello " + firstnameVal , "You have been registered successfully", "success");
    }
  }

  const SuccessMsg = (firstnameVal) => {
    let formContr = document.getElementsByClassName('form-outline');
    var Count = formContr.length - 1;
    for(var i = 0; i < formContr.length; i++){
      if(formContr[i].className === "form-outline success"){
        var sRate = 0 + i;
        console.log(sRate);
        sendData(firstnameVal, sRate, Count);
      }
      else{
        return false;
      }
    }
  }

function Validate() {
  const firstnameVal = firstname.value.trim();
  const lastnameVal = lastname.value.trim();
  const usernameVal = username.value.trim();
  const passwordVal = password.value.trim();
  const conPasswordVal = conPassword.value.trim();
  const emailVal = email.value.trim();
  const phonenumVal = phonenum.value.trim();
  const addrVal = addr.value.trim();

  // First name
  if (firstnameVal === "") {
    setErrorMsg(firstname, "First name required");
  }
  else if (firstnameVal.length <= 2) {
    setErrorMsg(firstname, "Minimum of 3 characters");
  }
  else {
    setSuccessMsg(firstname);
  }

  // Last name
  if (lastnameVal === "") {
    setErrorMsg(lastname, "Last name required");
  }
  else if (lastnameVal.length <= 2) {
    setErrorMsg(lastname, "Minimum of 3 characters");
  }
  else {
    setSuccessMsg(lastname);
  }

  // Username
  if (usernameVal === "") {
    setErrorMsg(username, "Last name required");
  }
  else if (usernameVal.length <= 2) {
    setErrorMsg(username, "Minimum of 3 characters");
  }
  else {
    setSuccessMsg(username);
  }

  // Password
  if (passwordVal === "") {
    setErrorMsg(password, "Password required");
  }
  else if (passwordVal.length <= 7) {
    setErrorMsg(password, 
      "Min eight char, one uppercase, one lowercase and one number");
  }
  else {
    setSuccessMsg(password);
  }

  // Confirm Password 
  if (conPasswordVal === "") {
    setErrorMsg(conPasswordVal, "Passwords do not match");
  }
  else if (conPasswordVal != passwordVal) {
    setErrorMsg(conPasswordVal, "Passwords do not match");
  }
  else {
    setSuccessMsg(conPasswordVal);
  }

  // Email
  if (emailVal === "") {
    setErrorMsg(email, "Email required");
  }
  else if (emailVal.length <= 5) {
    setErrorMsg(email, "Invalid email address");
  }
  else {
    setSuccessMsg(email);
  }

  // Phone number
  if (phonenumVal === "") {
    setErrorMsg(phonenum, "Phone number required");
  }
  else if (phonenumVal.length <= 10) {
    setErrorMsg(phonenum, "Invalid phone number");
  }
  else {
    setSuccessMsg(phonenum);
  }

  // Address
  if (addrVal === "") {
    setErrorMsg(addr, "Last name required");
  }
  else if (addrVal.length <= 2) {
    setErrorMsg(addr, "Minimum of 3 characters");
  }
  else {
    setSuccessMsg(addr);
  }

  SuccessMsg(firstnameVal);
}

function setErrorMsg (input, errormsgs) {
  const formOut = input.parentElement;
  const p = formOut.querySelector('p');
  formOut.className = "form-outline error";
  p.innerText = errormsgs;
}

function setSuccessMsg (input) {
  const formOut = input.parentElement;
  formOut.className = "form-outline success";
}


