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

function renderEmployeeTimeEvents(employeeObject) {
    const timeEvents = employeeObject.time_events;
    const divTimeEvents = document.createElement("div");
    divTimeEvents.setAttribute("id", "div-time-events");
    divTimeEvents.style.clear = "both"
    document.getElementById("main-container").appendChild(divTimeEvents);
    
    timeEvents.forEach((event) => {
        const paragraphOfEvents = `
        <p>
            <span style="margin: 0px 0px 0px 10px;">${timeEvents.indexOf(event) + 1}</span>
            <span style="margin: 0px 10px 0px 10px">${event.date ? getDate(event.date) : ""}</span>
            <span style="margin: 0px 10px 0px 10px">${event.time_in ? getTime(event.time_in) : ""}</span>
            <span style="margin: 0px 10px 0px 10px">${event.time_out ? getTime(event.time_out) : ""}</span>
            <span style="margin: 0px 10px 0px 10px">${event.break_start ? getTime(event.break_start) : ""}</span>
            <span style="margin: 0px 10px 0px 10px">${event.break_end ? getTime(event.break_end) : ""}</span>
        </p>`;
   
        divTimeEvents.innerHTML += paragraphOfEvents;
    })
}