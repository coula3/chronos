const buttonAdmin = document.createElement("button");
const buttonProfile = document.createElement("button");

function appendButtonProfile(){
    buttonProfile.innerText = "Profile";
    buttonProfile.setAttribute = ("id", "btn-profile");
    buttonProfile.classList.add("button");
    document.getElementById("div-menu").insertBefore(buttonProfile, document.getElementById("btn-clock-in-out"));
}

function appendButtonAdmin(employee) {
    buttonAdmin.innerText = "Admin";
    buttonAdmin.setAttribute("id", "btn-admin");
    buttonAdmin.classList.add("button");

    if(employee.position === "Manager"){
        document.getElementById("div-menu").insertBefore(buttonAdmin, document.getElementById("btn-clock-in-out"));
    }
}