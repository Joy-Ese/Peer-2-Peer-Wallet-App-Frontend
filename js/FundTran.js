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


//GET DETAILS ON ACCOUNT NUMBER POST
const getToken = localStorage.getItem("jwt");

function getAccountData() {
  var accountData = {};
  accountData["AccountNumber"] = document.getElementById("destinationAcc").value;
  return accountData;
}

var generatedDeets = document.getElementById("generateDetails");
generatedDeets.addEventListener("click", function (e) {
  e.preventDefault();
  var selectedInput = document.getElementById("destinationAcc");
  var myHeaders = new Headers();
  var payloadData = getAccountData();
  myHeaders.append("Authorization", `Bearer ${getToken}`);
  const url = new URL(`${baseUrl}/api/Account/AccountLookUp?`); 
  url.searchParams.append("AccountNumber", `${selectedInput.value}`);
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
  transferData["destinationAccount"] = document.getElementById("destinationAcc").value;
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

    toastr.success("Transfer Successful");
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

