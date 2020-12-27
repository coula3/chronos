const signInEmailInput = document.getElementById("sign-in-email");

function renderSignInErrors(message) {
    const spanSignInMsg = document.createElement("span")
    spanSignInMsg.innerText = message;
    spanSignInMsg.setAttribute("id", "spanSignInMsg");
    spanSignInMsg.style.cssText = "display: block; font-size: 14px; color: red; text-align: center;";
    !document.getElementById("spanSignInMsg") && document.getElementById("form-signin").insertBefore(spanSignInMsg, document.getElementById("btn-sign-in"));
}

function renderSignUpErrors(messages) {
    let firstNameErr, lastNameErr, positionErr, emailErr, passwordErr;
    const spanStyles = "display: block; margin-bottom: 5px; font-size: 14px; color: red; text-align: center;";

    messages.forEach(message => {
        if(message.includes("First")){
            firstNameErr = message;
            renderFirstNameMsg(firstNameErr, spanStyles);
        } else if(message.includes("Last")){
            lastNameErr = message;
            renderLastNameMsg(lastNameErr, spanStyles);
        } else if(message.includes("Position")){
            positionErr = message;
            renderPositionMsg(positionErr, spanStyles);
        } else if(message.includes("Email")){
            emailErr = message;
            renderEmailMsg(emailErr, spanStyles);
        } else if(message.includes("Password")){
            passwordErr = message;
            renderPasswordMsg(passwordErr, spanStyles);
        }
    });
}

function renderFirstNameMsg(firstNameMsg, spanStyles){
    spanFirstName = document.createElement("span");
    spanFirstName.innerText = firstNameMsg;
    spanFirstName.setAttribute("id", "span-first-name");
    spanFirstName.style.cssText = spanStyles;
    document.getElementById("first-name").style.cssText = "margin-bottom: 0px";
    !document.getElementById("span-first-name") && document.getElementById("div-input-elements").insertBefore(spanFirstName, document.getElementById("last-name"));
}

function renderLastNameMsg(lastNameMsg, spanStyles){
    spanLastName = document.createElement("span");
    spanLastName.innerText = lastNameMsg;
    spanLastName.setAttribute("id", "span-last-name");
    spanLastName.style.cssText = spanStyles;
    document.getElementById("last-name").style.cssText = "margin-bottom: 0px";
    !document.getElementById("span-last-name") && document.getElementById("div-input-elements").insertBefore(spanLastName, document.getElementById("position"));
}

function renderPositionMsg(positionMsg, spanStyles){
    spanPosition = document.createElement("span");
    spanPosition.innerText = positionMsg;
    spanPosition.setAttribute("id", "span-position");
    spanPosition.style.cssText = spanStyles;
    document.getElementById("position").style.cssText = "margin-bottom: 0px";
    !document.getElementById("span-position") && document.getElementById("div-input-elements").insertBefore(spanPosition, document.getElementById("email"));
}

function renderEmailMsg(emailMsg, spanStyles){
    spanEmail = document.createElement("span");
    spanEmail.innerText = emailMsg;
    spanEmail.setAttribute("id", "span-email");
    spanEmail.style.cssText = spanStyles;
    document.getElementById("email").style.cssText = "margin-bottom: 0px";
    !document.getElementById("span-email") && document.getElementById("div-input-elements").insertBefore(spanEmail, document.getElementById("password"));
}

function renderPasswordMsg(passwordMsg, spanStyles){
    spanPassword = document.createElement("span");
    spanPassword.innerText = passwordMsg;
    spanPassword.setAttribute("id", "span-password");
    spanPassword.style.cssText = spanStyles;
    spanPassword.style.marginBottom = "10px";
    document.getElementById("password-confirmation").style.cssText = "margin-bottom: 0px";
    !document.getElementById("span-password") && document.getElementById("password-confirmation").after(spanPassword);
}

if(signInEmailInput) {
    signInEmailInput.addEventListener("focus", () => {
        document.getElementById("div-input-elements") && document.getElementById("div-input-elements").remove();
        document.getElementById("btn-create-user").innerText = "Sign Up";
        document.getElementById("btn-sign-in").disabled = false;
    });
}