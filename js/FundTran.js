const baseUrl = "http://localhost:7236";

const usersData = JSON.parse(localStorage.getItem("userData")); 
console.log(usersData);

const dUser = document.getElementById("dUsername");
const dAcc = document.getElementById("dAccount");
const dFirst = document.getElementById("dFirstName");
const dLast = document.getElementById("dLastName");

dUser.insertAdjacentText("beforeend", usersData.username);
dAcc.insertAdjacentText("beforeend", usersData.accountNumber);
dFirst.insertAdjacentText("beforeend", usersData.firstName);
dLast.insertAdjacentText("beforeend", usersData.lastName);

const getToken = localStorage.getItem("jwt");

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
///////////////////////////////////////////////////////////


// GET BOOL TO CHECK IF USER HAS A PIN THEN PROCEED TO CREATE PIN ON MODAL SHOW
var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${getToken}`);
var requestOptions = {
  method: 'GET',
  headers: myHeaders,
};
fetch(`${baseUrl}/api/Dashboard/GetUserPin`, 
  requestOptions
  ).then(response => response.json())
  .then(response => {
    if (response == false) {
      $(window).on("load", function() {
        $('#createPin').modal('show');
      })
    } 
    console.log(response);
  })
  .catch(error => console.log('error', error));
///////////////////////////////////////////////////////////////


// POST Create A New Pin
function sendCreatePinData() {
  var createPin = {};
  createPin["pin"] = document.getElementById("pinT").value;
  createPin["confirmPin"] = document.getElementById("confirmPinT").value;
  return createPin;
}

const createPinForm = document.getElementById("createPinForm");
createPinForm.addEventListener("submit", function (e) {
  e.preventDefault();

  displayCreatePinError("");

  var myHeaders = new Headers();
  var payloadData = sendCreatePinData();
  myHeaders.append("Authorization", `Bearer ${getToken}`);
  myHeaders.append("Content-Type", "application/json");
  fetch(`${baseUrl}/api/Auth/CreatePin`, { 
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(payloadData),
  })
  .then(response => response.json())
  .then(result => {
    console.log(result);

    // ANOTHER METHOD TO DISPLAY ERRORS ON THE FRONTEND
    // let li = "";
    // result.errors.confirmPin.map(item=>{
    //   li = li + `<li>${item}</li>`
    // });
    // let errorOutput = document.getElementById("error_msg_ForCreatePin")
    // errorOutput.innerHTML = `<ul>${li}</ul>`;
    ////////////////////////////////////////////

    // Do for set security questions. Modal should pop up once user opens his profile page


    if (!result.status) {
      return displayCreatePinError(result.message);
    }
    displayCreatePinSuccess(result.message);

    setTimeout(
      function () {
        window.location.replace(`http://127.0.0.1:5500/html/UserProfile.html`);
      },2000
    );
  })
  .catch(error => console.log('error', error));
})

function displayCreatePinError(message){
  document.getElementById("error_msg_ForCreatePin").innerHTML = message
}
function displayCreatePinSuccess(message){
  document.getElementById("success_msg_ForCreatePin").innerHTML = message
}
//////////////////////////////////////////////////


//GET DETAILS ON ACCOUNT NUMBER POST
function getAccountData() {
  var accountData = {};
  accountData["searchInfo"] = document.getElementById("searchBy").value;
  return accountData;
}

var generatedDeets = document.getElementById("generateDetails");
generatedDeets.addEventListener("click", function (e) {
  e.preventDefault();
  var selectedInput = document.getElementById("searchBy");
  var myHeaders = new Headers();
  var payloadData = getAccountData();
  myHeaders.append("Authorization", `Bearer ${getToken}`);
  const url = new URL(`${baseUrl}/api/Account/AccountLookUp?`); 
  url.searchParams.append("searchInfo", `${selectedInput.value}`); //appending in the url????
  fetch(url, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(payloadData),
  }).then(response => response.json())
  .then(result => {
    console.log(result);
    setAccountInfo(result);
    var accountsInfo = getAccountInfo();
    displayAccountEnquiryDiv(accountsInfo);
  })
  .catch(error => console.log('error', error));
});

function setAccountInfo(dataFromAccount) {
  localStorage.setItem("accountInfo",JSON.stringify(dataFromAccount));
}

function getAccountInfo () {
  const accountsInfo = JSON.parse(localStorage.getItem("accountInfo")); 
  return accountsInfo;
}

function displayAccountEnquiryDiv(accountsInfo) {
  document.getElementById("accountEnquiryDiv").classList.add("d-none");
  document.getElementById("accountEnquiryError").classList.add("d-none");
  if (accountsInfo.status) {
    document.getElementById("accountEnquiryDiv").classList.remove("d-none");
    document.getElementById("destFirstName").innerText = accountsInfo.firstName;
    document.getElementById("destiLastName").innerText = accountsInfo.lastName;
    document.getElementById("destiAcctNum").innerText = accountsInfo.acctNumber;
  } else {
    document.getElementById("accountEnquiryError").classList.remove("d-none");
    document.getElementById("accountEnquiryError").innerHTML = "Account Not Found";
  }
}


// TRANSFER MONEY
const transferForm = document.getElementById("transferForm");

transferForm.addEventListener("submit", function (e) {
  e.preventDefault();

  displayError("");

  var transferData = {};
  transferData["sourceAccount"] = document.getElementById("dAccount").innerText;
  transferData["destinationAccount"] = document.getElementById("destiAcctNum").innerText;
  transferData["amount"] = document.getElementById("userSend").value;
  transferData["pin"] = document.getElementById("pin").value;

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${getToken}`);
  myHeaders.append("Content-Type", "application/json");
  fetch(`${baseUrl}/api/Transaction/CreateTransfer`, { 
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(transferData),
  }).then(response => response.json())
  .then(response => {
    console.log(response);

    if(!response.status){
      return displayError(response.responseMessage);
    }

    toastr.success("Money has been sent","Transfer Successful");
    toastr.options = {
      "closeButton": true,
      "debug": false,
      "newestOnTop": false,
      "progressBar": false,
      "positionClass": "toast-top-right",
      "preventDuplicates": false,
      "onclick": null,
      "showDuration": "300",
      "hideDuration": "1000",
      "timeOut": "5000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    }
    setTimeout(
      function () {
        window.location.replace(`http://127.0.0.1:5500/html/Dashboard.html`);
      },3500
    );
    
  })
  .catch(({response}) => {
    console.log(response);
  });
});


function displayError(message){
  document.getElementById("error_msg").innerHTML = message
}


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

