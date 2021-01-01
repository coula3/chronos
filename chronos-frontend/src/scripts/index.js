const CHRONOS_URL = "http://localhost:3000/api/v1";

let buttonSignIn, buttonCreateUser, addEmployeeForm, breakStarted, breakEnded, clockedOut, hasTimeEvent;

document.addEventListener("DOMContentLoaded", () => {
    const localStorageData = JSON.parse(localStorage.getItem('data'));
    const currentTimeEvent = JSON.parse(localStorage.getItem('newTimeEvent'));
    const employeeId = localStorageData && localStorageData.employee.id;
    const isAuthenticated = localStorage.getItem('jwt_token');
    const editMode = JSON.parse(localStorage.getItem('editMode'));

    document.getElementById("main-container").innerHTML += signInForm;

    buttonSignIn = document.getElementById("btn-sign-in");
    buttonCreateUser = document.getElementById("btn-create-user");
    addEmployeeForm = document.getElementById("form-create-employee");
    hasTimeEvent = isAuthenticated && localStorageData && JSON.parse(localStorage.getItem('data')).employee.time_events.length;

    appendCurrentTime();
    stageSignInButton();
    stageCreateEmployeeForm();
    getTimeEventStatus(currentTimeEvent);
    updateRunningTime(currentTimeEvent);

    if(isAuthenticated){
        if(breakStarted && breakEnded && clockedOut){
            updateDOM(employeeId);
        } else if(isAuthenticated && editMode){
            updateDOM(employeeId, editMode);
        } else if(isAuthenticated){
            reSignInEmployee(localStorageData);
        }
    }
})

function updateRunningTime(currentTimeEvent){
    if(JSON.parse(localStorage.getItem('runningTimeStarted'))){
        return addRunningTime(currentTimeEvent);
    }
}

function getTimeEventStatus(currentTimeEvent){
    if(currentTimeEvent && (currentTimeEvent.timeOut || currentTimeEvent.time_out)){
        breakStarted = true;
        breakEnded = true;
        clockedOut = true;
    } else if(currentTimeEvent && (currentTimeEvent.breakEnd || currentTimeEvent.break_end)){
        breakStarted = true;
        breakEnded = true;
    } else if(currentTimeEvent && (currentTimeEvent.breakStart || currentTimeEvent.break_start)){
        breakStarted = true;
    }
}

function updateDOM(employeeId, editMode){
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
        if(editMode && breakEnded){
            resetButtonBreakResume();
            resetButtonClockInOut();
        } else if(editMode){
            resetButtonClockInOut();
        }
    })
}

function resetButtonClockInOut(){
    buttonClockInOut.innerText = "Clock Out";
    buttonClockInOut.style.color = "#000";
    buttonClockInOut.style.backgroundColor = "";
}

function resetButtonBreakResume(){
    buttonBreakResume.innerText = "Take Break";
    buttonBreakResume.disabled = true;
    buttonClockInOut.style.color = "#000";
    buttonClockInOut.style.backgroundColor = "";
}