// Login API
function sendLoginData() {
  var loginData = {};
  loginData["username"] = document.getElementById("userNameLogin").value;
  loginData["password"] = document.getElementById("passwordLogin").value;
  return loginData;
}

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  var myHeaders = new Headers();
  var payloadData = sendLoginData();
  myHeaders.append("Content-Type", "application/json");
  fetch("https://localhost:44378/api/User/login", {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(payloadData),
  }).then(response => response.text())
  .then(response => 
    {
      if (response != null) 
      {
        const getUserDetails = () => {
          var myHeaders = new Headers();
          myHeaders.append("Authorization", `Bearer ${response}`);
          fetch("https://localhost:44378/api/Dashboard/user-details", {
          method: "GET",
          headers: myHeaders,
          })
          .then(responseData => responseData.json())
          .then(result => console.log(result))
          .catch(error => console.log('error', error))
        }
        getUserDetails();
      }
      else {
        console.log("Check Login Again")
      }
    })
  // .then(result => console.log(result))
  // .then(() => {window.setTimeout(function(){location.reload()},3000)})
  .catch(error => console.log('error', error));
});



