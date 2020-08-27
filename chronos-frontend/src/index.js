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
    .then(json => {
        renderEmployeeData(json);
    })
}

function renderEmployeeData(employeeObject) {
    const h2 = document.createElement("h2");
    h2.innerText = `Hi ${employeeObject.first_name}!`
    document.getElementById("div-signup-signin").after(h2)
}