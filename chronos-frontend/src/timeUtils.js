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
            milleseconds = counter += 1;
            document.getElementById("td-event-hours").innerText = getRunningTime(milleseconds);
            localStorage.setItem('runningTimeStarted', true);
            localStorage.setItem('runningTime', milleseconds)
        }, 1000);
    } else {
        counter = JSON.parse(localStorage.getItem('runningTime'));

        runningTimeInterval = setInterval(() => {
            milleseconds = counter += 1;
            localStorage.setItem('runningTime', milleseconds)
            document.getElementById("td-event-hours").innerText = getRunningTime(milleseconds);
        }, 1000);
    }
}

function getRunningTime(milleseconds){
    const hours = (Math.floor(milleseconds / 3600) % 24) < 10 ? `0${Math.floor(milleseconds / 3600) % 24}` : Math.floor(milleseconds / 3600) % 24;
    const minutes = (Math.floor(milleseconds / 60) % 60) < 10 ? `0${Math.floor(milleseconds / 60) % 60}` : Math.floor(milleseconds / 60) % 60;
    const secs =  milleseconds % 60 < 10 ? `0${milleseconds % 60 }` : milleseconds % 60;
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