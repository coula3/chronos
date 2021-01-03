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