class TimeEvent {
    constructor(date, time_in, time_out, break_start, break_end, employee_id){
        this.date = date
        this.timeIn = time_in
        this.timeOut = time_out
        this.breakStart = break_start
        this.breakEnd = break_end
        this.employeeId = employee_id
    }
}

const buttonClockInOut = document.createElement("button");

buttonClockInOut.addEventListener("click", () => {
    createTimeEvent();
})

function createTimeEvent() {
    const employeeId = document.querySelector("#employee-name").getAttribute("employee-data-id");
    
    const bodyObject = {
        date: Date().slice(0, 24),
        time_in: Date().slice(0, 24),
        time_out: null,
        break_start: null,
        break_end: null,
        employee_id: employeeId
    }

    const configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(bodyObject)
    }

    fetch(`${CHRONOS_URL}/time_events`, configObj)
    .then(response => response.json())
    .then(timeEvent => {
        const newTimeEvent = new TimeEvent(timeEvent.date, timeEvent.time_in, timeEvent.time_out, timeEvent.break_start, timeEvent.break_end, timeEvent.employee_id)
        renderNewTimeEvent(newTimeEvent);
    })
}

function renderEmployeeTimeEvents(employeeObject) {
    const timeEvents = employeeObject.time_events;
    const divTimeEvents = document.createElement("div");
    divTimeEvents.setAttribute("id", "div-time-events");
    divTimeEvents.style.paddingLeft = "30px"
    divTimeEvents.style.clear = "both"
    document.getElementById("main-container").appendChild(divTimeEvents);
    
    const spanLabels = `
        <p style="padding-left:60px">
            <strong><span style="margin: 0px 0px 0px 20px;">Date</span></strong>
            <strong><span style="margin: 0px 0px 0px 95px;">Time In</span></strong>
            <strong><span style="margin: 0px 0px 0px 50px;">Time Out</span></strong>
            <strong><span style="margin: 0px 0px 0px 45px;">Break Start</span></strong>
            <strong><span style="margin: 0px 0px 0px 25px;">Break End</span></strong>
            <strong><span style="margin: 0px 0px 0px 25px;">Shift</span></strong>
            <strong><span style="margin: 0px 0px 0px 25px;">Hours</span></strong>
        </p>
    `;

    divTimeEvents.innerHTML += spanLabels;

    timeEvents.forEach((event) => {
        const paragraphOfEvents = `
        <p>
            <span style="margin: 0px 20px 0px 25px;">${timeEvents.indexOf(event) + 1}</span>
            <span style="margin: 0px 25px 0px 25px">${event.date ? getDate(event.date) : ""}</span>
            <span style="margin: 0px 25px 0px 25px">${event.time_in ? getTime(event.time_in) : ""}</span>
            <span style="margin: 0px 25px 0px 25px">${event.time_out ? getTime(event.time_out) : ""}</span>
            <span style="margin: 0px 25px 0px 25px">${event.break_start ? getTime(event.break_start) : ""}</span>
            <span style="margin: 0px 25px 0px 25px">${event.break_end ? getTime(event.break_end) : ""}</span>
            <span style="margin: 0px 25px 0px 30px">${getShift(getTime(event.time_in))}</span>
            <span style="margin: 0px 25px 0px 25px"></span>
        </p>`;
        
        divTimeEvents.innerHTML += paragraphOfEvents;
    })
}

function renderNewTimeEvent(event) {
    const divTimeEvent = document.createElement("div");
    divTimeEvent.style.marginTop = "50px"
    divTimeEvent.style.marginBottom = "25px"
    divTimeEvent.style.paddingLeft = "30px"
    const spansOfEvent = `
        <span style="margin: 0px 15px 0px 10px; color:blue;">new</span>
        <span style="margin: 0px 25px 0px 25px;">${event.date ? event.date.slice(0, 10) : ""}</span>
        <span id="time-in" style="margin: 0px 25px 0px 25px">${event.time_in ? getTime(event.time_in) : ""}</span>
        <span id="time-out" style="margin: 0px 25px 0px 25px">${event.time_out ? getTime(event.time_out) : ""}</span>
        <span id="break-start" style="margin: 0px 25px 0px 25px">${event.break_start ? getTime(event.break_start) : ""}</span>
        <span id="break-end" style="clear:right; margin: 0px 25px 0px 25px">${event.break_end ? getTime(event.break_end) : ""}</span>
        
        <button id="btn-break-pause" style="float:right; width:100px;" disabled>Take Break</button>`;
    
    divTimeEvent.innerHTML += spansOfEvent
    document.getElementById("main-container").appendChild(divTimeEvent)
}