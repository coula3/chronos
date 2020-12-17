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
        const firstName = `${this.firstName[0].toUpperCase() + this.firstName.slice(1)}`
        const lastName = `${this.lastName[0].toUpperCase() + this.lastName.slice(1)}`
        const employeeNameTag = `
            <h2 id="employee-name" employee-data-id = ${this.id} style="color:blue; padding-left:10px; margin:0px 0px 0px 0px; float:right; clear:both">${firstName} ${lastName}</h2>
            <h4 id="employee-position" style="padding-left:10px; margin:0px 0px 0px 0px; float:right; clear:both">${this.position}</h4>
        `;

        createDivNameTag(employeeNameTag);

        createDivMenu();

        if(this.position == "Manager"){
            appendButtonAdmin(this);
        }

        if(this.timeEvents[0]){
            renderEmployeeTimeEvents(this);
        } else {
            renderWelcomeMsg(this);
        }
    }
}

const buttonCreateUser = document.getElementById("btn-create-user");

const addEmployeeForm = document.getElementById("form-create-employee");

addEmployeeForm.addEventListener("submit", (e)=>{
    e.preventDefault();

    if(buttonCreateUser.innerText == "Submit"){
        createEmployee(e);
    }

    if(!document.querySelector("#div-input-elements")){
        buttonCreateUser.innerText = "Submit"

        if(document.getElementById("messages")){
            buttonCreateUser.disabled = true;
        }
        appendEmployeeFormElements();
    }
})

function createEmployee(e) {
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const position = document.getElementById("position").value
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const passwordConfirmation = document.getElementById("password-confirmation").value

    if(password !== passwordConfirmation) {
        displayMessages("Please provide matching passwords")
    } else {
        const bodyObject = {employee: {first_name: firstName, last_name: lastName, position: position, email: email, password: password}}
        const configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(bodyObject)
        }

        fetch(`${CHRONOS_URL}/employees`, configObj)
        .then(response => response.json())
        .then(data => {
            if(data.employee){
                const newEmployee = new Employee(data.employee.id, data.employee.first_name, data.employee.last_name, data.employee.position, data.employee.email);

                localStorage.setItem('jwt_token', data.jwt);
                localStorage.setItem('employeeTimeEvents', 0);
                removeDOMElementsOnSignIn();
                removeMessagesSpan()
                newEmployee.renderEmployeeData();
            } else {
                displayMessages(data.message)
                disableButtonSignIn(e)
            }
        })
        .catch(error => console.log(error))
    }
}

const buttonSignIn = document.getElementById("btn-sign-in");

buttonSignIn.addEventListener("click", (e) => {
    e.preventDefault();
    signInEmployee(e);
})

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
    
    if(e.target.innerText == "Sign In") {
        if(signInEmail !== "") {
            fetch(`${CHRONOS_URL}/signin`, configObj)
            .then(response => response.json())
            .then(data => {
                if(data.employee) {
                    const currentEmployee = new Employee(data.employee.id, data.employee.first_name, data.employee.last_name, data.employee.position, data.employee.email, data.employee.time_events);

                    currentEmployee.renderEmployeeData();
                    persistToLocalStorageOnSignIn(data);
                    data.employee.time_events.length === 0 && localStorage.setItem('employeeTimeEvents', 0);

                    removeDOMElementsOnSignIn();
                    removeMessagesSpan();

                    if(document.getElementById("td-event-break-end") && document.getElementById("td-event-break-end").innerText != "") {
                        buttonBreakResume.disabled = true;
                        document.getElementById("btn-break-resume").innerText = "Take Break"
                        document.getElementById("btn-clock-in-out").innerText = "Clock Out";
                    } else if(document.getElementById("btn-break-resume") && document.getElementById("btn-break-resume").innerText == "Resume" && document.getElementById("span-event-break-end") && document.getElementById("span-event-break-end").innerText == "") {
                        document.getElementById("btn-clock-in-out").innerText = "Clock Out";
                        document.getElementById("btn-clock-in-out").disabled = true;
                    } else if(document.getElementById("btn-break-resume")) {
                        document.getElementById("btn-clock-in-out").innerText = "Clock Out";
                    }
                } else {
                    displayMessages(data.message);
                    disableButtonCreateUserSubmit(e);
                }
            })
        } else {
            const message = "Please provide a valid email to sign in";
            displayMessages(message);
            disableButtonCreateUserSubmit(e);
        }
    } else {
        location.reload();
        localStorage.clear();
        e.target.innerText = "Sign In"
    }
}

function persistToLocalStorageOnSignIn(data){
    const newTimeEvent = data.employee.time_events.find(event => !event.time_out);
    localStorage.setItem('jwt_token', data.jwt);
    localStorage.setItem('data', JSON.stringify(data));
    newTimeEvent && localStorage.setItem('newTimeEvent', JSON.stringify(newTimeEvent));
}

function reSignInEmployee(data){
    const currentEmployee = new Employee(data.employee.id, data.employee.first_name, data.employee.last_name, data.employee.position, data.employee.email, data.employee.time_events);

    removeDOMElementsOnSignIn();
    currentEmployee.renderEmployeeData();
}

function removeDOMElementsOnSignIn(){
    document.getElementById("div-signup").remove();
    document.getElementById("sign-in-email").remove();
    document.getElementById("sign-in-password").remove();
    document.getElementById("btn-sign-in").innerText = "Sign Out";
    document.getElementById("btn-sign-in").style.cssText = "width: 100px";
    document.getElementById("div-signin").style.cssText = "float: right;";
}

function createDivNameTag(employeeNameTag){
    divEmployeeNameTag = document.createElement("div");
    divEmployeeNameTag.setAttribute("id", "div-employee-tag-name");
    document.getElementById("main-container").appendChild(divEmployeeNameTag);
    document.getElementById("div-employee-tag-name").innerHTML += employeeNameTag;
}