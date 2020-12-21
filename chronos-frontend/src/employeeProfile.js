const divEmployeeProfile = document.createElement("div");
divEmployeeProfile.setAttribute("id", "div-emp-profile");
divEmployeeProfile.style.cssText = "clear: both";

buttonProfile.addEventListener("click", () => {
    clearInterval(runningTimeInterval);
    
    document.getElementById("events-container") && document.getElementById("events-container").remove();
    buttonProfile.innerText = "Time Records";
    document.getElementById("div-menu").after(divEmployeeProfile);
    divEmployeeProfile.innerHTML += `
            <div id="profile-card" style="padding-top: 15px">
                <p class="profile-p profile-caption">Name</p>
                <p class="profile-p">Ken Fry</p>

                <p class="profile-p profile-caption">Position</p>
                <p class="profile-p">Customer Associate</p>

                <p class="profile-p profile-caption">eMail</p>
                <p class="profile-p">k@fry.com</p>
                <div style="padding: 15px; background-color: #f2ecdc;">
                    <button style="padding: 2px 5px; width: 80px">Edit</button>
                </div>
            </div>
        `;
})
