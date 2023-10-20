let tickets = {
    "Toronto": 10,
    "Kanata": 20,
    "Laval": 17,
    "Milan": 21,
    "Zurich": 0,
    "Vienna": 6,
    "Munich": 25,
    "Düsseldorf": 3,
}

function getTickets(place){
    disabledSoldOutButtons(tickets);
    if (tickets[place] > 0){
        swal(`Felicidades`, `Has obtenido tickets para ${place}`, `success`)
        tickets[place]--
        if (tickets[place] == 0){
            disabledSoldOutButtons(place);
            swal(`Oh no`, `Ya no quedan tickets para ${place}`, `info`)
        }
    }
}

function disabledSoldOutButtons(tickets) {
    for (const ciudad in tickets) {
        if (tickets[ciudad] == 0) {
            let boton = document.querySelector(`#${ciudad}`)
            if (boton) {
            boton.textContent = "Sold Out";
            boton.style.color="red";
            } else {
                alert("No lo he encontrado.")
            }
        }
    }
}


const botones = document.querySelectorAll(".ticketButton")

const confirm = Swal.fire({
    title: '¿Cuantos años tienes?',
    icon: 'question',
    input: 'range',
    inputLabel: 'Puedes usar [↑ - ↓] para mayor precisión!',
    inputAttributes: {
      min: 8,
      max: 120,
      step: 1
    },
    inputValue: 18
  }).then((confirm) => {
    if (confirm.isConfirmed) {
        const edad = confirm.value

        if (edad < 18) {
            swal(`¡Vaya! Parece que eres menor de edad`, `No podrás adquirir estos tickets.`, `info`)
            for (let i = 0; i < botones.length; i++) {
                botones[i].setAttribute("disabled", "disabled");
                botones[i].textContent = "❌";
            }    
        }
    }
  })

  document.addEventListener('DOMContentLoaded', () => {
    import("../utils/utils.js").then(({ onLoad }) => {
        onLoad();
    });
});

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await axios.get("../../user/me");
        const userName = document.querySelector("#welcome");
        userName.textContent = `Bienvenido/a, ${response.data.nombre} ${response.data.apellido}`;
    } catch (error) {
        window.location.href = "../login/login.html";
    }
});

const buttonLogOut = document.querySelector("#logOutButton");
buttonLogOut.addEventListener("click", () => {
    logOut();
    window.location.href = `./login/login.html`
})