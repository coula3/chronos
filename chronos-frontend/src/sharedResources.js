function displayFailedSignInMesaage(message) {
    const span = document.createElement("span");
    span.innerText = message;

    appendSignInMessagesSpan(span);
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