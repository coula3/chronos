const CHRONOS_URL = "http://localhost:3000/api/v1";

document.addEventListener("DOMContentLoaded", () => {
    const isAuthenticated = localStorage.getItem('jwt_token');
    const data = JSON.parse(localStorage.getItem('data'));
    const editMode = JSON.parse(localStorage.getItem('editMode'));;
    const employeeId = data && data.employee.id;

    if(isAuthenticated && editMode){
        updateDOM(employeeId);
    } else if(isAuthenticated){
        reSignInEmployee(data);
    }
})

function updateDOM(employeeId){
    fetch(`${CHRONOS_URL}/employees/${employeeId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
        }
    })
    .then(response => response.json())
    .then(data => {
        reSignInEmployee(data);
        buttonClockInOut.innerText = "Clock Out";
        buttonClockInOut.style.color = "#000";
        buttonClockInOut.style.backgroundColor = "";
    })
}