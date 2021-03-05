const divEmployeeProfile = document.createElement("div");
divEmployeeProfile.setAttribute("id", "profile-container");
divEmployeeProfile.style.cssText = "clear: both";

function generateProfileCard(){
    const localStorageData = JSON.parse(localStorage.getItem('data'));

    if(localStorageData){
        const profileCard = `
            <div id="profileCard">
                <h2 class="profileHeader">Profile</h2>
                <p class="profileCaption">Name</p>
                <p class="profileParagraph">${capitalize(localStorageData.employee.first_name)} ${capitalize(localStorageData.employee.last_name)}</p>

                <p class="profileCaption">Position</p>
                <p class="profileParagraph">${localStorageData.employee.position}</p>

                <p class="profileCaption">Email</p>
                <p class="profileParagraph">${localStorageData.employee.email}</p>
                <div class="profileButtonsDiv">
                    <button id="editProfile" class="profileButtons">Edit</button>
                    <button id="changePassword" class="profileButtons">Change Password</button>
                </div>
            </div>
        `;

    return profileCard;
    }
}

buttonProfile.addEventListener("click", (e) => {
    const isTimeEventOnEditMode = JSON.parse(localStorage.getItem('isTimeEventOnEditMode'));
    document.getElementById("span-message").innerText = "";

    if(e.target.innerText === "Profile"){
        clearTimeout(activateButtonTimeout);
        clearInterval(runningTimeInterval);
        localStorage.setItem("rendered", "Profile");

        divEmployeeProfile.innerHTML = "";
        document.getElementById("events-container") && document.getElementById("events-container").remove();
        appendEmployeeProfile(generateProfileCard());

        setSwitchToPasswordCard();
        setSwitchToEditProfileCard();
    } else {
        divEmployeeProfile.remove();
        e.target.innerText = "Profile";
        localStorage.setItem("rendered", "Time Data");
        buttonClockInOut.disabled = false;
        if(isTimeEventOnEditMode){
            buttonClockInOut.style.cssText += "margin-left: 15px; background-color: #9932CC; color: #FFF";
        } else {
            buttonClockInOut.style.cssText += "margin-left: 15px; background-color: #0000FF; color: #FFF";
        }

        const employeeId = JSON.parse(localStorage.getItem('data')).employee.id;

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
            const employee = instantiateEmployeeObject(data.employee);

            renderEmployeeTimeEvents(employee);

            if(JSON.parse(localStorage.getItem('isTimeEventOnEditMode'))){
                const newTimeEvent = JSON.parse(localStorage.getItem('newTimeEvent'));

                if((newTimeEvent.break_start || newTimeEvent.breakStart) && (newTimeEvent.break_end || newTimeEvent.breakEnd)){
                    resetBreakResumeButton();
                    resetClockInOutButton();
                }
                addRunningTime(newTimeEvent);
            }
        })
    }
})

function appendEmployeeProfile(card){
    buttonClockInOut.disabled = true;
    buttonClockInOut.style.cssText = "margin-left: 15px; background-color: null, color: #000";
    document.getElementById("p-new-user-msg") && document.getElementById("p-new-user-msg").remove();
    document.getElementById("events-container") && document.getElementById("events-container").remove();
    document.getElementById("btn-profile").innerText = "Time Data";
    document.getElementById("span-message").innerText = "";
    document.getElementById("span-message").after(divEmployeeProfile);

    divEmployeeProfile.innerHTML += card;
}

function setSwitchToPasswordCard(){
    if(document.getElementById("changePassword")){
        document.getElementById("changePassword").addEventListener("click", () => {
            document.getElementById("profileCard").remove();
            divEmployeeProfile.innerHTML += passwordCard;
            document.getElementById("span-message").innerText = "";

            changePassword();

            localStorage.setItem('rendered', 'Change Password');
        })
    }
}

function setSwitchToEditProfileCard(){
    if(document.getElementById("editProfile")){
        document.getElementById("editProfile").addEventListener("click", () => {
            document.getElementById("profileCard").remove();
            divEmployeeProfile.innerHTML += generateEditProfileCard();
            document.getElementById("span-message").innerText = "";

            editProfile();

            localStorage.setItem('rendered', 'Edit Profile');
        })
    }
}