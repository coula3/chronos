function renderSignInErrors(message) {
  const signInMsgSpan = document.createElement("span");
  signInMsgSpan.innerText = message;
  signInMsgSpan.setAttribute("id", "signin-msg-span");
  !document.getElementById("signin-msg-span") &&
    document.getElementById("div-signin-inputs").appendChild(signInMsgSpan);
}

function renderSignUpErrors(messages) {
  let firstNameErr, lastNameErr, positionErr, emailErr, passwordErr;

  messages.forEach((message) => {
    if (message.includes("First")) {
      firstNameErr = message;
      renderSignUpFirstNameErr(firstNameErr);
    } else if (message.includes("Last")) {
      lastNameErr = message;
      renderSignUpLastNameErr(lastNameErr);
    } else if (message.includes("Position")) {
      positionErr = message;
      renderSignUpPositionErr(positionErr);
    } else if (message.includes("Email")) {
      emailErr = message;
      renderSignUpEmailErr(emailErr);
    } else if (message.includes("Password")) {
      passwordErr = message;
      renderSignUpPasswordErr(passwordErr);
    }
  });
}

function renderSignUpFirstNameErr(firstNameMsg) {
  const firstNameSpan = document.createElement("span");
  firstNameSpan.innerText = firstNameMsg;
  firstNameSpan.classList.add("signup-msg-span");
  firstNameSpan.setAttribute("id", "first-name-span");
  document.getElementById("first-name").style.cssText = "margin-bottom: 0px";
  !document.getElementById("first-name-span") &&
    document
      .getElementById("div-input-elements")
      .insertBefore(firstNameSpan, document.getElementById("last-name"));
}

function renderSignUpLastNameErr(lastNameMsg) {
  const lastNameSpan = document.createElement("span");
  lastNameSpan.innerText = lastNameMsg;
  lastNameSpan.classList.add("signup-msg-span");
  lastNameSpan.setAttribute("id", "last-name-span");
  document.getElementById("last-name").style.cssText = "margin-bottom: 0px";
  !document.getElementById("last-name-span") &&
    document
      .getElementById("div-input-elements")
      .insertBefore(lastNameSpan, document.getElementById("position"));
}

function renderSignUpPositionErr(positionMsg) {
  const positionSpan = document.createElement("span");
  positionSpan.innerText = positionMsg;
  positionSpan.classList.add("signup-msg-span");
  positionSpan.setAttribute("id", "position-span");
  document.getElementById("position").style.cssText = "margin-bottom: 0px";
  !document.getElementById("position-span") &&
    document
      .getElementById("div-input-elements")
      .insertBefore(positionSpan, document.getElementById("email"));
}

function renderSignUpEmailErr(emailMsg) {
  const emailSpan = document.createElement("span");
  emailSpan.innerText = emailMsg;
  emailSpan.classList.add("signup-msg-span");
  emailSpan.setAttribute("id", "email-span");
  document.getElementById("email").style.cssText = "margin-bottom: 0px";
  !document.getElementById("email-span") &&
    document
      .getElementById("div-input-elements")
      .insertBefore(emailSpan, document.getElementById("password"));
}

function renderSignUpPasswordErr(passwordMsg) {
  const passwordSpan = document.createElement("span");
  passwordSpan.innerText = passwordMsg;
  passwordSpan.classList.add("signup-msg-span");
  passwordSpan.setAttribute("id", "password-span");
  passwordSpan.style.marginBottom = "10px";
  document.getElementById("password-confirmation").style.cssText =
    "margin-bottom: 0px";
  !document.getElementById("password-span") &&
    document.getElementById("password-confirmation").after(passwordSpan);
}

function cleanUpSignUpErrors() {
  document.getElementById("first-name-span") &&
    document.getElementById("first-name-span").remove();
  document.getElementById("last-name-span") &&
    document.getElementById("last-name-span").remove();
  document.getElementById("position-span") &&
    document.getElementById("position-span").remove();
  document.getElementById("email-span") &&
    document.getElementById("email-span").remove();
  document.getElementById("password-span") &&
    document.getElementById("password-span").remove();

  document.getElementById("first-name").style.cssText = "margin-bottom: 10px";
  document.getElementById("last-name").style.cssText = "margin-bottom: 10px";
  document.getElementById("position").style.cssText = "margin-bottom: 10px";
  document.getElementById("email").style.cssText = "margin-bottom: 10px";
}
