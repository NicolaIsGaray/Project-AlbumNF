import { onLoad } from "../utils/utils.js"

let nombre = prompt("Porfavor, introduzca su nombre.")
let span = document.querySelector("#welcome")

while (nombre.length < 3) {
    nombre = prompt('Demasiado corto. Ingrese al menos 3 caracteres.')
}
span.textContent = `Hola ${nombre}🎫`
alert(`Bienvenido ${nombre} ¿Desea adquirir tickets?🎟`)

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


let edadUsuario = parseInt(prompt("Ingrese su edad."))
const botones = document.querySelectorAll(".ticketButton")

if (edadUsuario < 18) {
    swal(`¡Vaya! Parece que eres menor de edad`, `No podrás adquirir estos tickets.`, `info`)
    for (let i = 0; i < botones.length; i++) {
        botones[i].setAttribute("disabled", "disabled");
        botones[i].textContent = "❌";
    }    
}

onLoad()