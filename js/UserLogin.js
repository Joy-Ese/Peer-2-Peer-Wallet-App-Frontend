const baseUrl = "http://localhost:7236";

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
  fetch(`${baseUrl}/api/Auth/Login`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(payloadData),
  }).then(response => {
    return response.json()
  })
  .then(response => 
    {
      if (response == null) return console.log("Check Login Again")
      console.log(response.result);

      localStorage.setItem("jwt", response.result);

      const getUserDetails = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${response.result}`);
        fetch(`${baseUrl}/api/Dashboard/GetUserDetails`, {
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
      if(!response.status){
        return displayError(response.result)
      }
      getUserDetails();
    })
  .catch(error => console.log('error', error));
});


function displayError(message){
  document.getElementById("error_msg").innerHTML = message
}


function redirectToDashboard(reload) {
  localStorage.setItem("userData",JSON.stringify(reload))
  location.replace(`http://127.0.0.1:5500/html/Dashboard.html`);
}


$(document).ready(function() {
  $("#icon-click").click(function() {
    var className = $("#togglePassword").attr('class');
    className = className.indexOf('slash') !== -1 ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'
    $("#togglePassword").attr('class', className);
    var input = $("#passwordLogin");
    if (input.attr("type") == "text") {
      input.attr("type", "password");
    } else {
      input.attr("type", "text");
    }
  });
});




