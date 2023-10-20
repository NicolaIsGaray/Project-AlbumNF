import { onLoad } from "../utils/utils.js"

function getInputValues() {
    const albumTitleInput = document.querySelector("#albumTitle");
    const releaseDateInput = document.querySelector("#releaseDate");
    const descriptionInput = document.querySelector("#desc");
    const albumImgInput = document.querySelector("#linkImg");

    const albumTitleValue = albumTitleInput.value;
    const releaseDateValue = releaseDateInput.value;
    const descriptionValue = descriptionInput.value;
    const albumImgValue = albumImgInput.value;

    return {
        title: albumTitleValue,
        description: descriptionValue,
        dateRelease: releaseDateValue,
        urlAlbum: albumImgValue
    }
}

const albumRegister = async (e) => {
    e.preventDefault ()
    const { title, description, dateRelease, urlAlbum } = getInputValues();
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

    if (!title || !dateRelease || !description) {
        swal({
            title: "Porfavor, completa los campos vacios.",
            icon: 'warning'
        });
        return;
    }

    if (urlAlbum && urlAlbum.length >= 1){
        if (!urlRegex.test(urlAlbum)) {
            swal({
                title: "Por favor, ingresa una URL válida.",
                icon: 'warning'
            });
            return;
        }
    } 

    const ObjectToSend = {
        title,
        description,
        dateRelease,
        urlAlbum
    };

    try {
        await axios.post("../../album/addAlbum", ObjectToSend)
        window.location.href = "./albums.html"
    } catch (error) {
        console.log(error);
    }
} 

const buttonAdd = document.querySelector("#addAlbumButton")
buttonAdd.addEventListener("click", (e) => {
    albumRegister(e);
})

onLoad()