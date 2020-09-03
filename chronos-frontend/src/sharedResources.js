function displayMessages(message) {
    if(!document.getElementById("messages")) {
    const span = document.createElement("span");
    span.innerText = message;

    appendMessagesParagraph(span);
    }
}

function appendMessagesParagraph(span) {
    document.getElementById("main-container").insertBefore(span, document.getElementById("div-signup-signin"));
    span.style.cssText = "background-color:#fff7e6; font-size:14px; padding: 5px 10px 5px 10px; border-radius: 25%; float:right;";
    span.setAttribute("id", "messages");

    setTimeout(() => {
        document.getElementById("messages").remove()
    }, 3000)
}

function renderWelcomeMsg(employeeObject){
    const firstName = `${employeeObject.first_name[0].toUpperCase() + employeeObject.first_name.slice(1)}`
    const p = document.createElement("p");
    p.innerText = `Hi ${firstName}, welcome and let's get clocking...!`;
    p.setAttribute("id", "p-new-user-msg");
    p.style.cssText = "text-align:center; color:blue; font-size:20px; padding-top:20px; clear:both;";
    const h2 = document.getElementById("employee-name");
    document.getElementById("div-employee-tag-name").after(p);
    if(document.getElementById("div-time-events"))
        document.getElementById("div-time-events").style.backgroundColor = "#e6ffff";
}

function greeting(){
    const time = parseInt(Date().slice(16,24).slice(0,2), 10)
    if(time > 6 && time < 12 ){
        return "Good morning"
    }  else if(time >= 12 && time <= 17) {
        return "Good afternoon"
    } else {
        return "Good evening"
    }
}

function getDate(date) {
    return date.slice(0, 10);
}

function getTime(time) {
    return time ? time.slice(11, 19) : "";
}

function getShift(timeIn){
    if((parseInt(timeIn.slice(0,2)) >= 5) && (parseInt(timeIn.slice(0,2)) < 12)){
        return "A"
    } else if((parseInt(timeIn.slice(0,2)) >= 12) && (parseInt(timeIn.slice(0,2)) < 18)) {
        return "B"
    } else if((parseInt(timeIn.slice(0,2)) >= 18) && (parseInt(timeIn.slice(0,2)) <= 21)) {
        return "C"
    }
}

function appendButtonClockInOut() {
    buttonClockInOut.innerText = "Clock In";
    buttonClockInOut.setAttribute("id", "btn-clock-in-out");
    buttonClockInOut.style.width = "100px";
    const divClockInOut = document.createElement("div");
    divClockInOut.setAttribute("id", "div-clock-in-btn");
    divClockInOut.style.cssText = "float:right; margin-top:50px; margin-bottom:50px; clear:both;";
    divClockInOut.appendChild(buttonClockInOut);
    const h2 = document.getElementById("employee-name");
    document.getElementById("div-employee-tag-name").after(divClockInOut);
}

function calculateTimeDiff(startTime, finishTime) {
    const startTimeObj = new Date(startTime);
    const finishTimeObj = new Date(finishTime);
    const milleSecondsDiff = (finishTimeObj - startTimeObj);
    return milleSecondsDiff;
}

function getHours(startTime, finishTime) {
    const secondsDiff = calculateTimeDiff(startTime, finishTime) / 1000

    const hours = (Math.floor(secondsDiff / 3600) % 24) < 10 ? `0${(Math.floor(secondsDiff / 3600) % 24)}` : (Math.floor(secondsDiff / 3600) % 24)
    const minutes = (Math.floor(secondsDiff / 60) % 60) < 10 ? `0${Math.floor(secondsDiff / 60) % 60}` : Math.floor(secondsDiff / 60) % 60
    const seconds = secondsDiff % 60 < 10 ? `0${secondsDiff % 60}` : secondsDiff % 60

    return `${hours}:${minutes}:${seconds}`
}