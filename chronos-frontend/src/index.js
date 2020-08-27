const CHRONOS_URL = "http://localhost:3000";
const buttonSignIn = document.getElementById("btn-sign-in");

buttonSignIn.addEventListener("click", (e) => {
    e.preventDefault();
    getEmployeeData();
})


function getEmployeeData() {
    email = document.getElementById("sign-in").value;

    fetch(`${CHRONOS_URL}/employees/${email}`)
    .then(response => response.json())
    .then(json => {
        renderEmployeeData(json);
    })
}

function renderEmployeeData(employeeObject) {
    const h2 = document.createElement("h2");
    h2.innerText = `Hi ${employeeObject.first_name}!`
    h2.setAttribute("id", "employee-name")
    h2.setAttribute("employee-data-id", employeeObject.id)
    document.getElementById("main-container").appendChild(h2)
    h2.style.clear = "both";
    h2.style.paddingTop = "25px"
    // document.querySelector("#employee-name").getAttribute("employee-data-id")

    renderEmployeeTimeEvents(employeeObject)
}

function renderEmployeeTimeEvents(employeeObject) {
    const timeEvents = employeeObject.time_events;
    const divTimeEvents = document.createElement("div");
    divTimeEvents.setAttribute("id", "div-time-events");
    document.getElementById("main-container").appendChild(divTimeEvents);
    
    timeEvents.forEach((event) => {
        const paragraphOfEvents = `
        <p>
            <span style="margin: 0px 0px 0px 10px;">${timeEvents.indexOf(event) + 1}</span>
            <span style="margin: 0px 10px 0px 10px">${event.date ? event.date.slice(0, 10) : ""}</span>
            <span style="margin: 0px 10px 0px 10px">${event.time_in ? event.time_in.slice(11, 19) : ""}</span>
            <span style="margin: 0px 10px 0px 10px">${event.time_out ? event.time_out.slice(11, 19) : ""}</span>
            <span style="margin: 0px 10px 0px 10px">${event.break_start ? event.break_start.slice(11, 19) : ""}</span>
            <span style="margin: 0px 10px 0px 10px">${event.break_end ? event.break_end.slice(11, 19) : ""}</span>
        </p>`;
   
        divTimeEvents.innerHTML += paragraphOfEvents;
    })
}