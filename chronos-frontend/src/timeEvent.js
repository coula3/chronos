function renderEmployeeTimeEvents(employeeObject) {
    const timeEvents = employeeObject.time_events;
    const divTimeEvents = document.createElement("div");
    divTimeEvents.setAttribute("id", "div-time-events");
    document.getElementById("main-container").appendChild(divTimeEvents);
    
    timeEvents.forEach((event) => {
        const paragraphOfEvents = `
        <p>
            <span style="margin: 0px 0px 0px 10px;">${timeEvents.indexOf(event) + 1}</span>
            <span style="margin: 0px 10px 0px 10px">${event.date ? event.date.slice(0, 10) : ""}</span>
            <span style="margin: 0px 10px 0px 10px">${event.time_in ? event.time_in.slice(11, 19) : ""}</span>
            <span style="margin: 0px 10px 0px 10px">${event.time_out ? event.time_out.slice(11, 19) : ""}</span>
            <span style="margin: 0px 10px 0px 10px">${event.break_start ? event.break_start.slice(11, 19) : ""}</span>
            <span style="margin: 0px 10px 0px 10px">${event.break_end ? event.break_end.slice(11, 19) : ""}</span>
        </p>`;
   
        divTimeEvents.innerHTML += paragraphOfEvents;
    })
}