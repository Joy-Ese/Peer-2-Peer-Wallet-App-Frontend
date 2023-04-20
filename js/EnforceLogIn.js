const token = localStorage.getItem("jwt");

if (token == null) {
  Swal.fire({
    icon: 'error',
    title: 'No authorization',
    // text: 'No autourization',
    // footer: '<a href="http://127.0.0.1:5500/html/UserLogIn.html">Please login to your apllication</a>'
  })
  setTimeout(
    function () {
      window.location.replace(`http://127.0.0.1:5500/html/UserLogIn.html`);
    },3000
  );
}




