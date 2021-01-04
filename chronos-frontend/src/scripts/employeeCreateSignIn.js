class Employee {
    constructor(id, firstName, lastName, position, email, timeEvents) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.position = position;
        this.email = email;
        this.timeEvents = timeEvents;
    }

    renderEmployeeData() {
        const employeeNameTag = createEmployeeNameTag(this);

        createDivNameTag(employeeNameTag);

        createDivMenu();

        if(this.position === "Manager"){
            appendButtonAdmin();
        }

        if(this.timeEvents){
            renderEmployeeTimeEvents(this);
        } else {
            renderWelcomeMsg(this);
        }
    }
}

function stageCreateEmployeeForm(){
    addEmployeeForm && addEmployeeForm.addEventListener("submit", (e)=>{
        e.preventDefault();

        if(buttonCreateUser.innerText === "Submit"){
            createEmployee(e);
        }

        if(!document.querySelector("#div-input-elements")){
            buttonCreateUser.innerText = "Submit";
            document.getElementById("spanSignInMsg") && document.getElementById("spanSignInMsg").remove();
            buttonSignIn.style.removeProperty("color");
            buttonSignIn.style.removeProperty("background-color");
            buttonSignIn.disabled = true;
            document.getElementById("sign-in-email").value = null;
            document.getElementById("sign-in-password").value = null;

            if(document.getElementById("messages")){
                buttonCreateUser.disabled = true;
            }
            appendEmployeeFormElements();
        }
    });
}

function createEmployee(e) {
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const position = document.getElementById("position").value
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const passwordConfirmation = document.getElementById("password-confirmation").value;

    if(password !== passwordConfirmation) {
        cleanUpSignUpErrors();
        renderSignUpErrors(["Passwords do not match"]);
    } else {
        const bodyObject = {employee: {first_name: firstName, last_name: lastName, position: position, email: email, password: password}}
        const configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(bodyObject)
        };

        fetch(`${CHRONOS_URL}/employees`, configObj)
        .then(response => response.json())
        .then(data => {
            if(data.employee){
                const newEmployee = instantiateEmployeeObject(data.employee);

                newEmployee.renderEmployeeData();
                persistToLocalStorageOnCreateEmployee(data);
                removeDOMElementsOnSignIn();
            } else {
                cleanUpSignUpErrors();
                renderSignUpErrors(data.messages)
                disableButtonSignIn(e)
            }
        })
        .catch(error => console.log(error))
    }
}

function stageSignInButton(){
    buttonSignIn && buttonSignIn.addEventListener("click", (e) => {
        e.preventDefault();
        signInEmployee(e);
    });

    document.getElementById('sign-in-email') && document.getElementById('sign-in-email').addEventListener('focus', () => collapseSignUpElements());
}

function collapseSignUpElements(){
    const signInEmailInput = document.getElementById("sign-in-email");

    if(signInEmailInput) {
        signInEmailInput.addEventListener("click", () => {
            document.getElementById("div-input-elements") && document.getElementById("div-input-elements").remove();
            document.getElementById("btn-create-user").innerText = "Sign Up";
            document.getElementById("btn-sign-in").disabled = false;
            document.getElementById("btn-sign-in").style.cssText += "background-color: #9932CC; color: #FFF";
        });
    }
}

function signInEmployee(e) {
    const signInEmail = document.getElementById("sign-in-email") ? document.getElementById("sign-in-email").value : null;
    const signInPassword = document.getElementById("sign-in-password") ? document.getElementById("sign-in-password").value : null;
    const bodyObject = {employee: {email: signInEmail, password: signInPassword}};
    const configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
        },
        body: JSON.stringify(bodyObject)
    };
    
    if(e.target.innerText === "Sign In") {
        if(signInEmail) {
            fetch(`${CHRONOS_URL}/signin`, configObj)
            .then(response => response.json())
            .then(data => {
                if(data.employee) {
                    const currentEmployee = instantiateEmployeeObject(data.employee);

                    currentEmployee.renderEmployeeData();
                    persistToLocalStorageOnSignIn(data);
                    removeDOMElementsOnSignIn();

                    if(document.getElementById("div-time-event")){
                        localStorage.setItem('runningTimeStarted', true);
                        addRunningTime(JSON.parse(localStorage.getItem('newTimeEvent')));
                    }

                    if(document.getElementById("td-event-break-end") && document.getElementById("td-event-break-end").innerText) {
                        buttonBreakResume.disabled = true;
                        buttonBreakResume.innerText = "Take Break";
                        buttonClockInOut.innerText = "Clock Out";
                        buttonClockInOut.style.cssText += "background-color: #9932CC; color: #FFF";
                    } else if(document.getElementById("btn-break-resume")) {
                        buttonClockInOut.innerText = "Clock Out";
                        buttonClockInOut.style.cssText += "background-color: #9932CC; color: #FFF";
                    }
                } else {
                    document.getElementById("spanSignInMsg") && document.getElementById("spanSignInMsg").remove();
                    renderSignInErrors(data.message);
                    disableButtonCreateUserSubmit(e);
                }
            })
        } else {
            document.getElementById("spanSignInMsg") && document.getElementById("spanSignInMsg").remove();
            const message = "Please provide a valid email and password";
            renderSignInErrors(message);
            disableButtonCreateUserSubmit(e);
        }
    } else {
        clearInterval(runningTimeInterval);
        localStorage.clear();

        resetDOMOnSignOut();

        buttonSignIn = document.getElementById("btn-sign-in");
        buttonCreateUser = document.getElementById("btn-create-user");
        addEmployeeForm = document.getElementById("form-create-employee");

        stageSignUpSignIn();
    }
}

