const buttonAdmin = document.createElement("button");
const buttonProfile = document.createElement("button");
const spanMsg = document.createElement("span");
let messageTimeout;

function appendImageOfWorkers(){
    const imageDiv = document.getElementById("workers-image-container");
    imageDiv.style.cssText += "background: url('images/workers.png') no-repeat bottom center/cover;";
}

function instantiateEmployeeObject(employeeObject){
    return new Employee(employeeObject.id, employeeObject.first_name, employeeObject.last_name, employeeObject.position, employeeObject.email, employeeObject.time_events);
}

function createEmployeeNameTag(employee){
        const firstName = `${capitalize(employee.firstName)}`;
        const lastName = `${capitalize(employee.lastName)}`;

        const employeeNameTag = `
            <h2 id="employee-name" employee-data-id = ${employee.id}>${firstName} ${lastName}</h2>
            <h4 id="employee-position">${employee.position}</h4>
        `;

        return employeeNameTag;
}

function disableSignInButton(e){
    if(e.submitter.innerText === "Submit"){
        buttonSignIn.disabled = true;
    }
}

function disableCreateUserSubmitButton(e){
    if(e.target.innerText === "Sign In" && buttonCreateUser.innerText === "Submit"){
        buttonCreateUser.disabled = true;
    }
}

function renderMessage(message, msgColor) {
    clearTimeout(messageTimeout);

    spanMsg.innerText = "";
    spanMsg.innerText = message;

    addColorToMessage(spanMsg, msgColor);

    messageTimeout = setTimeout(() => {
        if(document.getElementById("span-message").innerText){
            document.getElementById("span-message").innerText = ""
        }
    }, 6000)
}

function addColorToMessage(spanMsg, msgColor){
    if(msgColor){
        spanMsg.style.cssText += `color: ${msgColor}`;
    } else {
        spanMsg.style.color = "";
    }
}

function renderWelcomeMsg(employeeObject){
    const firstName = capitalize(employeeObject.firstName);
    const p = document.createElement("p");

    p.setAttribute("id", "p-new-user-msg");

    if(employeeObject.timeEvents && employeeObject.timeEvents.some(event => event.time_out)){
        if(!document.getElementById("div-time-event")){
            p.innerText = `${greeting()} ${firstName}!`;
            document.getElementById("div-employee-tag-name").after(p);
        }
    }

    if(!employeeObject.timeEvents || employeeObject.timeEvents.length === 0) {
        p.innerText = `Hi ${firstName}, let's get clocking...!`;
        document.getElementById("div-employee-tag-name").after(p);
    }

    if(document.getElementById("div-time-events") && document.getElementById("div-time-events").innerText === "")
        { document.getElementById("div-time-events").style.backgroundColor = "#F5F5F5"; };
}

function createMenuDiv(){
    const divMenu = document.createElement("div");

    divMenu.setAttribute("id", "div-menu");
    divMenu.style.cssText = "float:right; margin:20px 0px 10px 0px; clear:both;";
    document.getElementById("div-employee-tag-name").after(divMenu);

    appendClockInOutButton();
}

function appendClockInOutButton() {
    isTimeEventOnEditMode ? buttonClockInOut.innerText = "Clock Out" : buttonClockInOut.innerText = "Clock In";
    buttonClockInOut.setAttribute("id", "btn-clock-in-out");
    buttonClockInOut.classList.add("button");
    buttonClockInOut.style.cssText = "margin-left:15px; background-color: #0000CD; color: #FFF;";
    document.getElementById("div-menu").appendChild(buttonClockInOut);

    appendProfileButton();
}

function appendProfileButton(){
    buttonProfile.innerText = "Profile";
    buttonProfile.setAttribute("id", "btn-profile");
    buttonProfile.classList.add("button");
    document.getElementById("div-menu").insertBefore(buttonProfile, document.getElementById("btn-clock-in-out"));

    appendMsgSpan();
}

function appendAdminButton() {
    buttonAdmin.innerText = "Admin";
    buttonAdmin.setAttribute("id", "btn-admin");
    buttonAdmin.classList.add("button");
    document.getElementById("div-menu").insertBefore(buttonAdmin, document.getElementById("btn-clock-in-out"));
}

function appendMsgSpan(){
    spanMsg.setAttribute("id", "span-message");
    spanMsg.style.cssText = "display: block; height: 20px; margin-bottom: 10px; text-align: center; font-size: 1rem; clear: both;";
    document.getElementById("div-menu").after(spanMsg);
}

function createEventsContainerDiv(){
    const eventsContainerDiv = document.createElement("div");

    eventsContainerDiv.setAttribute("id", "events-container");
    eventsContainerDiv.style.cssText = "clear: both;";

    return eventsContainerDiv;
}

function capitalize(string){
    const stringToArray = string.split("-");
    const toUpdateString = stringToArray.some(string => string[0] === string[0].toLowerCase());

    if(toUpdateString){
        const newArray = stringToArray.map(str => str[0].toUpperCase() + str.slice(1));

        return newArray.length === 1 ? newArray[0] : newArray.join("-");
    } else {
        return string;
    }
}