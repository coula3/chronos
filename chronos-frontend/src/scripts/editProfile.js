function getOldEmployeeData(){
    const employee = localStorage.getItem('data') && JSON.parse(localStorage.getItem('data')).employee;
    employee && delete employee.time_events;
    return employee;
}

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
}

function updateEmployeeTag(oldEmployeeData, newEmployeeData){
    const diffKeys = checkUpdateChanges(oldEmployeeData, newEmployeeData);

    if(diffKeys.includes("first_name") || diffKeys.includes("last_name")){
        document.getElementById("employee-name").innerText = `${capitalize(newEmployeeData.first_name)} ${capitalize(newEmployeeData.last_name)}`;
    }

    if(diffKeys.includes("position")){
        document.getElementById("employee-position").innerText = `${newEmployeeData.position}`;
    }
}

function checkUpdateChanges(oldEmployeeData, newEmployeeData){
    const diffKeys = [];

    if(oldEmployeeData.first_name !== newEmployeeData.first_name){
        diffKeys.push("first_name");
    }

    if (oldEmployeeData.last_name !== newEmployeeData.last_name){
        diffKeys.push("last_name");
    }

    if (oldEmployeeData.position !== newEmployeeData.position){
        diffKeys.push("position");
    }

    return diffKeys;
}