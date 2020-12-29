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
                switchToProfileCard();
            }
        })
    }
}

function checkPasswordEntries(){
    const currentPassword = document.getElementById("currentPassword");
    const newPassword = document.getElementById("newPassword");
    const confirmPassword = document.getElementById("confirmPassword");

    if((currentPassword.value && newPassword.value) && !confirmPassword.value){
        displayMessages("Please confirm new password");
    } else if(!currentPassword.value || !newPassword.value || !confirmPassword.value){
        displayMessages("Please provide current and new passwords");
    } else if (newPassword.value !== confirmPassword.value){
        displayMessages("Please provide matching new passwords");
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
            switchToProfileCard();
            displayMessages("Password successfully updated");
        } else {
            displayMessages(data.message);
        }
    })
}

function switchToProfileCard(){
    document.getElementById("span-message").innerText = ""
    document.getElementById("passwordCard").remove();
    divEmployeeProfile.innerHTML += generateProfileCard();
    setSwitchToPasswordCard();
}