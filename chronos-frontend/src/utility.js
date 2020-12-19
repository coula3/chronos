const buttonAdmin = document.createElement("button");
const buttonProfile = document.createElement("button");

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
    const firstName = `${employeeObject.firstName[0].toUpperCase() + employeeObject.firstName.slice(1)}`;
    const p = document.createElement("p");
    p.setAttribute("id", "p-new-user-msg");
    p.style.cssText = "text-align:center; color:blue; font-size:20px; padding-top:20px; clear:both;";

    if(employeeObject.timeEvents && employeeObject.timeEvents.length > 0){
        if(!document.getElementById("div-time-event")){
            p.innerText = `${greeting()} ${firstName}!`;
            document.getElementById("div-employee-tag-name").after(p);
        }
    } else {
        p.innerText = `Hi ${firstName}, welcome and let's get clocking...!`;
        document.getElementById("div-employee-tag-name").after(p);
    }

    if(document.getElementById("div-time-events") && document.getElementById("div-time-events").innerText == "")
        { document.getElementById("div-time-events").style.backgroundColor = "#e6ffff"; };
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
}

function appendButtonAdmin(employee) {
    buttonAdmin.innerText = "Admin";
    buttonAdmin.setAttribute("id", "btn-admin");
    buttonAdmin.classList.add("button");

    if(employee.position == "Manager"){
        document.getElementById("div-menu").insertBefore(buttonAdmin, document.getElementById("btn-clock-in-out"));
    }
}