class Employee {
    constructor(id, first_name, last_name, email) {
        this.id = id
        this.first_name = first_name
        this.last_name = last_name
        this.email = email
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
    const email = document.getElementById("email").value;
    const emailConfirmation = document.getElementById("email-confirmation").value

    if(email !== emailConfirmation) {
        console.log("Emails do not match")
    } else {
        const bodyObject = {first_name: firstName, last_name: lastName, email: email}

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
            const newEmployee = new Employee(employee.id, employee.first_name, employee.last_name, employee.email);
            renderEmployeeData(newEmployee);
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
    const h2 = document.createElement("h2");
    h2.innerText = `Hi ${employeeObject.first_name[0].toUpperCase() + employeeObject.first_name.slice(1)}!`
    h2.setAttribute("id", "employee-name")
    h2.setAttribute("employee-data-id", employeeObject.id)
    document.getElementById("main-container").appendChild(h2)
    h2.style.cssText = "padding-left:15px; padding-top:50px; clear:both;"

    appendButtonClockInOut();
    if(employeeObject.time_events)
        renderEmployeeTimeEvents(employeeObject);
}