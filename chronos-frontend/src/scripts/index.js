const CHRONOS_URL = "http://localhost:3000/api/v1";

let buttonSignIn, buttonCreateUser, addEmployeeForm, breakStarted, breakEnded, clockedOut, isNewUser, isTimeData, isProfile, isEditProfile, isChangePassword;
const localStorageData = JSON.parse(localStorage.getItem('data'));
const employeeId = localStorageData && localStorageData.employee.id;
const isAuthenticated = localStorage.getItem('jwt_token');
const editModeTimeEvent = JSON.parse(localStorage.getItem('editModeTimeEvent'));

document.addEventListener("DOMContentLoaded", () => {
    const currentTimeEvent = JSON.parse(localStorage.getItem('newTimeEvent'));

    if(!isAuthenticated){
        appendImageOfWorkers();

        document.getElementById("main-container").innerHTML += signInForm;

        buttonSignIn = document.getElementById("btn-sign-in");
        buttonSignIn.style.cssText += "background-color: #9932CC; color: #FFF";
    }

    buttonCreateUser = document.getElementById("btn-create-user");
    addEmployeeForm = document.getElementById("form-create-employee");

    isNewUser = localStorage.getItem('rendered') === "New User";
    isTimeData = localStorage.getItem('rendered') === "Time Data";
    isProfile = localStorage.getItem('rendered') === "Profile";
    isEditProfile = localStorage.getItem('rendered') === "Edit Profile";
    isChangePassword = localStorage.getItem('rendered') === "Change Password";

    appendCurrentTime();
    stageSignUpSignIn();
    getTimeEventStatus(currentTimeEvent);
    updateRunningTime(currentTimeEvent);
    checkBeforeReRender();
})

function checkBeforeReRender(){
    if(isAuthenticated){
        if(breakStarted && breakEnded && clockedOut){
            updateDOMOnReload(employeeId);
        } else if(isNewUser){
            updateDOMOnReload(employeeId);
        } else if(isTimeData){
            updateDOMOnReload(employeeId, editModeTimeEvent);
        } else if(isProfile){
            reloadProfile();
        } else if(isEditProfile){
            reloadEditProfile();
        } else if(isChangePassword){
            reloadChangePassword();
        }
    }
}

function stageSignUpSignIn(){
    stageCreateEmployeeForm();
    stageSignInButton();
    if(!localStorage.getItem('jwt_token')){
        document.getElementById("btn-sign-in").style.cssText += "background-color: #9932CC; color: #FFF";
    }
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
    buttonClockInOut.style.cssText += "background-color: #9932CC; color: #FFF";
}

function resetButtonBreakResume(){
    buttonBreakResume.innerText = "Take Break";
    buttonBreakResume.disabled = true;
    buttonClockInOut.style.color = "#000";
    buttonClockInOut.style.backgroundColor = "";
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

function addCommonElementsToDOM(){
    addSignOutBtnOnReSignInEmployee();

    const employee = instantiateEmployeeObject(localStorageData.employee);
    const employeeNameTag = createEmployeeNameTag(employee);
    createDivNameTag(employeeNameTag);
    createDivMenu();

    if(employee.position === "Manager"){
        appendButtonAdmin();
    }
    clearInterval(runningTimeInterval);
}