const divEmployeeProfile = document.createElement("div");
divEmployeeProfile.setAttribute("id", "profile-container");
divEmployeeProfile.style.cssText = "clear: both";

buttonProfile.addEventListener("click", (e) => {
    if(e.target.innerText === "Profile"){
        clearInterval(runningTimeInterval);
        localStorage.setItem("rendered", "Profile");
        buttonClockInOut.disabled = true;
        buttonClockInOut.style.cssText = "background-color: null, color: #000"

        document.getElementById("p-new-user-msg") && document.getElementById("p-new-user-msg").remove();
        document.getElementById("events-container") && document.getElementById("events-container").remove();
        e.target.innerText = "Time Data";
        document.getElementById("span-message").innerText = "";
        document.getElementById("span-message").after(divEmployeeProfile);

        divEmployeeProfile.innerHTML += `
            <div id="profile-card">
                <h2 id="profileHeader">Profile</h2>
                <p class="profileCaption">Name</p>
                <p class="profileParagraph">Ken Fry</p>

                <p class="profileCaption">Position</p>
                <p class="profileParagraph">Customer Associate</p>

                <p class="profileCaption">Email</p>
                <p class="profileParagraph">k@fry.com</p>
                <div id="profileButtonsDiv">
                    <button class="profileButtons">Edit</button>
                    <button class="profileButtons">Change Password</button>
                </div>
            </div>
        `;

    } else {
        divEmployeeProfile.remove();
        e.target.innerText = "Profile";
        localStorage.setItem("rendered", "Time Data");
        location.reload();
    }
})
