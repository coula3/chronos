class TimeEvent {
    constructor(id, date, time_in, time_out, break_start, break_end, employee_id){
        this.id = id
        this.date = date
        this.time_in = time_in
        this.time_out = time_out
        this.break_start = break_start
        this.break_end = break_end
        this.employee_id = employee_id
    }
}

const buttonClockInOut = document.createElement("button");
let buttonBreakResume;

buttonClockInOut.addEventListener("click", (e) => {
    createTimeEvent(e);
    if(document.getElementById("p-new-user-msg") !== null){
        const p = document.getElementById("p-new-user-msg")
        p.remove()
    }
})

function createTimeEvent(e) {
    const employeeId = document.querySelector("#employee-name").getAttribute("employee-data-id");
    if(e.target.innerText == "Clock In") {
        e.target.innerText = "Clock Out";
    
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
            const newTimeEvent = new TimeEvent(timeEvent.id, timeEvent.date, timeEvent.time_in, timeEvent.time_out, timeEvent.break_start, timeEvent.break_end, timeEvent.employee_id)
            renderNewTimeEvent(newTimeEvent);
        })
    } else {
        const timeEventId = document.querySelector("#div-time-event").getAttribute("event-data-id")

        const bodyObject = {
            id: timeEventId,
            time_out: Date().slice(0, 24)
        }

        const configObj = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(bodyObject)
        }

        fetch(`${CHRONOS_URL}/time_events/${timeEventId}`, configObj)
        .then(response => response.json())
        .then(timeEvent => {
            e.target.innerText = "Clock In";
            updateTimeEvent(timeEvent)
        })
    }
}

function takeBreakOrResumeWork(e) {
    const timeEventId = document.querySelector("#div-time-event").getAttribute("event-data-id")

    if(e.target.innerText == "Take Break") {
        e.target.innerText = "Resume";
        
        const bodyObject = {
            id: timeEventId,
            break_start: Date().slice(0, 24)
        }

        const configObj = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(bodyObject)
        }

        fetch(`${CHRONOS_URL}/time_events/${timeEventId}`, configObj)
        .then(response => response.json())
        .then(timeEvent => {
            console.log(timeEvent);
        })
    }
}

function renderEmployeeTimeEvents(employeeObject) {
    const timeEvents = employeeObject.time_events;
    const divTimeEvents = document.createElement("div");
    divTimeEvents.setAttribute("id", "div-time-events");
    divTimeEvents.style.paddingLeft = "30px"
    divTimeEvents.style.clear = "both"
    document.getElementById("main-container").appendChild(divTimeEvents);
    
    if(employeeObject.time_events.length > 0) {
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
    } else {
        const p = document.createElement("p");
        p.innerText = "Welcome and let's get clocking...!";
        p.setAttribute("id", "p-new-user-msg")
        p.style.cssText = "text-align:center; color:blue"
        const h2 = document.getElementById("employee-name");
        h2.after(p)
    }

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
    divTimeEvent.setAttribute("event-data-id", event.id)
    divTimeEvent.setAttribute("id", "div-time-event")
    const spansOfEvent = `
        <span style="margin: 0px 15px 0px 10px; color:blue;">new</span>
        <span id="span-event-date" style="margin: 0px 25px 0px 25px;">${event.date ? event.date.slice(0, 10) : ""}</span>
        <span id="span-event-time-in" style="margin: 0px 25px 0px 25px">${event.time_in ? getTime(event.time_in) : ""}</span>
        <span id="span-event-time-out" style="margin: 0px 25px 0px 25px">${event.time_out ? getTime(event.time_out) : ""}</span>
        <span id="span-event-break-start" style="margin: 0px 25px 0px 25px">${event.break_start ? getTime(event.break_start) : ""}</span>
        <span id="span-event-break-end" style="clear:right; margin: 0px 25px 0px 25px">${event.break_end ? getTime(event.break_end) : ""}</span>
        
        <button id="btn-break-resume" style="float:right; width:100px;" disabled>Take Break</button>`;
    
    divTimeEvent.innerHTML += spansOfEvent
    document.getElementById("main-container").appendChild(divTimeEvent)

    setTimeout(()=>{
        buttonBreakResume = document.getElementById("btn-break-resume");
        buttonBreakResume.disabled = false;
        buttonBreakResume.addEventListener("click", (e) => {
            takeBreakOrResumeWork(e);
        })
    }, 5000)
}

function updateTimeEvent(event) {
    spanEventTimeOut = document.getElementById("span-event-time-out");
    spanEventTimeOut.innerText = getTime(event.time_out)
}