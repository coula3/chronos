let counter = 0;
let seconds;
let runningTimeInterval;

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
    if(!currentTimeEvent){
        runningTimeInterval = setInterval(() => {
            seconds = counter += 1;
            document.getElementById("td-event-hours").innerText = getRunningTime(seconds);
            localStorage.setItem('runningTimeStarted', true);
        }, 1000);
    } else {
        const elapseTime = getElapseTime(currentTimeEvent);

        counter = Math.round(elapseTime / 1000);

        runningTimeInterval = setInterval(() => {
            seconds = counter += 1;
            document.getElementById("td-event-hours").innerText = getRunningTime(seconds);
        }, 1000);
    }
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
    const hours = (Math.floor(seconds / 3600) % 24) < 10 ? `0${Math.floor(seconds / 3600) % 24}` : Math.floor(seconds / 3600) % 24;
    const minutes = (Math.floor(seconds / 60) % 60) < 10 ? `0${Math.floor(seconds / 60) % 60}` : Math.floor(seconds / 60) % 60;
    const secs =  seconds % 60 < 10 ? `0${seconds % 60 }` : seconds % 60;
    return `${hours}:${minutes}:${secs}`;
}

function calculateBreakButtonActivateTime(event) {
    const timeDiff = calculateTimeDiff(event.date, Date());
    const fourHrsDiffInMillesecs = 60*60*4*1000;
    const elapsedTime = timeDiff - fourHrsDiffInMillesecs;

    const activateTime = 10000;

    return activateTime - elapsedTime;
}

function calculateTimeDiff(startTime, finishTime) {
    const startTimeObj = new Date(startTime);
    const finishTimeObj = new Date(finishTime);

    return (finishTimeObj - startTimeObj);
}

function getHours(startTime, finishTime) {
    const secondsDiff = calculateTimeDiff(startTime, finishTime) / 1000;

    const hours = (Math.floor(secondsDiff / 3600) % 24) < 10 ? `0${(Math.floor(secondsDiff / 3600) % 24)}` : (Math.floor(secondsDiff / 3600) % 24);
    const minutes = (Math.floor(secondsDiff / 60) % 60) < 10 ? `0${Math.floor(secondsDiff / 60) % 60}` : Math.floor(secondsDiff / 60) % 60;
    const seconds = secondsDiff % 60 < 10 ? `0${secondsDiff % 60}` : secondsDiff % 60;

    return `${hours}:${minutes}:${seconds}`;
}