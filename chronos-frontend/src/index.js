const CHRONOS_URL = "http://localhost:3000";
const buttonSignIn = document.getElementById("btn-sign-in");

buttonSignIn.addEventListener("click", (e) => {
    e.preventDefault();
    getEmployeeData();
})