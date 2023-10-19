function getInputValues() {
    const nombreInput = document.querySelector("#name");
    const emailInput = document.querySelector("#email");
    const passwordInput = document.querySelector("#password");
    const lastNameInput = document.querySelector("#lastName");

    const nombreValue = nombreInput.value;
    const emailValue = emailInput.value;
    const passwordValue = passwordInput.value;
    const lastNameValue = lastNameInput.value;

    return {
        nombre: nombreValue,
        email: emailValue,
        password: passwordValue,
        apellido: lastNameValue
    }
}

const userRegister = async (e) => {
    e.preventDefault ()
    const ObjectToSend = getInputValues()
    try {
        await axios.post("../../user/signUp", ObjectToSend)
        window.location.href = "../index.html"
    } catch (error) {
        console.log(error);
    }
} 

const buttonRegister = document.querySelector("#userRegisterButton")
buttonRegister.addEventListener("click", (e) => {
    userRegister(e);
})