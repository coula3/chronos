class TimeEvent {
    constructor(id, date, timeOut, breakStart, breakEnd, employeeId){
        this.id = id
        this.date = date
        this.timeOut = timeOut
        this.breakStart = breakStart
        this.breakEnd = breakEnd
        this.employeeId = employeeId
    }

    updateTimeEventOnDOM() {
        const tdEventBreakStart = document.getElementById("td-event-break-start");
        const tdEventBreakEnd = document.getElementById("td-event-break-end");
        const tdEventTimeOut = document.getElementById("td-event-time-out");

        tdEventBreakStart.innerText = this.breakStart ? getTime(this.breakStart) : "";
        tdEventBreakEnd.innerText = this.breakEnd ? getTime(this.breakEnd) : "";
        tdEventTimeOut.innerText = this.timeOut ? getTime(this.timeOut) : "";
    }
}

const buttonClockInOut = document.createElement("button");
let buttonBreakResume;
let activateButtonTimeout;
let counter = 0;
let milleseconds;
let runningTimeInterval;

buttonClockInOut.addEventListener("click", (e) => {
    createTimeEvent(e);
    if(document.getElementById("p-new-user-msg") !== null){
        const p = document.getElementById("p-new-user-msg");
        p.remove();
    }
})

function createTimeEvent(e) {
    const employeeId = document.querySelector("#employee-name").getAttribute("employee-data-id");
    if(e.target.innerText == "Clock In") {
        if(parseInt(Date().slice(16,18)) >= 22 || parseInt(Date().slice(16,18)) <= 4){
            displayMessages("You are not authorized to clock in at this time. Please contact your supervisor for assistance")
        } else {
            const bodyObject = {
                date: Date().slice(0, 24),
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
                const newTimeEvent = new TimeEvent(timeEvent.id, timeEvent.date, timeEvent.time_out, timeEvent.break_start, timeEvent.break_end, timeEvent.employee_id);
                renderNewTimeEvent(newTimeEvent);
                e.target.innerText = "Clock Out";
                addRunningTime();
            })
        }
    } else {
        const timeEventId = document.querySelector("#div-time-event").getAttribute("event-data-id");
        let breakEnd;

        if(!!document.getElementById("td-event-break-start").innerText && !document.getElementById("td-event-break-end").innerText) {
            breakEnd = Date().slice(0, 24);
        } else {
            breakEnd = null;
        }
        const bodyObject = {
            id: timeEventId,
            time_out: Date().slice(0, 24),
            break_end: breakEnd
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

            const currentTimeEvent = new TimeEvent(timeEvent.id, timeEvent.date, timeEvent.time_out, timeEvent.break_start, timeEvent.break_end, timeEvent.employee_id)

            if(!buttonBreakResume) {
                clearTimeout(activateButtonTimeout);
                clearInterval(runningTimeInterval);
                currentTimeEvent.updateTimeEventOnDOM();
                e.target.innerText = "Clock In";
                buttonClockInOut.disabled = true;
            } else {
                currentTimeEvent.updateTimeEventOnDOM();
                clearInterval(runningTimeInterval);
                e.target.innerText = "Clock In";
                buttonBreakResume.disabled = true;
                buttonClockInOut.disabled = true;
                buttonBreakResume.style.backgroundColor = "";
            }

            if(currentTimeEvent.timeOut) {
                updateHours();
                function updateHours(){
                    const hrs = getHours(currentTimeEvent.date, currentTimeEvent.timeOut);
                    document.getElementById("td-event-hours").innerText = hrs;
                }
            }
        })
    }
}

