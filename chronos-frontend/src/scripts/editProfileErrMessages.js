function renderEditProfileErrors(messages){
    let firstNameErr, lastNameErr, emailErr;
    const spanStyles = "display: block; margin-bottom: 5px; font-size: 12px; color: red; text-align: center;";

    messages.forEach(message => {
        if(message.includes("First")){
            firstNameErr = message;
            renderEditProfileFirstNameErr(firstNameErr, spanStyles);
        } else if(message.includes("Last")){
            lastNameErr = message;
            renderEditProfileLastNameErr(lastNameErr, spanStyles);
        } else if(message.includes("Email")){
            emailErr = message;
            renderEditProfileEmailErr(emailErr, spanStyles);
        }
    });
}

function renderEditProfileFirstNameErr(firstNameMsg, spanStyles){
    spanFirstName = document.createElement("span");
    spanFirstName.innerText = firstNameMsg;
    spanFirstName.setAttribute("id", "spanFirstName");
    spanFirstName.style.cssText = spanStyles;
    document.getElementById("profileFirstName").style.cssText = "margin-bottom: 0px";
    !document.getElementById("spanFirstName") && document.getElementById("profileFirstName").after(spanFirstName);
}

function renderEditProfileLastNameErr(lastNameMsg, spanStyles){
    spanLastName = document.createElement("span");
    spanLastName.innerText = lastNameMsg;
    spanLastName.setAttribute("id", "spanLastName");
    spanLastName.style.cssText = spanStyles;
    document.getElementById("profileLastName").style.cssText = "margin-bottom: 0px";
    !document.getElementById("spanLastName") && document.getElementById("profileLastName").after(spanLastName);
}

function renderEditProfileEmailErr(emailMsg, spanStyles){
    spanEmail = document.createElement("span");
    spanEmail.innerText = emailMsg;
    spanEmail.setAttribute("id", "spanEmail");
    spanEmail.style.cssText = spanStyles;
    document.getElementById("profileEmail").style.cssText = "margin-bottom: 0px";
    !document.getElementById("spanEmail") && document.getElementById("profileEmail").after(spanEmail);
}