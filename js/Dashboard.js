const usersData = JSON.parse(localStorage.getItem("userData")); 
console.log(usersData);

const dUser = document.getElementById("dUsername");
const dAcc = document.getElementById("dAccount");
const dBal = document.getElementById("dBalance");

dUser.insertAdjacentText("beforeend", usersData.username);
dAcc.insertAdjacentText("beforeend", usersData.accountNumber);
dBal.insertAdjacentText("beforeend", usersData.balance);

