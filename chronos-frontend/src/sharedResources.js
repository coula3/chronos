const buttonAdmin = document.createElement("button");
const buttonEditProfile = document.createElement("button");

function appendEmployeeFormElements(){
    const formElements = `
        <div id="div-input-elements" style="display:inline-block">
            <input id="first-name" class="input" type="text" name="first-name" placeholder="first name" />
            <input id="last-name" class="input" type="text" name="last-name" placeholder="last name" />
            <select type="select" id="position" name="position">
                <option value="">--choose your position--</option>
                <option value="Customer Associate">Customer Associate</option>
                <option value="Fresh Food Associate">Fresh Food Associate</option>
                <option value="Manager">Manager</option>
                <option value="Sales Associate">Sales Associate</option>
                <option value="Stocker Associate">Stocker</option>
            </select>
            <input id="email" class="input" type="text" name="email" placeholder="email" />
            <input id="password" class="input" type="password" name="password" placeholder="password" />
            <input id="password-confirmation" class="input" type="password" name="password-confirmation" placeholder="password confirmation" />
        </div>
    `
    buttonCreateUser.insertAdjacentHTML('beforebegin', formElements);
}

function disableButtonSignIn(e){
    if(e.submitter.innerText == "Submit"){
        buttonSignIn.disabled = true;
    }
}

function disableButtonCreateUserSubmit(e){
    if(e.target.innerText == "Sign In" && buttonCreateUser.innerText == "Submit"){
        buttonCreateUser.disabled = true;
    }
}

function displayMessages(message) {
    if(!document.getElementById("messages")) {
    const span = document.createElement("span");
    span.innerText = message;

    appendMessagesSpan(span);
    }
}

function appendMessagesSpan(span) {
    document.getElementById("main-container").appendChild(span);
    span.style.cssText = "background-color:#f2ecdc; font-size:14px; margin-top:20px; padding: 5px 10px 5px 10px; box-shadow:10px 10px grey; float:right; clear:both;";
    span.setAttribute("id", "messages");

    setTimeout(() => {
        if(document.getElementById("messages")){
            document.getElementById("messages").remove();
            buttonSignIn.disabled = false;
            buttonCreateUser.disabled = false;
        }
    }, 5000)
}

function removeMessagesSpan(){
    if(document.getElementById("messages")){
        document.getElementById("messages").remove();
    }
}

function renderWelcomeMsg(employeeObject){
    const firstName = `${employeeObject.firstName[0].toUpperCase() + employeeObject.firstName.slice(1)}`
    const p = document.createElement("p");

    if(employeeObject.timeEvents && employeeObject.timeEvents.length > 0){
        if(!document.getElementById("div-time-event")){
            p.innerText = `${greeting()} ${firstName}!`;
            document.getElementById("div-employee-tag-name").after(p);
        }
    } else {
        p.innerText = `Hi ${firstName}, welcome and let's get clocking...!`;
        document.getElementById("div-employee-tag-name").after(p);
    }
    p.setAttribute("id", "p-new-user-msg");
    p.style.cssText = "text-align:center; color:blue; font-size:20px; padding-top:20px; clear:both;";

    if(document.getElementById("div-time-events") && document.getElementById("div-time-events").innerText == "")
        { document.getElementById("div-time-events").style.backgroundColor = "#e6ffff"; }
}

function greeting(){
    const time = parseInt(Date().slice(16,24).slice(0,2), 10)
    if(time > 6 && time < 12 ){
        return "Good morning"
    }
    if(time >= 12 && time <= 17) {
        return "Good afternoon"
    }
    return "Good evening"

}

function getDate(date) {
    return date.slice(0, 10);
}

function getTime(time) {
    return time ? time.slice(11, 19) : "";
}

function getShift(timeIn){
    if((parseInt(timeIn.slice(0,2)) >= 5) && (parseInt(timeIn.slice(0,2)) < 12)){
        return "A"
    }

    if((parseInt(timeIn.slice(0,2)) >= 12) && (parseInt(timeIn.slice(0,2)) < 18)) {
        return "B"
    }

    if((parseInt(timeIn.slice(0,2)) >= 18) && (parseInt(timeIn.slice(0,2)) <= 21)) {
        return "C"
    }
}

function createDivMenu(){
    const divMenu = document.createElement("div");
    divMenu.setAttribute("id", "div-menu");
    divMenu.style.cssText = "float:right; margin:30px 0px 30px 0px; clear:both;";
    document.getElementById("div-employee-tag-name").after(divMenu);
    appendButtonClockInOut();
}

function appendButtonClockInOut() {
    buttonClockInOut.innerText = "Clock In";
    buttonClockInOut.setAttribute("id", "btn-clock-in-out");
    buttonClockInOut.style.cssText = "width:100px; margin-left:15px;";
    document.getElementById("div-menu").appendChild(buttonClockInOut);
    appendButtonEditProfile();
}

function appendButtonEditProfile(){
    buttonEditProfile.innerText = "Edit Profile";
    buttonEditProfile.setAttribute = ("id", "btn-edit-profile");
    buttonEditProfile.style.width = "125px";
    document.getElementById("div-menu").insertBefore(buttonEditProfile, document.getElementById("btn-clock-in-out"));
}

function appendButtonAdmin(employee) {
    buttonAdmin.innerText = "Manage Accounts";
    buttonAdmin.setAttribute("id", "btn-admin");
    buttonAdmin.style.width = "125px";

    if(employee.position == "Manager"){
        document.getElementById("div-menu").insertBefore(buttonAdmin, document.getElementById("btn-clock-in-out"));
    }
}

function calculateTimeDiff(startTime, finishTime) {
    const startTimeObj = new Date(startTime);
    const finishTimeObj = new Date(finishTime);
    return (finishTimeObj - startTimeObj);
}

function getHours(startTime, finishTime) {
    const secondsDiff = calculateTimeDiff(startTime, finishTime) / 1000

    const hours = (Math.floor(secondsDiff / 3600) % 24) < 10 ? `0${(Math.floor(secondsDiff / 3600) % 24)}` : (Math.floor(secondsDiff / 3600) % 24)
    const minutes = (Math.floor(secondsDiff / 60) % 60) < 10 ? `0${Math.floor(secondsDiff / 60) % 60}` : Math.floor(secondsDiff / 60) % 60
    const seconds = secondsDiff % 60 < 10 ? `0${secondsDiff % 60}` : secondsDiff % 60

    return `${hours}:${minutes}:${seconds}`
}

function getRunningTime(milleseconds){
    const hours = (Math.round(milleseconds / 3600) % 24) < 10 ? `0${Math.round(milleseconds / 3600) % 24}` : Math.round(milleseconds / 3600) % 24
    const minutes = (Math.round(milleseconds / 60) % 60) < 10 ? `0${Math.round(milleseconds / 60) % 60}` : Math.round(milleseconds / 60) % 60
    const secs =  milleseconds % 60 < 10 ? `0${milleseconds % 60 }` : milleseconds % 60
    return `${hours}:${minutes}:${secs}`
}