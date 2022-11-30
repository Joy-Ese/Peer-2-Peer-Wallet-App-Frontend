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
  myHeaders.append("Content-Type", "application/json");
  const url = new URL(`https://localhost:44378/api/User/AccountLookUp`);
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

  var transferData = {};
  transferData["sourceAccount"] = document.getElementById("dAccount").innerText;
  transferData["destinationAccount"] = document.getElementById("destinationAcc").value;
  transferData["amount"] = document.getElementById("userSend").value;

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  fetch(`https://localhost:44378/api/Transaction/CreateTransfer`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(transferData),
  }).then(response => response.json())
  .then(result => {
    console.log(result)
  })
  .catch(error => console.log('error', error));
});


$(document).ready(function() {

$('#linkButton').click(function() {
    toastr.success("Transfer Successful");
    setTimeout(
      function () {
        window.location.replace(`http://127.0.0.1:5500/html/Dashboard.html`);
      },2500
    );
  });

});