function takeBreakOrResumeWork(e) {
    const timeEventId = document.querySelector("#div-time-event").getAttribute("event-data-id");

    if(e.target.innerText == "Take Break") {
        
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

            const currentTimeEvent = new TimeEvent(timeEvent.id, timeEvent.date, timeEvent.time_out, timeEvent.break_start, timeEvent.break_end, timeEvent.employee_id)

            currentTimeEvent.updateTimeEventOnDOM();
            e.target.innerText = "Resume";
            e.target.style.backgroundColor = "";
            clearInterval(runningTimeInterval)
        })
    } else {
        const bodyObject = {
            id: timeEventId,
            break_end: Date().slice(0, 24)
        }

        const configObj = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body:   JSON.stringify(bodyObject)
        }

        fetch(`${CHRONOS_URL}/time_events/${timeEventId}`, configObj)
        .then(response => response.json())
        .then(timeEvent => {

            const currentTimeEvent = new TimeEvent(timeEvent.id, timeEvent.date, timeEvent.time_out, timeEvent.break_start, timeEvent.break_end, timeEvent.employee_id)

            currentTimeEvent.updateTimeEventOnDOM();
            e.target.innerText = "Take Break";
            e.target.disabled = true;
            counter = milleseconds;
            addRunningTime();
        })
    }
}

function renderEmployeeTimeEvents(employeeObject) {
    const timeEvents = employeeObject.timeEvents;
    const employeeTimeEvents = [];
    for(const i of timeEvents){
        employeeTimeEvents.push(new TimeEvent(i.id, i.date, i.time_out, i.break_start, i.break_end, i.employee_id))
    }
    const closedtimeEvents = employeeTimeEvents.filter((e)=>{ return e.timeOut});
    const renderedTimeEvents = closedtimeEvents.sort((a, b) => a.id - b.id ).slice(-5);
    const openTimeEvent = employeeTimeEvents.filter((e)=>{ return !e.timeOut });

    const divTimeEvents = document.createElement("div");
    divTimeEvents.setAttribute("id", "div-time-events");
    divTimeEvents.style.cssText = "padding-left:30px; clear:both";
    document.getElementById("main-container").appendChild(divTimeEvents);
    
    if(employeeTimeEvents.length > 0) {
        let tableOfEvents = `
            <table id="tbl-events"><thead>
                <tr id="tr-events"><th class="th-events" id="th-events-col-a" style="width:5%">&nbsp</th><th class="th-events" id="th-events-date" style="width:15%">Date</th><th class="th-events" id="th-events-time-in" style="width:15%">Time In</th><th class="th-events" id="th-events-break-start" style="width:15%">Break Start</th><th class="th-events" id="th-events-break-end" style="width:15%">Break End</th><th class="th-events" id="th-events-time-out" style="width:15%">Time Out</th><th class="th-events" id="th-events-shift" style="width:10%">Shift</th><th class="th-events" id="th-events-hours" style="width:15%">Hours</th></tr>
            </thead><tbody>`;

        renderedTimeEvents.forEach((event) => {
            tableOfEvents += `
            <tr>
                <td class="td-events" id="td-events-col-a">${renderedTimeEvents.indexOf(event) + 1}</td>
                <td class="td-events" id="td-events-date">${event.date ? getDate(event.date) : ""}</td>
                <td class="td-events" id="td-events-time-in">${event.date ? getTime(event.date) : ""}</td>
                <td class="td-events" id="td-events-break-start">${event.breakStart ? getTime(event.breakStart) : ""}</td>
                <td class="td-events" id="td-events-break-end">${event.breakEnd ? getTime(event.breakEnd) : ""}</td>
                <td class="td-events" id="td-events-time-out">${event.timeOut ? getTime(event.timeOut) : ""}</td>
                <td class="td-events" id="td-events-time-shift">${getShift(getTime(event.date))}</td>
                <td class="td-events" id="td-events-col-z">${getHours(event.date, event.timeOut)}</td>
            </tr>`;
        })

        tableOfEvents += `</tbody></table>`
        divTimeEvents.innerHTML += tableOfEvents;
        renderWelcomeMsg(employeeObject);
    } else {
        renderWelcomeMsg(employeeObject);
    }

    if(openTimeEvent.length !== 0){
        renderNewTimeEvent(openTimeEvent[0])
    }
}

