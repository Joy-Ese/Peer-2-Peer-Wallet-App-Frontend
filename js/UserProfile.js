const baseUrl = "http://localhost:7236";

const usersData = JSON.parse(localStorage.getItem("userData")); 

const dUser = document.getElementById("dUsername");
const dAcc = document.getElementById("dAccount");

dUser.insertAdjacentText("beforeend", usersData.username);

const getToken = localStorage.getItem("jwt");


// GET User Display Picture
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
//////////////////////////////////////////////////////////////


// GET BOOL TO CHECK IF USER HAS A SECURIY QUESTION THEN PROCEED TO SET QUESTION ON MODAL SHOW
var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${getToken}`);
var requestOptions = {
  method: 'GET',
  headers: myHeaders,
};
fetch(`${baseUrl}/api/Dashboard/GetUserSecurityAnswer`, 
  requestOptions
  ).then(response => response.json())
  .then(response => {
    if (response == false) {
      $(window).on("load", function() {
        $('#setSecQ').modal('show');
      })
    } 
    console.log(response);
  })
  .catch(error => console.log('error', error));
//////////////////////////////////////////////////////////////////////////

// FUNCTION TO REMOVE A QUESTION CHOSEN FROM THE OTHER SET OF QUESTIONS
// $(function () {
//   $('.security').change(function () {
//     $('.security option').show(0);
//     $('.security option:selected').each(function () {
//       oIndex = $(this).index();
//       if (oIndex > 0) {
//         $('.security').each(function () {
//           $(this).children('option').eq(oIndex).not(':selected').hide(0);
//         });
//       }
//     });
//   });
//   $('.security').change();
// });

// POST Security Question
function sendSecurityData() {
  var securityData = {};
  securityData["question"] = document.getElementById("securityQues").value;
  securityData["answer"] = document.getElementById("securityAns").value;
  return securityData;
}

  const securityQuestionForm = document.getElementById("securityQuestionForm");
    securityQuestionForm.addEventListener("submit", function (e) {
  e.preventDefault();

  displayErrorForSecQ("");

  var myHeaders = new Headers();
  var payloadData = sendSecurityData();
  myHeaders.append("Authorization", `Bearer ${getToken}`);
  myHeaders.append("Content-Type", "application/json");
  fetch(`${baseUrl}/api/Dashboard/SetSecurityQuestion`, {
  method: "POST",
  headers: myHeaders,
  body: JSON.stringify(payloadData),
  }).then(response => {
    return response.json()
  }).then(
    response => {
    console.log(response);
  if(!response.status){
    return displayErrorForSecQ(response.message);
  }
    return displaySuccessForSecQ(response.message);
  })
  .catch(error => console.log('error', error));
})

// function reloadAfterUpdate() {
//   setTimeout(() => { document.location.reload(); }, 5000); 
// }
function displayErrorForSecQ(message){
  document.getElementById("error_msg_ForSecQ").innerHTML = message
}
function displaySuccessForSecQ(message){
  document.getElementById("success_msg_ForSecQ").innerHTML = message
}
////////////////////////////////////////////////////////////////


// PUT Update User Pin When Old Pin Is Given
function updatePinData() {
  var pinData = {};
  pinData["answer"] = document.getElementById("securityAns").value;
  pinData["oldPin"] = document.getElementById("oldPin").value;
  pinData["newPin"] = document.getElementById("newPin").value;
  return pinData;
}

const updatePinForm = document.getElementById("updatePinForm");

updatePinForm.addEventListener("submit", function (e) {
  e.preventDefault();

  displayError("");

  var myHeaders = new Headers();
  var payloadData = updatePinData();
  myHeaders.append("Authorization", `Bearer ${getToken}`);
  myHeaders.append("Content-Type", "application/json");
  fetch(`${baseUrl}/api/Auth/UpdateUserPin`, { 
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
    displaySuccess(result.message);

      setTimeout(
        function () {
          window.location.replace(`http://127.0.0.1:5500/html/UserProfile.html`);
        },2000
      );
  })
  .catch(error => console.log('error', error));
});

function displayError(message){
  document.getElementById("error_msg_ForUpdatePin").innerHTML = message
}
function displaySuccess(message){
  document.getElementById("success_msg_ForUpdatePin").innerHTML = message
}
////////////////////////////////////////////////////


// POST Picture Upload
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
      return displayErrorForImageUploadDelete(result.message);
    }
    displaySuccessForImageUploadDelete(result.message);

    setTimeout(
      function () {
        window.location.replace(`http://127.0.0.1:5500/html/UserProfile.html`);
      },2000
    );
  })
  .catch(error => console.log('error', error));
})

// DELETE Picture Upload
const deleteForm = document.getElementById("deletePicForm");