function resetDOMOnSignOut(){
    buttonClockInOut.disabled = false;
    document.getElementById("span-message").innerText = "";
    clearTimeout(messageTimeout);

    document.getElementById("main-container").innerHTML = "";
    document.getElementById("main-container").innerHTML += signInForm;
}

function persistToLocalStorageOnCreateEmployee(data){
    localStorage.setItem('jwt_token', data.jwt);
    localStorage.setItem('data', JSON.stringify(data));
}

function persistToLocalStorageOnSignIn(data){
    const newTimeEvent = data.employee.time_events.find(event => !event.time_out);
    localStorage.setItem('jwt_token', data.jwt);
    localStorage.setItem('data', JSON.stringify(data));

    if(newTimeEvent){
        localStorage.setItem('newTimeEvent', JSON.stringify(newTimeEvent));
        localStorage.setItem('editModeTimeEvent', true);
    }

    const timeEventInLocalStorage = JSON.parse(localStorage.getItem('newTimeEvent'));
    const onBreak = timeEventInLocalStorage && timeEventInLocalStorage.break_start && !timeEventInLocalStorage.break_end;
    onBreak && localStorage.setItem('onBreak', true);
    data.employee.time_events[0] ? localStorage.setItem("rendered", "Time Data") : localStorage.setItem("rendered", "New User");
}

function reSignInEmployee(data){
    const currentEmployee = instantiateEmployeeObject(data.employee);

    addSignOutBtnOnReSignInEmployee();
    currentEmployee.renderEmployeeData();
}

function removeDOMElementsOnSignIn(){
    document.getElementById("div-signup").remove();
    document.getElementById("div-signin-inputs").remove();
    buttonSignIn.disabled = false;
    buttonSignIn.innerText = "Sign Out";
    buttonSignIn.style.cssText = "width: 100px; background-color: #9932CC; color: #FFF";
    document.getElementById("div-signin").style.cssText = "padding: 0px 0px 0px 15px; border: none; float: right;";
}

function addSignOutBtnOnReSignInEmployee(){
    divSignUpSignIn = document.createElement("div");
    divSignUpSignIn.setAttribute("id",  "div-signup-signin");
    document.getElementById("main-container").insertBefore(divSignUpSignIn, document.getElementById("div-employee-tag-name"));
    divSignUpSignIn.innerHTML += divSignIn;
    const buttonSignIn = document.getElementById("btn-sign-in");

    buttonSignIn.disabled = false;
    buttonSignIn.innerText = "Sign Out";
    buttonSignIn.style.cssText = "width: 100px; background-color: #9932CC; color: #FFF";

    document.getElementById("div-signin").style.cssText = "padding: 0px 0px 0px 15px; border: none; float: right;";

    buttonSignIn.addEventListener("click", (e) => {
        e.preventDefault();
        signInEmployee(e);
    });
}

function createDivNameTag(employeeNameTag){
    divEmployeeNameTag = document.createElement("div");
    divEmployeeNameTag.setAttribute("id", "div-employee-tag-name");
    appendEmployeeNameTag(divEmployeeNameTag, employeeNameTag);
}

function appendEmployeeNameTag(divEmployeeNameTag, employeeNameTag){
    document.getElementById("main-container").appendChild(divEmployeeNameTag);
    document.getElementById("div-employee-tag-name").innerHTML += employeeNameTag;
}