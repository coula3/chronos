const CHRONOS_URL = "http://localhost:3000";
const buttonSignIn = document.getElementById("btn-sign-in");

buttonSignIn.addEventListener("click", (e) => {
    e.preventDefault();
    getEmployeeData();
})


function getEmployeeData() {
    email = document.getElementById("sign-in").value;

    fetch(`${CHRONOS_URL}/employees/${email}`)
    .then(response => response.json())
    .then(json => console.log(json))
}