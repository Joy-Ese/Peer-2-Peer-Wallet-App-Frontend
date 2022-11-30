const usersData = JSON.parse(localStorage.getItem("userData")); 
// console.log(usersData);

const dUser = document.getElementById("dUsername");
const dAcc = document.getElementById("dAccount");
const dBal = document.getElementById("dBalance");

dUser.insertAdjacentText("beforeend", usersData.username);
dAcc.insertAdjacentText("beforeend", usersData.accountNumber);
dBal.insertAdjacentText("beforeend", usersData.balance);


// Populate Transaction Table HttpGet
var requestOptions = {
  method: 'GET',
};
  fetch(`https://localhost:44378/api/Transaction/TransactionDetails?AccountNumber=${usersData.accountNumber}`, requestOptions
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


