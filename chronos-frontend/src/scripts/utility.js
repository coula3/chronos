const buttonAdmin = document.createElement("button");
const buttonProfile = document.createElement("button");
const spanMsg = document.createElement("span");
let messageTimeout;

function appendImageOfWorkers(){
    const imageDiv = document.getElementById("workers-image-container");
    imageDiv.style.cssText = "width: 100%; height: 600px; background-size: 100% 100%; background-repeat: no-repeat; background-image: url('images/workers.png')";
}

function instantiateEmployeeObject(employeeObject){
    return new Employee(employeeObject.id, employeeObject.first_name, employeeObject.last_name, employeeObject.position, employeeObject.email, employeeObject.time_events);
}

function createEmployeeNameTag(employee){
        const firstName = `${employee.firstName[0].toUpperCase() + employee.firstName.slice(1)}`;
        const lastName = `${employee.lastName[0].toUpperCase() + employee.lastName.slice(1)}`;

        const employeeNameTag = `
            <h2 id="employee-name" employee-data-id = ${employee.id} style="color: #0000CD; padding-left:10px; margin:20px 0px 0px 0px; float:right; clear:both">${firstName} ${lastName}</h2>
            <h4 id="employee-position" style="padding-left:10px; margin:0px 0px 0px 0px; float:right; clear:both">${employee.position}</h4>
        `;

        return employeeNameTag;
}

function disableButtonSignIn(e){
    if(e.submitter.innerText === "Submit"){
        buttonSignIn.disabled = true;
    }
}

function disableButtonCreateUserSubmit(e){
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
    const firstName = `${employeeObject.firstName[0].toUpperCase() + employeeObject.firstName.slice(1)}`;
    const p = document.createElement("p");
    p.setAttribute("id", "p-new-user-msg");
    p.style.cssText = "text-align:center; color:#0000CD; font-size:18px; padding-top:10px; clear:both;";

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

function createDivMenu(){
    const divMenu = document.createElement("div");
    divMenu.setAttribute("id", "div-menu");
    divMenu.style.cssText = "float:right; margin:20px 0px 10px 0px; clear:both;";
    document.getElementById("div-employee-tag-name").after(divMenu);
    appendButtonClockInOut();
}

function appendButtonClockInOut() {
    editModeTimeEvent ? buttonClockInOut.innerText = "Clock Out" : buttonClockInOut.innerText = "Clock In";
    buttonClockInOut.setAttribute("id", "btn-clock-in-out");
    buttonClockInOut.classList.add("button");
    buttonClockInOut.style.cssText = "margin-left:15px; background-color: #0000CD; color: #FFF;";

    document.getElementById("div-menu").appendChild(buttonClockInOut);
    appendButtonProfile();
}

function appendButtonProfile(){
    buttonProfile.innerText = "Profile";
    buttonProfile.setAttribute("id", "btn-profile");
    buttonProfile.classList.add("button");
    document.getElementById("div-menu").insertBefore(buttonProfile, document.getElementById("btn-clock-in-out"));

    appendMsgSpan();
}

function appendButtonAdmin() {
    buttonAdmin.innerText = "Admin";
    buttonAdmin.setAttribute("id", "btn-admin");
    buttonAdmin.classList.add("button");

    document.getElementById("div-menu").insertBefore(buttonAdmin, document.getElementById("btn-clock-in-out"));
}

function appendMsgSpan(){
    spanMsg.setAttribute("id", "span-message");
    spanMsg.style.cssText = "display: block; height: 20px; margin-bottom: 10px; text-align: center; font-size: 16px; clear: both";
    document.getElementById("div-menu").after(spanMsg);
}

function createDivEventsContainer(){
    const divEventsContainer = document.createElement("div");
    divEventsContainer.setAttribute("id", "events-container");
    divEventsContainer.style.cssText = "clear: both";
    return divEventsContainer;
}