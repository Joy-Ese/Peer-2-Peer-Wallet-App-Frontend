const baseUrl = "http://localhost:7236";

const usersData = JSON.parse(localStorage.getItem("userData")); 
// console.log(usersData);

const dUser = document.getElementById("dUsername");
const dAcc = document.getElementById("dAccount");

dUser.insertAdjacentText("beforeend", usersData.username);
dAcc.insertAdjacentText("beforeend", usersData.accountNumber);

// FirstName and LastName Avatar


// GET Account Balance From Database
const getToken = localStorage.getItem("jwt");

var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${getToken}`);

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
};
  fetch(`${baseUrl}/api/Dashboard/AccountBalance`, 
  requestOptions
  ).then(response => response.json())
  .then(dataBal => {
    console.log(dataBal);
    document.getElementById("userBalance").innerHTML = dataBal.balance;
  })
  .catch(error => console.log('error', error));



// Populate Transaction Table HttpGet
var requestOptions = {
  method: 'GET',
  headers: myHeaders,
};
  fetch(`${baseUrl}/api/Transaction/TransactionDetails`, requestOptions
  ).then(
    response => 
    { 
      response.json().then(
        data => {
          var transactionList = "";
          data.map((a) => {
            transactionList += "<tr>";
            transactionList += "<td>" + a.amount + "</td>";
            transactionList += "<td>" + a.destinationAccount + "</td>";
            transactionList += `<td> ${new Date(a.date).toLocaleString()} </td>`;
            transactionList += "</tr>"
          });
          document.getElementById("data").innerHTML += transactionList;
        }
      )
    }
  );


// Jquery Data Table
$(document).ready(function () {
  $('#example').DataTable();
});


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




