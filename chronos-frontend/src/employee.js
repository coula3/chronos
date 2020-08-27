function getEmployeeData() {
    email = document.getElementById("sign-in").value;

    fetch(`${CHRONOS_URL}/employees/${email}`)
    .then(response => response.json())
    .then(json => {
        renderEmployeeData(json);
    })
}

function renderEmployeeData(employeeObject) {
    const h2 = document.createElement("h2");
    h2.innerText = `Hi ${employeeObject.first_name}!`
    h2.setAttribute("id", "employee-name")
    h2.setAttribute("employee-data-id", employeeObject.id)
    document.getElementById("main-container").appendChild(h2)
    h2.style.clear = "both";
    h2.style.paddingTop = "25px"
    // document.querySelector("#employee-name").getAttribute("employee-data-id")

    renderEmployeeTimeEvents(employeeObject)
}