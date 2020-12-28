const divEmployeeProfile = document.createElement("div");
divEmployeeProfile.setAttribute("id", "profile-container");
divEmployeeProfile.style.cssText = "clear: both";

buttonProfile.addEventListener("click", (e) => {
    const localStorageData = JSON.parse(localStorage.getItem('data'));

    if(e.target.innerText === "Profile"){
        clearInterval(runningTimeInterval);
        localStorage.setItem("rendered", "Profile");

        appendEmployeeProfile(localStorageData);

    } else {
        divEmployeeProfile.remove();
        e.target.innerText = "Profile";
        localStorage.setItem("rendered", "Time Data");
        location.reload();
    }

    switchToPasswordCard();
})

function appendEmployeeProfile(localStorageData){
    buttonClockInOut.disabled = true;
    buttonClockInOut.style.cssText = "background-color: null, color: #000";
    document.getElementById("p-new-user-msg") && document.getElementById("p-new-user-msg").remove();
    document.getElementById("events-container") && document.getElementById("events-container").remove();
    document.getElementById("btn-profile").innerText = "Time Data";
    document.getElementById("span-message").innerText = "";
    document.getElementById("span-message").after(divEmployeeProfile);

    const capitalize = (string) => {
        return string[0].toUpperCase() + string.slice(1);
    }

    divEmployeeProfile.innerHTML += `
        <div id="profileCard">
            <h2 class="profileHeader">Profile</h2>
            <form id="changePassowrdForm">
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
            </form>
        </div>
    `;
}

function switchToPasswordCard(){
    if(document.getElementById("changePassword")){
        document.getElementById("changePassword").addEventListener("click", () => {
            document.getElementById("profileCard").remove();
            divEmployeeProfile.innerHTML += divPasswordCard;
        })
    }
}

