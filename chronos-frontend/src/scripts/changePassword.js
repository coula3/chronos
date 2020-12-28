const divPasswordCard = `
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
                <button id="passwordToProfileBtn" class="profileButtons" disabled>Profile</button>
            </div>
        </form>
    </div>
`

function changePassword(){
    const passwordForm = document.getElementById("changePasswordForm");
    const currentPassword = document.getElementById("currentPassword");
    const newPassword = document.getElementById("newPassword");
    const confirmPassword = document.getElementById("confirmPassword");

    if(passwordForm){
        passwordForm.addEventListener("submit", (e) => {
            e.preventDefault();

            console.log(currentPassword.value)
            console.log(newPassword.value)
            console.log(confirmPassword.value)
        })
    }
}