const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getInputValues() {
    const nombreInput = document.querySelector("#name");
    const emailInput = document.querySelector("#email");
    const passwordInput = document.querySelector("#password");
    const lastNameInput = document.querySelector("#lastName");

    const nombreValue = nombreInput.value;
    const emailValue = emailInput.value;
    const passwordValue = passwordInput.value;
    const lastNameValue = lastNameInput.value;

    if (!nombreValue && !emailValue && !passwordValue && !lastNameValue) {
        Swal.fire(
            '¿Eh?',
            'Creo que esto está algo vacío...',
            'question'
        );
    }

    if (!passwordValue || passwordValue.length < 8) {
        Swal.fire({
            title: 'Vaya. Eso no debió de suceder.',
            text: 'La contraseña no puede estar vacía o ser inferior a 8 caracteres.',
            icon: 'warning',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        });
        return null
    }

    if (!emailValue || !regex.test(emailValue)) {
        Swal.fire({
            title: 'Vaya. Eso no debió de suceder.',
            text: 'Ingresa un correo válido.',
            imageUrl: 'https://media.tenor.com/q-zZSTX6jSIAAAAC/mail-download.gif',
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: 'Email',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        });
    }

    if (!lastNameValue) {
        Swal.fire({
            title: 'Vaya. Eso no debió de suceder.',
            text: 'El apellido no puede estar vacío.',
            icon: 'warning',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        });
    } else if (lastNameValue.length < 3) {
        Swal.fire({
            title: 'Vaya. Eso no debió de suceder.',
            text: 'El apellido debe tener al menos 3 caracteres.',
            icon: 'warning',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        });
    }

    if (!nombreValue) {
        Swal.fire({
            title: 'Vaya. Eso no debió de suceder.',
            text: 'El nombre no puede estar vacío.',
            icon: 'warning',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        });
    } else if (nombreValue.length < 2) {
        Swal.fire({
            title: 'Vaya. Eso no debió de suceder.',
            text: 'El nombre debe tener al menos 2 caracteres.',
            icon: 'warning',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        });
    }


    return {
        nombre: nombreValue,
        email: emailValue,
        password: passwordValue,
        apellido: lastNameValue
    };
}

const userRegister = async (e) => {
    e.preventDefault();
    const ObjectToSend = getInputValues();

    if (ObjectToSend === null) {
        return;
    }

    try {
        await axios.post("../../user/signUp", ObjectToSend);
        window.location.href = "../login/login.html";
    } catch (error) {
        console.log(error);
    }
};

const buttonRegister = document.querySelector("#userRegisterButton");
buttonRegister.addEventListener("click", (e) => {
    userRegister(e);
});


// const regex = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;

// function getInputValues() {
//     const nombreInput = document.querySelector("#name");
//     const emailInput = document.querySelector("#email");
//     const passwordInput = document.querySelector("#password");
//     const lastNameInput = document.querySelector("#lastName");

//     const nombreValue = nombreInput.value;
//     const emailValue = emailInput.value;
//     const passwordValue = passwordInput.value;
//     const lastNameValue = lastNameInput.value;

//     if (!emailValue && !regex.test(emailValue)) {
//         Swal.fire({
//             title: 'Vaya. Eso no debió de suceder.',
//             text: 'Ingresa un correo válido.',
//             imageUrl: 'https://media.tenor.com/q-zZSTX6jSIAAAAC/mail-download.gif',
//             imageWidth: 200,
//             imageHeight: 200,
//             imageAlt: 'Email',
//             showClass: {
//               popup: 'animate__animated animate__fadeInDown'
//             },
//             hideClass: {
//               popup: 'animate__animated animate__fadeOutUp'
//             }
//           })
//     }

//     if (!lastNameValue) {
//         Swal.fire({
//             title: 'Vaya. Eso no debió de suceder.',
//             text: 'El apellido no puede estar vacio.',
//             icon: 'warning',
//             showClass: {
//               popup: 'animate__animated animate__fadeInDown'
//             },
//             hideClass: {
//               popup: 'animate__animated animate__fadeOutUp'
//             }
//           })
//     } else if (lastNameValue.length < 3) {
//         Swal.fire({
//             title: 'Vaya. Eso no debió de suceder.',
//             text: 'El apellido debe tener al menos 3 caracteres.',
//             icon: 'warning',
//             showClass: {
//               popup: 'animate__animated animate__fadeInDown'
//             },
//             hideClass: {
//               popup: 'animate__animated animate__fadeOutUp'
//             }
//           })
//     }

//     if (!nombreValue) {
//         Swal.fire({
//             title: 'Vaya. Eso no debió de suceder.',
//             text: 'El nombre no puede estar vacio.',
//             icon: 'warning',
//             showClass: {
//               popup: 'animate__animated animate__fadeInDown'
//             },
//             hideClass: {
//               popup: 'animate__animated animate__fadeOutUp'
//             }
//           })
//     } else if (nombreValue.length < 2) {
//         Swal.fire({
//             title: 'Vaya. Eso no debió de suceder.',
//             text: 'El nombre debe tener al menos 2 caracteres.',
//             icon: 'warning',
//             showClass: {
//               popup: 'animate__animated animate__fadeInDown'
//             },
//             hideClass: {
//               popup: 'animate__animated animate__fadeOutUp'
//             }
//           })
//     }

//     if (!passwordValue) {
//         Swal.fire({
//             title: 'Vaya. Eso no debió de suceder.',
//             text: 'La contraseña no puede estar vacia.',
//             icon: 'warning',
//             showClass: {
//               popup: 'animate__animated animate__fadeInDown'
//             },
//             hideClass: {
//               popup: 'animate__animated animate__fadeOutUp'
//             }
//           })

//     } else if (passwordValue.length < 8) {
//         Swal.fire({
//             title: 'Vaya. Eso no debió de suceder.',
//             text: 'La contraseña tiene que tener al menos 8 caracteres.',
//             icon: 'warning',
//             showClass: {
//               popup: 'animate__animated animate__fadeInDown'
//             },
//             hideClass: {
//               popup: 'animate__animated animate__fadeOutUp'
//             }
//           })
//     } else {
//         (!nombreValue && !emailValue && !passwordValue && !lastNameValue)
//             Swal.fire(
//                 '¿Eh?',
//                 'Creo que esto esta algo vacio...',
//                 'question'
//               )
//     }

//     return {
//         nombre: nombreValue,
//         email: emailValue,
//         password: passwordValue,
//         apellido: lastNameValue
//     };
// }

// const userRegister = async (e) => {
//     e.preventDefault ()
//     const ObjectToSend = getInputValues()

//     try {
//         await axios.post("../../user/signUp", ObjectToSend)
//         window.location.href = "../login/login.html"
//     } catch (error) {
//         console.log(error);
//     }
// } 

// const buttonRegister = document.querySelector("#userRegisterButton")
// buttonRegister.addEventListener("click", (e) => {
//     userRegister(e);
// })