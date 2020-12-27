const divEmployeeProfile = document.createElement("div");
divEmployeeProfile.setAttribute("id", "profile-container");
divEmployeeProfile.style.cssText = "clear: both";

buttonProfile.addEventListener("click", (e) => {
    if(e.target.innerText === "Profile"){
        clearInterval(runningTimeInterval);
        localStorage.setItem("rendered", "Profile");
        buttonClockInOut.disabled = true;
        buttonClockInOut.style.cssText = "background-color: null, color: #000"

        document.getElementById("events-container") && document.getElementById("events-container").remove();
        e.target.innerText = "Time Data";
        document.getElementById("span-message").innerText = "";
        document.getElementById("span-message").after(divEmployeeProfile);

        divEmployeeProfile.innerHTML += `
            <div id="profile-card" style="padding-top: 15px;">
                <p class="profile-p profile-caption">Name</p>
                <p class="profile-p">Ken Fry</p>

                <p class="profile-p profile-caption">Position</p>
                <p class="profile-p">Customer Associate</p>

                <p class="profile-p profile-caption">eMail</p>
                <p class="profile-p">k@fry.com</p>
                <div style="padding: 15px; background-color: #e6ccb3;">
                    <button style="padding: 3px 5px; width: 200px; font-size: 17px">Edit</button>
                    <button style="padding: 3px 5px; width: 200px; font-size: 17px">Change Password</button>
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
