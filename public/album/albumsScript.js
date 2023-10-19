import { onLoad } from "../utils/utils.js"
import { logOut } from "../utils/utils.js";

//[Selección de botones (o acciones) dentro del HTML]
const addAlbum = document.querySelector("#addAlbum");
const backMain = document.querySelector("#backMain");

//[TRASPASO DEL ID DEL ALBUM] /Funcional/
const query = window.location.search.split("=");
const idAlbum = query[1]

const redirect = (id, url) => {
  window.location.href = `${url}?album=${id}`;
};

//[APARTADO DE RENDERIZADO]
const divAlbums = document.getElementById("albumsList")

//Function para renderizar (mostrar) la página.
const renderAlbums = (Album) => {
    const deleteButton = document.createElement("button");
    const deleteLogo = document.createElement("img");

    deleteButton.classList.add("deleteButton");
    deleteLogo.classList.add("deleteLogo");

    deleteLogo.setAttribute("src", "../images/icons/deleteIco.png");

    const div = document.createElement("div");
    const imgAlbum = document.createElement("img");
    div.classList.add("albumSolo")

    let albumImg = Album.urlAlbum ? Album.urlAlbum : "../images/albums/default.jpg"
    imgAlbum.setAttribute("src", albumImg)

    div.appendChild(imgAlbum);
    divAlbums.appendChild(div);
    divAlbums.appendChild(deleteButton)
    deleteButton.appendChild(deleteLogo)

    //"Album._id" es funcional aqui.
    //¿Origen?...
    console.log(Album._id);

    div.addEventListener("click", () => {
      redirect(Album._id,`./albumContent.html`)
    })
}

//[OBTENCIÓN DE LOS ALBUMS] /Funcional/
//= Mediante AXIOS =
const getAlbums = async () => {
  try {
    const response = await axios.get(`../../album/showAlbums`);
      response.data.map((Album) => {
      renderAlbums(Album)
      });
      const trash = document.querySelectorAll(".deleteButton");
    for (let i = 0; i < trash.length; i++) {
      trash[i].addEventListener("click", () => {
        deleteAlbum(response.data[i]._id);
      });
    }
  } catch (error) {
      console.log(error);;
  }
}

getAlbums()

const deleteAlbum = async (Album) => {
  try {
    const confirmacion = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podras recuperarlo. Tampoco sus canciones.',
      imageUrl: "https://cdn-icons-png.flaticon.com/512/1466/1466747.png",
      imageWidth: 100,
      imageHeight: 100,
      imageAlt: 'Album Image',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo'
    });

    // Verifica la respuesta
    if (!confirmacion.isConfirmed) {
      // Si el usuario hace clic en "Cancelar", no hace nada.
      return;
    }

    // Si el usuario hace clic en "Aceptar", continua con la eliminación.
    await axios.delete(`../../album/delete/${Album}`);
    await Swal.fire(
      '¡Eliminado!',
      'El album junto a su contenido, ha sido eliminado.',
      'success'
    );
    const trash = document.querySelectorAll(".deleteButton");
    for (let i = 0; i < trash.length; i++) {
      trash[i].addEventListener("click", () => {
        deleteAlbum(idAlbum);
      });
    }
    location.reload()
  } catch (error) {
    console.log(error);
  }
}

const buttonLogOut = document.querySelector("#logOutButton");
buttonLogOut.addEventListener("click", () => {
    logOut();
    window.location.href = `../login/login.html`
})

onLoad()