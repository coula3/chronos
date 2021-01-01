const passwordCard = `
    <div id="passwordCard">
        <h2 class="profileHeader">Change Password</h2>
        <form id="changePasswordForm">
            <p class="profileCaption">Enter current password</p>
            <p class="profileParagraph"><input id="currentPassword" class="passwordInputs" type="password"></input></p>

            <p class="profileCaption">Enter new password</p>
            <p class="profileParagraph"><input id="newPassword" class="passwordInputs" type="password"></input></p>

            <p class="profileCaption">Confirm new password</p>
            <p class="profileParagraph"><input id="confirmPassword" class="passwordInputs" type="password"></input></p>

            <div class="profileButtonsDiv">
                <button id="passwordSaveBtn" class="profileButtons">Save</button>
                <button id="passwordToProfileBtn" class="profileButtons">Profile</button>
            </div>
        </form>
    </div>
`;

function changePassword(){
    const passwordForm = document.getElementById("changePasswordForm");

    if(passwordForm){
        passwordForm.addEventListener("submit", (e) => {
            e.preventDefault();

            if(e.submitter.innerText === "Save"){
                checkPasswordEntries();
            } else {
                switchPasswordToProfile();
            }
        })
    }
}

function checkPasswordEntries(){
    const currentPassword = document.getElementById("currentPassword");
    const newPassword = document.getElementById("newPassword");
    const confirmPassword = document.getElementById("confirmPassword");
    const msgColor = "red";

    if((currentPassword.value && newPassword.value) && !confirmPassword.value){
        renderMessage("Please confirm new password", msgColor);
    } else if(!currentPassword.value || !newPassword.value || !confirmPassword.value){
        renderMessage("Please provide current and new passwords", msgColor);
    } else if (newPassword.value !== confirmPassword.value){
        renderMessage("Please provide matching new passwords", msgColor);
    } else {
       updatePassword(currentPassword.value, newPassword.value);
    }
}

function updatePassword(currentPassword, newPassword){
    const employeeId = JSON.parse(localStorage.getItem('data')).employee.id;
    const bodyObj = {employee: {password: currentPassword, newPassword}};

    fetch(`${CHRONOS_URL}/employees/${employeeId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
        },
        body: JSON.stringify(bodyObj)
    })
    .then(response => response.json())
    .then(data => {
        if(data.employee){
            switchPasswordToProfile();
            renderMessage("Password successfully updated", msgColor="green");
        } else {
            renderMessage(data.message, msg="red");
        }
    })
}

function switchPasswordToProfile(){
    document.getElementById("span-message").innerText = ""
    document.getElementById("passwordCard").remove();
    divEmployeeProfile.innerHTML += generateProfileCard();
    setSwitchToPasswordCard();
    setSwitchToEditProfileCard();
}