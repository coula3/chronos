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

function capitalize(string){
    return string[0].toUpperCase() + string.slice(1);
}

buttonProfile.addEventListener("click", (e) => {
    if(e.target.innerText === "Profile"){
        clearInterval(runningTimeInterval);
        localStorage.setItem("rendered", "Profile");

        appendEmployeeProfile(generateProfileCard());

        setSwitchToPasswordCard();
        setSwitchToEditProfileCard();
    } else {
        divEmployeeProfile.innerHTML = "";
        divEmployeeProfile.remove();
        e.target.innerText = "Profile";
        localStorage.setItem("rendered", "Time Data");
        buttonClockInOut.disabled = false;
        buttonClockInOut.style.cssText += "margin-left: 15px; background-color: #0000FF; color: #FFF";

        const employee = instantiateEmployeeObject(localStorageData.employee);
        renderEmployeeTimeEvents(employee);
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