import { onLoad } from "../utils/utils.js"
import { logOut } from "../utils/utils.js";

const urlParams = new URLSearchParams(window.location.search);
const idAlbum = urlParams.get('album');

if (!idAlbum) {
  alert("Error.");
}
console.log('ID del álbum:', idAlbum);

const redirect = (id) => {
    window.location.href = `./albumContent.html?album=${id}`;
  };

function getInputValues () {
    const titleInput = document.querySelector("#songTitle");
    const durationInput = document.querySelector("#duration");
    const songLinkInput = document.querySelector("#songLink");

    const titleValue = titleInput.value;
    const durationValue = durationInput.value;
    const songLinkValue = songLinkInput.value;

    return {
        titleSong: titleValue,
        duration: durationValue,
        link: songLinkValue
    }
}

const getAlbums = async () => {
    try {
        const { data } = await axios.get(`../../album/selected/${idAlbum}`);
        album = data;
        return album
    } catch (error) {
        console.log(error);
    }
}

getAlbums()

const songRegister = async (e) => {
    e.preventDefault();
    const { titleSong, duration, link} = getInputValues();
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

    if (!titleSong || !duration || !link) {
        swal({
            title: "Porfavor, completa los campos vacios.",
            icon: 'warning'
        });
        return;
    }

    if (link && link.length >= 1){
        if (!urlRegex.test(link)) {
            swal({
                title: "Por favor, ingresa una URL válida.",
                icon: 'warning'
            });
            return;
        }
    } 

    const ObjectToSend = {
        titleSong,
        duration,
        link
    };
    try {
        await axios.put(`../../album/song/add/${idAlbum}`, ObjectToSend);
        await swal({
            title: "Canción Añadida Correctamente.",
            icon: "success"
        })
        redirect(idAlbum)
    } catch (error) {
        console.log(error);
    }
}

const buttonAddSong = document.querySelector("#send");
buttonAddSong.addEventListener("click", (e) => {
    songRegister(e);
})

const cancelButton = document.querySelector("#cancel");
cancelButton.addEventListener("click", () => {
    redirect(idAlbum)
})

onLoad()

const buttonLogOut = document.querySelector("#logOutButton");
buttonLogOut.addEventListener("click", () => {
    logOut();
    window.location.href = `./login/login.html`
})