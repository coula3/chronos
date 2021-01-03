const CHRONOS_URL = "http://localhost:3000/api/v1";

let buttonSignIn, buttonCreateUser, addEmployeeForm, breakStarted, breakEnded, clockedOut, isProfile, isEditProfile, isChangePassword, hasTimeEvent;
const localStorageData = JSON.parse(localStorage.getItem('data'));
const employeeId = localStorageData && localStorageData.employee.id;
const isAuthenticated = localStorage.getItem('jwt_token');
const editModeTimeEvent = localStorage.getItem('editModeTimeEvent');

document.addEventListener("DOMContentLoaded", () => {
    const currentTimeEvent = JSON.parse(localStorage.getItem('newTimeEvent'));

    if(!isAuthenticated){
        document.getElementById("main-container").innerHTML += signInForm;
    }

    buttonSignIn = document.getElementById("btn-sign-in");
    buttonCreateUser = document.getElementById("btn-create-user");
    addEmployeeForm = document.getElementById("form-create-employee");
    isProfile = localStorage.getItem('rendered') === "Profile";
    isEditProfile = localStorage.getItem('rendered') === "Edit Profile";
    isChangePassword = localStorage.getItem('rendered') === "Change Password";
    hasTimeEvent = isAuthenticated && localStorageData && JSON.parse(localStorage.getItem('data')).employee.time_events.length;

    appendCurrentTime();
    stageSignUpSignIn();
    getTimeEventStatus(currentTimeEvent);
    updateRunningTime(currentTimeEvent);

    if(isAuthenticated){
        if(breakStarted && breakEnded && clockedOut){
            updateDOMOnReload(employeeId);
        } else if(isAuthenticated && editModeTimeEvent){
            updateDOMOnReload(employeeId, editModeTimeEvent);
        } else if(isProfile){
            reloadProfile();
        } else if(isEditProfile){
            reloadEditProfile();
        } else if(isChangePassword){
            reloadChangePassword();
        } else if(isAuthenticated){
            reSignInEmployee(localStorageData);
        }
    }
})

function stageSignUpSignIn(){
    stageCreateEmployeeForm();
    stageSignInButton();
}

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

function updateDOMOnReload(employeeId, editModeTimeEvent){
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
        if(editModeTimeEvent && breakEnded){
            resetButtonBreakResume();
            resetButtonClockInOut();
        } else if(editModeTimeEvent){
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

function addCommonElementsToDOM(){
    addSignOutBtnOnReSignInEmployee();

    const employee = instantiateEmployeeObject(localStorageData.employee);
    const employeeNameTag = createEmployeeNameTag(employee);
    createDivNameTag(employeeNameTag);
    createDivMenu();

    if(employee.position === "Manager"){
        appendButtonAdmin();
    }
}

function reloadProfile(){
    addCommonElementsToDOM();

    appendEmployeeProfile(generateProfileCard());
    setSwitchToEditProfileCard();
    setSwitchToPasswordCard();
}

function reloadEditProfile(){
    addCommonElementsToDOM();

    appendEmployeeProfile(generateEditProfileCard());
    editProfile();
}

function reloadChangePassword(){
    addCommonElementsToDOM();

    appendEmployeeProfile(passwordCard);
    changePassword();
}