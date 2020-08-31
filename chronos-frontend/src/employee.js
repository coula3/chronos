class Employee {
    constructor(id, first_name, last_name, position, email) {
        this.id = id
        this.first_name = first_name
        this.last_name = last_name
        this.email = email
        this.position = position
    }
}

const addEmployeeForm = document.getElementById("form-create-employee")

addEmployeeForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    createEmployee();
})

function createEmployee() {
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
                console.log(newEmployee)
                renderEmployeeData(newEmployee);
            } else {
                displayMessages(employee.message)
            }
        })
        .catch(error => console.log(error))
    }
}

function signInEmployee(e) {
    const inputSignIn = document.getElementById("sign-in")
    
    if(e.target.innerText == "Sign In") {
        if(inputSignIn.value !== "") {
            fetch(`${CHRONOS_URL}/employees/${inputSignIn.value}`)
            .then(response => response.json())
            .then(employee => {
                if(!employee.message) {
                    renderEmployeeData(employee);
                    e.target.innerText = "Sign Out"
                    const divSignUp = document.getElementById("div-signup");
                    inputSignIn.remove();
                    divSignUp.remove();
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
                }
            })
        } else {
            const message = "Please provide a valid email to sign in";
            displayMessages(message);
        }
    } else {
        location.reload();
        e.target.innerText = "Sign In"
    }
}

function renderEmployeeData(employeeObject) {
    const firstName = `${employeeObject.first_name[0].toUpperCase() + employeeObject.first_name.slice(1)}`
    const lastName = `${employeeObject.last_name[0].toUpperCase() + employeeObject.last_name.slice(1)}`
    const employeeNameTag = `
        <h2 id="employee-name" employee-data-id = ${employeeObject.id} style="color:blue; padding-left:10px; margin:0px 0px 0px 0px; float:right; clear:both">${firstName} ${lastName}</h2>
        <h4 id="employee-position" style="padding-left:10px; margin:0px 0px 0px 0px; float:right; clear:both">${employeeObject.position}</h4>
    `;

    divEmployeeNameTag = document.createElement("div");
    divEmployeeNameTag.setAttribute("id", "div-employee-tag-name");
    document.getElementById("main-container").appendChild(divEmployeeNameTag);
    document.getElementById("div-employee-tag-name").innerHTML += employeeNameTag;

    appendButtonClockInOut();

    if(employeeObject.time_events){
        renderEmployeeTimeEvents(employeeObject);
    } else {
        renderWelcomeMsg(employeeObject);
    }
}