function displayFailedSignInMesaage(message) {
    if(document.getElementById("email-message") === null) {
    const span = document.createElement("span");
    span.innerText = message;

    appendSignInMessagesSpan(span);
    }
}

function appendSignInMessagesSpan(spanElement) {
    document.getElementById("div-signin").appendChild(spanElement);
    spanElement.style.color = "red";
    spanElement.style.float = "right";
    spanElement.style.clear = "both";
    spanElement.setAttribute("id", "email-message");
    setTimeout(() => {
        document.getElementById("email-message").remove()
    }, 3000)
}

function getDate(date) {
    return date.slice(0, 10)
}

function getTime(time) {
    return time.slice(11, 19)
}

function getShift(timeIn){
    if((parseInt(timeIn.slice(0,2)) >= 5) && (parseInt(timeIn.slice(0,2)) < 12)){
        return "A"
    } else if((parseInt(timeIn.slice(0,2)) >= 12) && (parseInt(timeIn.slice(0,2)) < 18)) {
        return "B"
    } if((parseInt(timeIn.slice(0,2)) >= 18) && (parseInt(timeIn.slice(0,2)) <= 21)) {
        return "C"
    }
}

function appendButtonClockInOut() {
    buttonClockInOut.innerText = "Clock In";
    buttonClockInOut.setAttribute("id", "btn-clock-in-out")
    buttonClockInOut.style.width = "100px"
    const divClockInOut = document.createElement("div");
    divClockInOut.setAttribute("id", "div-clock-in-btn")
    divClockInOut.style.float = "right";
    divClockInOut.style.marginBottom = "25px"
    divClockInOut.appendChild(buttonClockInOut);
    const h2 = document.getElementById("employee-name");
    h2.after(divClockInOut);
}