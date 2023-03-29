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
        fetch(`${baseUrl}/api/Dashboard/UserDetails`, {
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


const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#passwordLogin');
const toggleOpenClose = document.getElementsByTagName('span')[0];

const toggle = () => {
  if (toggleOpenClose.classList.contains('fa-eye-slash')) {
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    toggleOpenClose.classList.remove('fa-eye-slash');
    toggleOpenClose.classList.add('fa-eye');
  } else {
    toggleOpenClose.classList.remove('fa-eye');
    toggleOpenClose.classList.add('fa-eye-slash');
  }
}