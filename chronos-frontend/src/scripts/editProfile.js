function getOldEmployeeData(){
    const employee = localStorage.getItem('data') && JSON.parse(localStorage.getItem('data')).employee;
    employee && delete employee.time_events;
    return employee;
}

function generateEditProfileCard(){
    const localStorageData = JSON.parse(localStorage.getItem('data'));
    const indexOfManager = employeePositions.indexOf("Manager");
    let listOfEmployeePositions = [...employeePositions];

    localStorageData.employee.position !== "Manager" && listOfEmployeePositions.splice(indexOfManager, 1);

    const positionOptions = listOfEmployeePositions.map(position => {
        const selected = localStorageData.employee.position === position ? "selected" : null;
        return `<option value="${position}" ${selected}>${position}</option>`;
    });

    const editProfileCard = `
        <div id="editProfileCard">
        <h2 class="profileHeader">Edit Profile</h2>
        <form id="editProfileForm">
            <p class="profileCaption">First name</p>
            <input id="profileFirstName" class="editProfileInputs" type="text" value=${capitalize(localStorageData.employee.first_name)}></input>

            <p class="profileCaption">Last name</p>
            <input id="profileLastName" class="editProfileInputs" type="text" value=${capitalize(localStorageData.employee.last_name)}></input>

            <p class="profileCaption">Position</p>
                <select type="select" id="profilePosition" class="editProfileInputs" name="position">
                    ${positionOptions}
                </select>

            <p class="profileCaption">Email</p>
            <input id="profileEmail" class="editProfileInputs" type="text" value=${localStorageData.employee.email}></input>

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

    const toProceedWithUpate = checkChangesBeforeFetchRequest(profileFirstName, profileLastName, profilePosition, profileEmail);

    const bodyObj = { employee: {
            first_name: profileFirstName.value,
            last_name: profileLastName.value,
            position: profilePosition.value,
            email: profileEmail.value
        }
    };

    if(toProceedWithUpate){
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
                const oldEmployeeData = getOldEmployeeData();
                localStorage.setItem('data', JSON.stringify(data));
                updateEmployeeTag(oldEmployeeData, data.employee);
                switchEditProfileToProfile();
                renderMessage("Profile successfully updated", msgColor="green");
            } else {
                document.getElementById("span-message").innerText = "";
                cleanUpEditProfileErrors();
                renderEditProfileErrors(data.messages);
            }
        })
    } else {
        switchEditProfileToProfile();
        renderMessage("No change to profile", msgColor="green");
    }
}

function checkChangesBeforeFetchRequest(profileFirstName, profileLastName, profilePosition, profileEmail){
    const oldEmployeeData = getOldEmployeeData();
    return profileFirstName.value !== oldEmployeeData.first_name || profileLastName.value !== oldEmployeeData.last_name || profilePosition.value !== oldEmployeeData.position || profileEmail.value !== oldEmployeeData.email;
}

function updateEmployeeTag(oldEmployeeData, newEmployeeData){
    const changedAttributes = checkChangedAttributes(oldEmployeeData, newEmployeeData);

    if(changedAttributes.includes("first_name") || changedAttributes.includes("last_name")){
        document.getElementById("employee-name").innerText = `${capitalize(newEmployeeData.first_name)} ${capitalize(newEmployeeData.last_name)}`;
    }

    if(changedAttributes.includes("position")){
        document.getElementById("employee-position").innerText = `${newEmployeeData.position}`;
    }
}

function checkChangedAttributes(oldEmployeeData, newEmployeeData){
    const changedAttributes = [];

    if(oldEmployeeData.first_name !== newEmployeeData.first_name){
        changedAttributes.push("first_name");
    }

    if (oldEmployeeData.last_name !== newEmployeeData.last_name){
        changedAttributes.push("last_name");
    }

    if (oldEmployeeData.position !== newEmployeeData.position){
        changedAttributes.push("position");
    }

    return changedAttributes;
}