deleteForm.addEventListener("submit", function (e) {
  e.preventDefault();

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${getToken}`);
  myHeaders.append("Content-Type", "application/json");
  fetch(`${baseUrl}/api/Dashboard/DeleteUserImage`, {
    method: 'DELETE',
    headers: myHeaders
  })
  .then(response => response.json())
  .then(result => {
    console.log(result);

    if (!result.status) {
      return displayErrorForImageUploadDelete(result.message);
    }
    displaySuccessForImageUploadDelete(result.message);

    setTimeout(
      function () {
        window.location.replace(`http://127.0.0.1:5500/html/UserProfile.html`);
      },2000
    );
  })
  .catch(error => console.log('error', error));
})

function displayErrorForImageUploadDelete(message){
  document.getElementById("error_msg_ForImageUpload_Delete").innerHTML = message
}
function displaySuccessForImageUploadDelete(message){
  document.getElementById("success_msg_ForImageUpload_Delete").innerHTML = message
}
/////////////////////////////////////


// POST Change Password
function sendChangePassData() {
  var changePass = {};
  changePass["answer"] = document.getElementById("securityAnsCH").value;
  changePass["password"] = document.getElementById("passwordCH").value;
  changePass["confirmPassword"] = document.getElementById("conPasswordCH").value;
  return changePass;
}

const changePasswordForm = document.getElementById("changePasswordForm");
changePasswordForm.addEventListener("submit", function (e) {
  e.preventDefault();

  displayChangePassError("");

  var myHeaders = new Headers();
  var payloadData = sendChangePassData();
  myHeaders.append("Authorization", `Bearer ${getToken}`);
  myHeaders.append("Content-Type", "application/json");
  fetch(`${baseUrl}/api/Auth/ChangePassword`, { 
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(payloadData),
  })
  .then(response => response.json())
  .then(result => {
    console.log(result);

    if (!result.status) {
      return displayChangePassError(result.message);
    }
    displayChangePassSuccess(result.message);

    setTimeout(
      function () {
        window.location.replace(`http://127.0.0.1:5500/html/UserProfile.html`);
      },3000
    );
  })
  .catch(error => console.log('error', error));
})

function displayChangePassError(message){
  document.getElementById("error_msg_ForChangePass").innerHTML = message
}
function displayChangePassSuccess(message){
  document.getElementById("success_msg_ForChangePass").innerHTML = message
}
//////////////////////////////////////


// GET User Details To Display In Form////////////////////////////////
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
    console.log(data);
    document.getElementById("firstNameUpdate").value = data.firstName;
    document.getElementById("lastNameUpdate").value = data.lastName;
    document.getElementById("usernameUpdate").value = data.username;
    document.getElementById("emailUpdate").value = data.email;
    document.getElementById("phoneNumUpdate").value = data.phoneNumber;
    document.getElementById("addrUpdate").value = data.address;
  })
  .catch(error => console.log('error', error));
///////////////////////////////////////////////////////////////////////////


// GET Security Question Chosen By User Logged In
var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${getToken}`);

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
};
  fetch(`${baseUrl}/api/Dashboard/GetUserSecurityQuestion`, 
  requestOptions
  ).then(response => response.json())
  .then(d => {
    console.log(d);
    document.getElementById("getSecurityQ").innerText = d.question;
    document.getElementById("getSecurityQCH").innerText = d.question;
  })
  .catch(error => console.log('error', error));
////////////////////////////////////////////////////////////////


// PUT Update User Information
const userUpdate = document.getElementById("updateUserInfoForm");

userUpdate.addEventListener("submit", function (e) {
  e.preventDefault();

    var userData = {};
    userData["firstName"] = document.getElementById('firstNameUpdate').value;
    userData["lastName"] = document.getElementById('lastNameUpdate').value;
    userData["username"] = document.getElementById('usernameUpdate').value;
    userData["address"] = document.getElementById('addrUpdate').value;
    userData["email"] = document.getElementById('emailUpdate').value;
    userData["phoneNumber"] = document.getElementById('phoneNumUpdate').value;

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${getToken}`);
  myHeaders.append("Content-Type", "application/json");
  fetch(`${baseUrl}/api/Dashboard/UpdateUserInfo`, { 
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify(userData),
  })
  .then(response => response.json())
  .then(result => {
    console.log(result);
    if (!result.status) {
      return displayUserInfoError(result.message);
    }
    displayUserInfoSuccess(result.message);
    reloadAfterUpdate();
  })
  .catch(error => console.log('error', error));
})


function reloadAfterUpdate() {
  setTimeout(() => { document.location.reload(); }, 5000); 
}
function displayUserInfoError(message){
  document.getElementById("error_msg_ForUserInfo").innerHTML = message
}
function displayUserInfoSuccess(message){
  document.getElementById("success_msg_ForUserInfo").innerHTML = message
}
////////////////////////////////////


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

