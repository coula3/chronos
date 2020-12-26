const buttonAdmin = document.createElement("button");
const buttonProfile = document.createElement("button");
const spanMsg = document.createElement("span");

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

function instantiateEmployeeObject(employeeObject){
    return new Employee(employeeObject.id, employeeObject.first_name, employeeObject.last_name, employeeObject.position, employeeObject.email, employeeObject.time_events);
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

function displaySignInMessage(message) {
    spanMsg.innerText = message;
    spanMsg.style.cssText = "display: block; font-size: 14px; color: red; text-align: center;";
    document.getElementById("form-signin").insertBefore(spanMsg, document.getElementById("btn-sign-in"));
}

function displaySignUpMessages(messages) {
    let firstNameMsg, lastNameMsg, passwordMsg;
    const spanStyles = "display: block; margin-bottom: 5px; font-size: 14px; color: red; text-align: center;";

    messages.forEach(message => {
        if(message.includes("Password")){
            passwordMsg = message;
            displayPasswordMsg(passwordMsg, spanStyles);
        } else if(message.includes("First")){
            firstNameMsg = message;
            displayFirstNameMsg(firstNameMsg, spanStyles);
        } else if(message.includes("Last")){
            lastNameMsg = message;
            displayLastNameMsg(lastNameMsg, spanStyles);
        } else if(message.includes("Position")){
            positionMsg = message;
            displayPositionMsg(positionMsg, spanStyles);
        } else if(message.includes("Email")){
            emailMsg = message;
            displayEmailMsg(emailMsg, spanStyles);
        }
    });
}

function displayFirstNameMsg(firstNameMsg, spanStyles){
    spanFirstName = document.createElement("span");
    spanFirstName.innerText = firstNameMsg;
    spanFirstName.setAttribute("id", "span-first-name");
    spanFirstName.style.cssText = spanStyles;
    document.getElementById("first-name").style.cssText = "margin-bottom: 0px";
    !document.getElementById("span-first-name") && document.getElementById("div-input-elements").insertBefore(spanFirstName, document.getElementById("last-name"));
}

function displayLastNameMsg(lastNameMsg, spanStyles){
    spanLastName = document.createElement("span");
    spanLastName.innerText = lastNameMsg;
    spanLastName.setAttribute("id", "span-last-name");
    spanLastName.style.cssText = spanStyles;
    document.getElementById("last-name").style.cssText = "margin-bottom: 0px";
    !document.getElementById("span-last-name") && document.getElementById("div-input-elements").insertBefore(spanLastName, document.getElementById("position"));
}

function displayPositionMsg(positionMsg, spanStyles){
    spanPosition = document.createElement("span");
    spanPosition.innerText = positionMsg;
    spanPosition.setAttribute("id", "span-position");
    spanPosition.style.cssText = spanStyles;
    document.getElementById("position").style.cssText = "margin-bottom: 0px";
    !document.getElementById("span-position") && document.getElementById("div-input-elements").insertBefore(spanPosition, document.getElementById("email"));
}

function displayEmailMsg(emailMsg, spanStyles){
    spanEmail = document.createElement("span");
    spanEmail.innerText = emailMsg;
    spanEmail.setAttribute("id", "span-email");
    spanEmail.style.cssText = spanStyles;
    document.getElementById("email").style.cssText = "margin-bottom: 0px";
    !document.getElementById("span-email") && document.getElementById("div-input-elements").insertBefore(spanEmail, document.getElementById("password"));
}

function displayPasswordMsg(passwordMsg, spanStyles){
    spanPassword = document.createElement("span");
    spanPassword.innerText = passwordMsg;
    spanPassword.setAttribute("id", "span-password");
    spanPassword.style.cssText = spanStyles;
    spanPassword.style.marginBottom = "10px";
    document.getElementById("password-confirmation").style.cssText = "margin-bottom: 0px";
    !document.getElementById("span-password") && document.getElementById("form-create-employee").insertBefore(spanPassword, document.getElementById("btn-create-user"));
}

function displayMessages(message) {
    spanMsg.innerText = message;

    setTimeout(() => {
        if(document.getElementById("span-message").innerText){
            document.getElementById("span-message").innerText = ""
        }
    }, 6000)
}

function renderWelcomeMsg(employeeObject){
    const firstName = `${employeeObject.firstName[0].toUpperCase() + employeeObject.firstName.slice(1)}`;
    const p = document.createElement("p");
    p.setAttribute("id", "p-new-user-msg");
    p.style.cssText = "text-align:center; color:blue; font-size:20px; padding-top:10px; clear:both;";

    if(employeeObject.timeEvents.length > 0 && employeeObject.timeEvents.some(event => event.time_out)){
        if(!document.getElementById("div-time-event")){
            p.innerText = `${greeting()} ${firstName}!`;
            document.getElementById("div-employee-tag-name").after(p);
        }
    }

    if(employeeObject.timeEvents.length === 0) {
        p.innerText = `Hi ${firstName}, let's get clocking...!`;
        document.getElementById("div-employee-tag-name").after(p);
    }

    if(document.getElementById("div-time-events") && document.getElementById("div-time-events").innerText === "")
        { document.getElementById("div-time-events").style.backgroundColor = "#e6ffff"; };
}

function createDivMenu(){
    const divMenu = document.createElement("div");
    divMenu.setAttribute("id", "div-menu");
    divMenu.style.cssText = "float:right; margin:20px 0px 10px 0px; clear:both;";
    document.getElementById("div-employee-tag-name").after(divMenu);
    appendButtonClockInOut();
}

function appendButtonClockInOut() {
    buttonClockInOut.innerText = "Clock In";
    buttonClockInOut.setAttribute("id", "btn-clock-in-out");
    buttonClockInOut.classList.add("button");
    buttonClockInOut.style.cssText = "margin-left:15px; background-color: #0000ff; color: #FFF;";

    document.getElementById("div-menu").appendChild(buttonClockInOut);
    appendButtonProfile();
}

function appendButtonProfile(){
    buttonProfile.innerText = "Profile";
    buttonProfile.setAttribute = ("id", "btn-profile");
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