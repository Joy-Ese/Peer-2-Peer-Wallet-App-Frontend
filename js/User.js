// Register (sin-up) API
function sendSignUpData() {
  var signUpData = {};
  signUpData["firstName"] = document.getElementById("firstName").value;
  signUpData["lastName"] = document.getElementById("lastName").value;
  signUpData["username"] = document.getElementById("userName").value;
  signUpData["password"] = document.getElementById("password").value;
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
  fetch("https://localhost:7236/api/User/sign-up", {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(payloadData),
  }).then(response => response.json())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
});


