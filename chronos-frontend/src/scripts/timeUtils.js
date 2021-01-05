let counter = 0, seconds, runningTimeInterval;

function appendCurrentTime(){
    const spanTime = document.createElement("span");
    const paraTime = document.getElementById("para-header");
    paraTime.appendChild(spanTime);
    document.getElementById("app-name").after(paraTime);
    spanTime.setAttribute("id", "span-time");
    spanTime.style.cssText = "font-size: 15px; font-weight: bold; color: red; display: block; margin-top: 15px";
    computeCurrentTime(spanTime);
}

function computeCurrentTime(){
    setInterval(() => {
        const spanTime = document.getElementById("span-time");
        const time = new Date();
        const hours = time.getHours();
        const minutes = time.getMinutes();
        const seconds = time.getSeconds();
        spanTime.innerText = `${padNumber(hours)}:${padNumber(minutes)}:${padNumber(seconds)}`;
    }, 1000);
}

function padNumber(number){
    return number < 10 ? `0${number}` : number;
}

function greeting(){
    const time = parseInt(Date().slice(16,24).slice(0,2), 10);
    
    if(time > 6 && time < 12 ){
        return "Good morning";
    }
    if(time >= 12 && time <= 17) {
        return "Good afternoon";
    }
    return "Good evening";
}

function getDate(date) {
    return date.slice(0, 10);
}

function getTime(time) {
    return time ? time.slice(11, 19) : "";
}

function getShift(timeIn){
    if((parseInt(timeIn.slice(0,2)) >= 5) && (parseInt(timeIn.slice(0,2)) < 12)){
        return "A";
    }

    if((parseInt(timeIn.slice(0,2)) >= 12) && (parseInt(timeIn.slice(0,2)) < 18)) {
        return "B";
    }

    if((parseInt(timeIn.slice(0,2)) >= 18) && (parseInt(timeIn.slice(0,2)) <= 21)) {
        return "C";
    }
}

function addRunningTime(currentTimeEvent){
    const elapseTime = getElapseTime(currentTimeEvent);

    counter = Math.round(elapseTime / 1000);

    runningTimeInterval = setInterval(() => {
        seconds = counter += 1;
        document.getElementById("td-event-hours").innerText = getRunningTime(seconds);
        localStorage.setItem('runningTimeStarted', true);
    }, 1000);

}

function getElapseTime(timeEvent){
    const timeEventStartTimeString = new Date(timeEvent.date).toString();
    const diffGMT = parseInt(timeEventStartTimeString.match(/GMT-\d+/)[0].slice(5,6));
    let elapseTime = (new Date - new Date(timeEvent.date).addHours(diffGMT));
    return elapseTime;
}

Date.prototype.addHours = function(hour) {
    const oneHour = 60 * 60 * 1000;
    this.setTime(this.getTime() + (hour * oneHour));
    return this;
}

function getRunningTime(seconds){
    const hours = padNumber((Math.floor(seconds / 3600) % 24));
    const minutes = padNumber((Math.floor(seconds / 60) % 60));
    const secs =  padNumber(seconds % 60);
    return `${hours}:${minutes}:${secs}`;
}

function calculateBreakButtonActivateTime(event) {
    const elapseTime = getElapseTime(event);
    const activateTime = 300000;
    return activateTime - elapseTime;
}

function getHours(startTime, finishTime) {
    const millesecondsDiff = new Date(finishTime) - new Date(startTime);
    const secondsDiff = millesecondsDiff / 1000;
    const hours = padNumber((Math.floor(secondsDiff / 3600) % 24));
    const minutes = padNumber((Math.floor(secondsDiff / 60) % 60));
    const seconds = padNumber(secondsDiff % 60);
    return `${hours}:${minutes}:${seconds}`;
}