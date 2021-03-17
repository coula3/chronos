function renderSignInErrors(message) {
    const signInMsgSpan = document.createElement("span")
    signInMsgSpan.innerText = message;
    signInMsgSpan.setAttribute("id", "signin-msg-span");
    !document.getElementById("signin-msg-span") && document.getElementById("div-signin-inputs").appendChild(signInMsgSpan);
}

function renderSignUpErrors(messages) {
    let firstNameErr, lastNameErr, positionErr, emailErr, passwordErr;
    const spanStyles = "display: block; margin-bottom: 5px; font-size: 0.75rem; color: red; text-align: center;";

    messages.forEach(message => {
        if(message.includes("First")){
            firstNameErr = message;
            renderSignUpFirstNameErr(firstNameErr, spanStyles);
        } else if(message.includes("Last")){
            lastNameErr = message;
            renderSignUpLastNameErr(lastNameErr, spanStyles);
        } else if(message.includes("Position")){
            positionErr = message;
            renderSignUpPositionErr(positionErr, spanStyles);
        } else if(message.includes("Email")){
            emailErr = message;
            renderSignUpEmailErr(emailErr, spanStyles);
        } else if(message.includes("Password")){
            passwordErr = message;
            renderSignUpPasswordErr(passwordErr, spanStyles);
        }
    });
}

function renderSignUpFirstNameErr(firstNameMsg, spanStyles){
    spanFirstName = document.createElement("span");
    spanFirstName.innerText = firstNameMsg;
    spanFirstName.setAttribute("id", "span-first-name");
    spanFirstName.style.cssText = spanStyles;
    document.getElementById("first-name").style.cssText = "margin-bottom: 0px";
    !document.getElementById("span-first-name") && document.getElementById("div-input-elements").insertBefore(spanFirstName, document.getElementById("last-name"));
}

function renderSignUpLastNameErr(lastNameMsg, spanStyles){
    spanLastName = document.createElement("span");
    spanLastName.innerText = lastNameMsg;
    spanLastName.setAttribute("id", "span-last-name");
    spanLastName.style.cssText = spanStyles;
    document.getElementById("last-name").style.cssText = "margin-bottom: 0px";
    !document.getElementById("span-last-name") && document.getElementById("div-input-elements").insertBefore(spanLastName, document.getElementById("position"));
}

function renderSignUpPositionErr(positionMsg, spanStyles){
    spanPosition = document.createElement("span");
    spanPosition.innerText = positionMsg;
    spanPosition.setAttribute("id", "span-position");
    spanPosition.style.cssText = spanStyles;
    document.getElementById("position").style.cssText = "margin-bottom: 0px";
    !document.getElementById("span-position") && document.getElementById("div-input-elements").insertBefore(spanPosition, document.getElementById("email"));
}

function renderSignUpEmailErr(emailMsg, spanStyles){
    spanEmail = document.createElement("span");
    spanEmail.innerText = emailMsg;
    spanEmail.setAttribute("id", "span-email");
    spanEmail.style.cssText = spanStyles;
    document.getElementById("email").style.cssText = "margin-bottom: 0px";
    !document.getElementById("span-email") && document.getElementById("div-input-elements").insertBefore(spanEmail, document.getElementById("password"));
}

function renderSignUpPasswordErr(passwordMsg, spanStyles){
    spanPassword = document.createElement("span");
    spanPassword.innerText = passwordMsg;
    spanPassword.setAttribute("id", "span-password");
    spanPassword.style.cssText = spanStyles;
    spanPassword.style.marginBottom = "10px";
    document.getElementById("password-confirmation").style.cssText = "margin-bottom: 0px";
    !document.getElementById("span-password") && document.getElementById("password-confirmation").after(spanPassword);
}

function cleanUpSignUpErrors(){
    document.getElementById("span-first-name") && document.getElementById("span-first-name").remove();
    document.getElementById("span-last-name") && document.getElementById("span-last-name").remove();
    document.getElementById("span-position") && document.getElementById("span-position").remove();
    document.getElementById("span-email") && document.getElementById("span-email").remove();
    document.getElementById("span-password") && document.getElementById("span-password").remove();

    document.getElementById("first-name").style.cssText = "margin-bottom: 10px";
    document.getElementById("last-name").style.cssText = "margin-bottom: 10px";
    document.getElementById("position").style.cssText = "margin-bottom: 10px";
    document.getElementById("email").style.cssText = "margin-bottom: 10px";
    document.getElementById("password").style.cssText = "margin-bottom: 10px";
}