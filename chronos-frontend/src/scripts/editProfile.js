function generateEditProfileCard(){
    const localStorageData = JSON.parse(localStorage.getItem('data'));
    const positionOptions = employeePositions.map(position => {
        const selected = localStorageData.employee.position === position ? "selected" : null;
        return  `<option value="${position}" ${selected}>${position}</option>`;
    });

    const editProfileCard = `
        <div id="editProfileCard">
        <h2 class="profileHeader">Edit Profile</h2>
        <form id="editProfileForm">
            <p class="profileCaption">First name</p>
            <p class="profileParagraph"><input id="profileFirstName" class="editProfileInputs" type="text" value=${localStorageData.employee.first_name}></input></p>

            <p class="profileCaption">Last name</p>
            <p class="profileParagraph"><input id="profileLastName" class="editProfileInputs" type="text" value=${localStorageData.employee.last_name}></input></p>

            <p class="profileCaption">Position</p>
            <p class="profileParagraph">
                <select type="select" id="profilePosition" class="editProfileInputs" name="position">
                    ${positionOptions}
                </select>
            </p>

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

function editProfile(){
    const editProfileForm = document.getElementById("editProfileForm");

    if(editProfileForm){
        editProfileForm.addEventListener("submit", (e) => {
            e.preventDefault();

            if(e.submitter.innerText === "Save"){
                updateProfile();
            } else {
                switchEditProfileToProfile();
            }
        })
    }
}

function switchEditProfileToProfile(){
    document.getElementById("span-message").innerText = ""
    document.getElementById("editProfileCard").remove();
    divEmployeeProfile.innerHTML += generateProfileCard();
    localStorage.setItem('rendered', 'Profile');
    setSwitchToPasswordCard();
    setSwitchToEditProfileCard();
}

function updateProfile(){
    const employeeId = JSON.parse(localStorage.getItem('data')).employee.id;
    const profileFirstName = document.getElementById("profileFirstName");
    const profileLastName = document.getElementById("profileLastName");
    const profilePosition = document.getElementById("profilePosition");
    const profileEmail = document.getElementById("profileEmail");

    const bodyObj = { employee: {
            first_name: profileFirstName.value,
            last_name: profileLastName.value,
            position: profilePosition.value,
            email: profileEmail.value
        }
    };

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
            switchEditProfileToProfile();
            renderMessage("Profile successfully updated", msgColor="green");
        } else {
            console.log(data);
        }
    })
}