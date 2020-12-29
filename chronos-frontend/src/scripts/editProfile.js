
function generateEditProfileCard(){
    const localStorageData = JSON.parse(localStorage.getItem('data'));

    const editProfileCard = `
        <div id="editProfileCard">
        <h2 class="profileHeader">Edit Profile</h2>
        <form id="editProfileForm">
            <p class="profileCaption">First name</p>
            <p class="profileParagraph"><input id="profileFirstName" class="editProfileInputs" type="text" value=${localStorageData.employee.first_name}></input></p>

            <p class="profileCaption">Last name</p>
            <p class="profileParagraph"><input id="profileLastName" class="editProfileInputs" type="text" value=${localStorageData.employee.last_name}></input></p>

            <p class="profileCaption">Position</p>
            <p class="profileParagraph"><input id="profilePosition" class="editProfileInputs" type="text" value=${localStorageData.employee.position}></input></p>

            <p class="profileCaption">Email</p>
            <p class="profileParagraph"><input id="profileEmail" class="editProfileInputs" type="text" value=${localStorageData.employee.email}></input></p>

            <div class="profileButtonsDiv">
                <button id="profileSaveBtn" class="profileButtons">Save</button>
                <button id="editProfileToProfileBtn" class="profileButtons">Profile</button>
            </div>
        </form>
        </div>
    `;

    return editProfileCard;
}
