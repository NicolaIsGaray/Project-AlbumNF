import { onLoad } from "../utils/utils.js"
import { logOut } from "../utils/utils.js";

const addSong = document.querySelector("#addSong");

const query = window.location.search.split("=");
const idAlbum = query[1]
console.log(idAlbum);

const redirect = (id, url) => {
    window.location.href = `${url}?album=${id}`;
  };

function getInputValues() {
    const titleInput = document.querySelector("#albumTitle");
    const dateRelInput = document.querySelector("#diaLanzamiento");
    const descInput = document.querySelector("#desc");
    const imgInput = document.querySelector("#linkImg");

    const titleValue = titleInput.value;
    const dateRelValue = dateRelInput.value;
    const descValue = descInput.value;
    const imgValue = imgInput.value;

    return {
        title: titleValue,
        description: descValue,
        dateRelease: dateRelValue,
        urlAlbum: imgValue
    }
}

let albumId;

const obtainAlbum = async (Album) => {
    try {
        albumId = Album._id;
        console.log(albumId);
    } catch (error) {
        console.log(error);
    }

    addSong.addEventListener("click", () => {
        redirect(Album._id, "./addSong.html")
      })
};

const getAlbums = async () => {
    try {
      const response = await axios.get(`../../album/selected/${idAlbum}`);
        console.log(response);
    
      const albums = Array.isArray(response.data) ? response.data : [response.data];
      albums.map((Album) => {
        obtainAlbum(Album);
      });
    } catch (error) {
        console.log(error);;
    }
  }
  
  getAlbums()

  const updateAlbum = async (e) => {
    e.preventDefault();

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


    const ObjectToUpdate = {
        title,
        description,
        dateRelease,
        urlAlbum
    };

    try {
        await axios.put(`../../album/editAlbum/${idAlbum}`, ObjectToUpdate);

        swal("Successfully Updated!", "success");

        window.location.href = "./albums.html";
    } catch (error) {
        console.log(error);
        swal("Woops! Maybe there was an error.", "error");
    }
};


const confirmUpdateButton = document.querySelector("#send");
confirmUpdateButton.addEventListener("click", (e) => {
    updateAlbum(e);
})

const cancelButton = document.querySelector("#cancel");
cancelButton.addEventListener("click", () => {
    redirect(idAlbum, "./albumContent.html")
})

onLoad()

const buttonLogOut = document.querySelector("#logOutButton");
buttonLogOut.addEventListener("click", () => {
    logOut();
    window.location.href = `./login/login.html`
})