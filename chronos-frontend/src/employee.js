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

        if(this.timeEvents){
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
        appendEmployeeFormElements();
    }
})

function createEmployee(e) {
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const position = document.getElementById("position").value
    const email = document.getElementById("email").value;
    const emailConfirmation = document.getElementById("email-confirmation").value

    if(email !== emailConfirmation) {
        displayMessages("Please provide matching emails")
    } else {
        const bodyObject = {first_name: firstName, last_name: lastName, position: position, email: email}

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
        .then(employee => {
            if(!employee.message){
                const newEmployee = new Employee(employee.id, employee.first_name, employee.last_name, employee.position, employee.email);
                document.getElementById("div-signup").remove();
                document.getElementById("sign-in").remove();
                removeMessagesSpan()
                document.getElementById("btn-sign-in").innerText = "Sign Out";
                newEmployee.renderEmployeeData();
            } else {
                displayMessages(employee.message)
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
    const inputSignIn = document.getElementById("sign-in")
    
    if(e.target.innerText == "Sign In") {
        if(inputSignIn.value !== "") {
            fetch(`${CHRONOS_URL}/employees/${inputSignIn.value}`)
            .then(response => response.json())
            .then(employee => {
                if(!employee.message) {
                    const currentEmployee = new Employee(employee.id, employee.first_name, employee.last_name, employee.position, employee.email, employee.time_events);

                    currentEmployee.renderEmployeeData();
                    e.target.innerText = "Sign Out"
                    const divSignUp = document.getElementById("div-signup");
                    inputSignIn.remove();
                    divSignUp.remove();
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
                    displayMessages(employee.message);
                    disableButtonCreateUserSubmit(e);
                }
            })
        } else {
            const message = "Please provide a valid email to sign in";
            displayMessages(message);
            console.log(e.target)
            disableButtonCreateUserSubmit(e);
        }
    } else {
        location.reload();
        e.target.innerText = "Sign In"
    }
}

function createDivNameTag(employeeNameTag){
    divEmployeeNameTag = document.createElement("div");
    divEmployeeNameTag.setAttribute("id", "div-employee-tag-name");
    document.getElementById("main-container").appendChild(divEmployeeNameTag);
    document.getElementById("div-employee-tag-name").innerHTML += employeeNameTag;
}