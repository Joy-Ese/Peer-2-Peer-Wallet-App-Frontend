const baseUrl = "http://localhost:7236";

const getToken = localStorage.getItem("jwt");

const usersData = JSON.parse(localStorage.getItem("userData")); 
// console.log(usersData);

const dUser = document.getElementById("dUsername");

dUser.insertAdjacentText("beforeend", usersData.username);

// POST paystack initialize transaction
function sendAmountData() {
  var amountData = {};
  amountData["amount"] = document.getElementById("amount").value;
  return amountData;
}

const fundAcctForm = document.getElementById("fundAcctForm");

fundAcctForm.addEventListener("submit", function (e) {
  e.preventDefault();

  var myHeaders = new Headers();
  var payloadData = sendAmountData();
  myHeaders.append("Authorization", `Bearer ${getToken}`);
  myHeaders.append("Content-Type", "application/json");
  fetch(`${baseUrl}/api/Payment/InitializePaystackPayment`, {
    method: "POST", 
    headers: myHeaders,
    body: JSON.stringify(payloadData),
  })
  .then(response => response.json())
  .then(result => {
    console.log(result);

    if (!result.status) {
      return displayError(result.message);
    }

    window.open(result.data.authorization_url, '_blank');

    setTimeout(
      function () {
        window.location.replace(`http://127.0.0.1:5500/html/Dashboard.html`);
      },80000
    );
  })
  .catch(error => console.log('error', error));
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