function renderNewTimeEvent(event) {
    const divTimeEvent = document.createElement("div");
    divTimeEvent.style.cssText = "margin-top:50px; margin-bottom:25px; padding-left:30px; clear:both";
    divTimeEvent.setAttribute("event-data-id", event.id);
    divTimeEvent.setAttribute("id", "div-time-event");

    const tableOfEvent = `
    <table id="tbl-event">
        <thead>
            <tr id="tr-event"><th class="th-event" id="th-event-new" style="width:4.25%">&nbsp</th><th class="th-event" id="th-event-date" style="width:12.75%">Date</th><th class="th-event" id="th-event-time-in" style="width:12.75%">Time In</th><th class="th-event" id="th-event-break-start" style="width:12.75%">Break Start</th><th class="th-event" id="th-event-break-end" style="width:12.75%">Break End</th><th class="th-event" id="th-event-time-out" style="width:12.75%">Time Out</th><th class="th-event" id="th-event-shift" style="width:8.5%">Shift</th><th class="th-event" id="th-event-hours" style="width:12.75%">Hours</th><th class="th-event" id="th-event-col-z" style="width:15%"></th></tr>
        </thead>
        <tbody>
            <tr>
                <td class="td-event" id="td-event-new" style="color:blue">new</td>
                <td class="td-event" id="td-event-date">${event.date ? event.date.slice(0, 10) : ""}</td>
                <td class="td-event" id="td-event-time-in" >${event.date ? getTime(event.date) : ""}</td>
                <td class="td-event" id="td-event-break-start" >${event.breakStart ? getTime(event.breakStart) : ""}</td>
                <td class="td-event" id="td-event-break-end" >${event.breakEnd ? getTime(event.breakEnd) : ""}</td>
                <td class="td-event" id="td-event-time-out" >${event.timeOut ? getTime(event.timeOut) : ""}</td>
                <td class="td-event" id="td-event-time-shift" >${getShift(getTime(event.date))}</td>
                <td class="td-event" id="td-event-hours" ></td>
                <td class="td-event" id="td-event-button"><button id="btn-break-resume" style="float:right; width:100px;" disabled>Take Break</button></td>
            </tr>
        </tbody>
    </table>`;
    
    divTimeEvent.innerHTML += tableOfEvent;
    document.getElementById("main-container").appendChild(divTimeEvent);

    if(!document.getElementById("th-events-col-a")){
        const thEvent = document.querySelectorAll(".th-event");
        for(let i = 0; i < thEvent.length; i++){
            thEvent[i].style.color = "black"
        }
    }

    if(!document.getElementById("td-events-col-a")){
        document.getElementById("div-time-event").style.marginTop = "0px"
    }

    const activateTime = calculateBreakButtonActivateTime(event);

    if(document.getElementById("td-event-break-start").innerText != "") {
        buttonBreakResume = document.getElementById("btn-break-resume");
        buttonBreakResume.disabled = false;
        buttonBreakResume.innerText = "Resume"
        buttonBreakResume.addEventListener("click", (e)=>{
            takeBreakOrResumeWork(e);
        })
    } else {
        activateButtonTimeout = setTimeout(()=>{
            buttonBreakResume = document.getElementById("btn-break-resume");
            buttonBreakResume.disabled = false;
            buttonBreakResume.style.backgroundColor = "#adebad";
            buttonBreakResume.addEventListener("click", (e)=>{
                takeBreakOrResumeWork(e);
            })
        }, activateTime)
    }
}

function calculateBreakButtonActivateTime(event) {
    const timeDiff = calculateTimeDiff(event.date, Date());
    const fourHrsDiffInMillesecs = 60*60*4*1000;
    const elapsedTime = timeDiff - fourHrsDiffInMillesecs;
    const activateTime = 10000;

    return activateTime - elapsedTime;
}

function addRunningTime(){
    runningTimeInterval = setInterval(() => {
        milleseconds = counter += 1
        document.getElementById("td-event-hours").innerText = getRunningTime(milleseconds)
    }, 1000);
}