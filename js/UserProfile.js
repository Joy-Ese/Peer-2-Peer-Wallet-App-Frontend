const baseUrl = "http://localhost:7236";

const usersData = JSON.parse(localStorage.getItem("userData")); 
// console.log(usersData);

const dUser = document.getElementById("dUsername");
const dAcc = document.getElementById("dAccount");

dUser.insertAdjacentText("beforeend", usersData.username);


// GET user details to display in form
const getToken = localStorage.getItem("jwt");

var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${getToken}`);

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
};
  fetch(`${baseUrl}/api/Dashboard/GetUserProfile`, 
  requestOptions
  ).then(response => response.json())
  .then(data => {
    // console.log(data);
    document.getElementById("firstName").innerText = data.firstName;
    document.getElementById("lastName").innerHTML = data.lastName;
    document.getElementById("userName").innerHTML = data.username;
    document.getElementById("phoneNumber").innerHTML = data.email;
    document.getElementById("email").innerHTML = data.phoneNumber;
    document.getElementById("address").innerHTML = data.address;
  })
  .catch(error => console.log('error', error));


// POST update user pin with new pin when old pin is given
function sendPinData() {
  var pinData = {};
  pinData["oldPin"] = document.getElementById("oldPin").value;
  pinData["newPin"] = document.getElementById("newPin").value;
  return pinData;
}

const changePinForm = document.getElementById("changePinForm");

changePinForm.addEventListener("submit", function (e) {
  e.preventDefault();

  displayError("");

  var myHeaders = new Headers();
  var payloadData = sendPinData();
  myHeaders.append("Authorization", `Bearer ${getToken}`);
  myHeaders.append("Content-Type", "application/json");
  fetch(`${baseUrl}/api/Dashboard/UpdateUserPin`, { 
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify(payloadData),
  })
  .then(response => response.json())
  .then(result => {
    console.log(result);

    if (!result.status) {
      return displayError(result.message);
    }
      displayError(result.message);

      setTimeout(
        function () {
          window.location.replace(`http://127.0.0.1:5500/html/UserProfile.html`);
        },2000
      );
  })
  .catch(error => console.log('error', error));
});

function displayError(message){
  document.getElementById("error_msg").innerHTML = message
}


// Picture Upload
const picForm = document.getElementById("uploadPicForm");

picForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const userFile = document.getElementById("photoUpload").files[0];

  const formData = new FormData();
  formData.append("ImageDetails", userFile);

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${getToken}`);

  fetch(`${baseUrl}/api/Dashboard/UploadNewImage`, { 
    method: "POST",
    headers: myHeaders,
    body: formData,
  })
  .then(response => response.json())
  .then(result => {
    console.log(result);

    if (!result.status) {
      return displayErrorForImageUpload(result.message);
    }
    displayErrorForImageUpload(result.message);

    setTimeout(
      function () {
        window.location.replace(`http://127.0.0.1:5500/html/UserProfile.html`);
      },2000
    );
  })
  .catch(error => console.log('error', error));
})


function displayErrorForImageUpload(message){
  document.getElementById("error_msg_ForImageUpload").innerHTML = message
}
///////////


// GET User display picture
var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${getToken}`);

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
};
  fetch(`${baseUrl}/api/Dashboard/GetUserImage`, 
  requestOptions
  ).then(response => response.json())
  .then(img => {
    console.log(img);
    document.getElementById("userImageFromDB").src = "data:image/png;base64," + img.imageDetails;
  })
  .catch(error => console.log('error', error));
//////////////



// LogOut from local storage
$('#btnLogoff').click(function () {
  window.localStorage.clear();
  window.location.href = 'http://127.0.0.1:5500/html/UserLogin.html';
});


// Auto Logout after inactivity
let warningTimeout = 90000;
var timoutNow = 100000;
let warningTimer;
var timeoutTimer;
let logoutUrl = "http://127.0.0.1:5500/html/UserLogin.html";

function startTimer() {
  warningTimer = window.setTimeout(idleWarning, warningTimeout);
  timeoutTimer = window.setTimeout(idleLogout, timoutNow);
}

function resetTimer() {
  window.clearTimeout(warningTimer);
  window.clearTimeout(timeoutTimer);
  startTimer();
}

function idleWarning() {
  alert("Warning, you will be logged out due to inactivity!!!");
}

function idleLogout() {
  window.localStorage.clear();
  window.location.href = 'http://127.0.0.1:5500/html/UserLogin.html';
}

function startCountdown() {
  window.addEventListener("mousemove", resetTimer);
  window.addEventListener("mousedown", resetTimer);
  window.addEventListener("keypress", resetTimer);
  window.addEventListener("touchmove", resetTimer);
  window.addEventListener("onscroll", resetTimer);
  window.addEventListener("wheel", resetTimer);
  startTimer();
}

