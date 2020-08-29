function displayFailedSignInMesaage(message) {
    if(document.getElementById("email-message") === null) {
    const span = document.createElement("span");
    span.innerText = message;

    appendSignInMessagesSpan(span);
    }
}

function appendSignInMessagesSpan(spanElement) {
    document.getElementById("div-signin").appendChild(spanElement);
    spanElement.style.cssText = "color:red; padding-right: 5px; float:right; clear:both";
    spanElement.setAttribute("id", "email-message");
    
    setTimeout(() => {
        document.getElementById("email-message").remove()
    }, 3000)
}

function getDate(date) {
    return date.slice(0, 10);
}

function getTime(time) {
    return time.slice(11, 19);
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
    divClockInOut.style.cssText = "float:right; margin-bottom:25px;";
    divClockInOut.appendChild(buttonClockInOut);
    const h2 = document.getElementById("employee-name");
    h2.after(divClockInOut);
}

function getHours(startTime, finishTime) {
    const startShift = new Date(startTime);
    const endShift = new Date(finishTime);
    const millesecondsDiff = (endShift - startShift);
    const secondsDiff = millesecondsDiff / 1000;

    const hours = (Math.floor(secondsDiff / 3600) % 24) < 10 ? `0${(Math.floor(secondsDiff / 3600) % 24)}` : (Math.floor(secondsDiff / 3600) % 24)
    const minutes = (Math.floor(secondsDiff / 60) % 60) < 10 ? `0${Math.floor(secondsDiff / 60) % 60}` : Math.floor(secondsDiff / 60) % 60
    const seconds = secondsDiff % 60 < 10 ? `0${secondsDiff % 60}` : secondsDiff % 60

    return `${hours}:${minutes}:${seconds}`
}