const CHRONOS_URL = "http://localhost:3000/api/v1";

let breakStarted, breakEnded, clockedOut;

document.addEventListener("DOMContentLoaded", () => {
    const localStorageData = JSON.parse(localStorage.getItem('data'));
    const currentTimeEvent = JSON.parse(localStorage.getItem('newTimeEvent'));
    const employeeId = localStorageData && localStorageData.employee.id;
    const isAuthenticated = localStorage.getItem('jwt_token');
    const editMode = JSON.parse(localStorage.getItem('editMode'));

    getTimeEventStatus(currentTimeEvent);

    if(breakStarted && breakEnded && clockedOut){
        updateDOM(employeeId);
    } else if(isAuthenticated && editMode){
        updateDOM(employeeId);
    } else if(isAuthenticated){
        reSignInEmployee(localStorageData);
    }
})

function getTimeEventStatus(currentTimeEvent){
    if(currentTimeEvent && currentTimeEvent.timeOut){
        breakStarted = true;
        breakEnded = true;
        clockedOut = true;
    } else if(currentTimeEvent && currentTimeEvent.breakEnd){
        breakStarted = true;
        breakEnded = true;
    } else if(currentTimeEvent && currentTimeEvent.breakStart){
        breakStarted = true;
    }
}

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

