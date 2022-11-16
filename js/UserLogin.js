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
  fetch("https://localhost:44378/api/User/Login", {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(payloadData),
  }).then(response => response.text())
  .then(response => 
    {
      if (response == null) return console.log("Check Login Again")
      
      const getUserDetails = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${response}`);
        fetch("https://localhost:44378/api/Dashboard/UserDetails", {
        method: "GET",
        headers: myHeaders,
        })
        .then(responseData => responseData.json())
        .then(result => {
          console.log(result);
          redirectToDashboard(result);
        })
        .catch(error => console.log('error', error))
      }
      getUserDetails();

    })
  .catch(error => console.log('error', error));
});




function redirectToDashboard(reload) {
  localStorage.setItem("userData",JSON.stringify(reload))
  location.replace(`http://127.0.0.1:5500/html/Dashboard.html`);
}



