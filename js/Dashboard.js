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
    document.getElementById("userBalance").innerHTML = Intl.NumberFormat('en-US').format(dataBal.balance);
  })
  .catch(error => console.log('error', error));


// Populate Transaction Table HttpGet
var requestOptions = {
  method: 'GET',
  headers: myHeaders,
};
  fetch(`${baseUrl}/api/Transaction/GetTransactionList`, requestOptions
  ).then(
    response => 
    { 
      response.json().then(
        data => {
          var transactionList = "";
          data.map((a) => {
            transactionList += `<tr>`;
            transactionList += `<td class="${a.transactionType === 'CREDIT' ? 'green-text' : 'red-text'}">` + Intl.NumberFormat('en-US').format(a.amount) + "</td>";
            transactionList += "<td>" + a.senderInfo + "</td>";
            transactionList += "<td>" + a.recepientInfo + "</td>";
            transactionList += `<td class="${a.transactionType === 'CREDIT' ? 'green-text' : 'red-text'}">` + a.transactionType + "</td>";
            transactionList += "<td>" + a.currency + "</td>";
            transactionList += "<td>" + a.status + "</td>";
            transactionList += `<td> ${new Date(a.date).toLocaleString()} </td>`;
            transactionList += `</tr>`;
          });
          document.getElementById("data").innerHTML += transactionList;
        }
      )
    }
  );


//Jquery Data Table
$( document ).ready(function () {
  $('#example').DataTable({
    scrollY: 300,
    scrollX: true,
});
});



// // Signal R Connetion
// const connection = new signalR.HubConnectionBuilder()
//   .withUrl("/notifications")
//   .build();

// connection.start().then(() => {
//   alert("Signal R connection established");
//   invokeNotification();
// }).catch((err) => {
//   console.error(err);
// });

// function invokeNotification() {
//   document.getElementById("SendNotification").addEventListener("click", event => {
//     const userInfo = JSON.parse(localStorage.getItem("userData")); 
//     const user = userInfo.username;
//     const message = "You just got a new notification";
//     // const message = document.getElementById("notificationMsg").value;
//     connection.invoke("SendNotification", user, message).catch(err => console.error(err.toString()));
//     event.preventDefault();
//   });  
// };

// connection.on("ReceiveNotification", (user, message) => {
//   // const userInfo = JSON.parse(localStorage.getItem("userData")); 
//   // const user = userInfo.username;
//   // const message = "You just got a new notification";
//   console.log(user + " says: " + message);
// });




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




