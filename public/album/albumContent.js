import { onLoad } from "../utils/utils.js"
import { logOut } from "../utils/utils.js";

//[Selección de botones (o acciones) dentro del HTML]
const addSong = document.querySelector("#addSong")
const editAlbum = document.querySelector("#editAlbum");

const query = window.location.search.split("=")
//Al momento de aplicar "split.("="), se transforma en un arreglo (?album=) en la posición 0 y lo que sigue de "=" esta en la posicion 1."
const idAlbum = query[1]

const redirect = async (id, url) => {
  window.location.href = `${url}?album=${id}`
}

//[APARTADO DE RENDERIZADO] /Funcional/
const divSongs = document.getElementById("albumList")

const renderAlbum = (Album) => {
  const divTitle = document.querySelector(".titleDiv");
  const divDiv = document.querySelector(".descDiv");

  divTitle.classList.add("titleDiv");
  divDiv.classList.add("descDiv");

  const albTitle = document.querySelector(".titleC");
  const albDesc = document.querySelector(".classDesc");

  albTitle.textContent = Album.title;
  albDesc.textContent = Album.description;

  //LA JODIDA SOLUCIÓN AL ENVIO DE ID.
  editAlbum.addEventListener("click", () => {
    redirect(Album._id, "./editAlbum.html")
  })

  addSong.addEventListener("click", () => {
    redirect(Album._id, "./addSong.html")
  })
}

//Function para renderizar (mostrar) la página.
const divGroup = document.getElementById("groupDiv");
const olTag = document.querySelector("ol")

const renderSongs = (Album) => {

  console.log(Album._id, "Este es el ID del Album");

    console.log(Album.titleSong, "Este es el titulo de la canción.");
    console.log(Album.duration, "Esto es lo que dura la canción.");

    const list = document.createElement("li");
    const spans = document.createElement("span");
    const songLinkButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    const deleteLogo = document.createElement("img");
    const pLine = document.createElement("p");
    const logoImg = document.createElement("img");

    spans.classList.add("songTitleBox");
    songLinkButton.classList.add("songsButton")
    deleteButton.classList.add("deleteButton");
    deleteLogo.classList.add("deleteLogo");
    pLine.classList.add("duration");
    logoImg.classList.add("logoImg");
    list.classList.add("songList")

    deleteLogo.setAttribute("src", "../images/icons/deleteIco.png");
    logoImg.setAttribute("src", "../images/icons/youtubeIcon.png");

    const divSongTitle = document.createElement("div");
    const divButtonBkg = document.createElement("div");
    const divDuration = document.createElement("div");

    divSongTitle.classList.add("songTitle")
    divButtonBkg.classList.add("buttonBkg")
    divDuration.classList.add("durationDiv")

    spans.textContent = Album.titleSong
    pLine.textContent = Album.duration

    divGroup.appendChild(list) //divGroup toma a list como su hijo.

    list.appendChild(divSongTitle)
    divSongTitle.appendChild(spans)
    divSongTitle.appendChild(deleteButton)
    deleteButton.appendChild(deleteLogo)

    list.appendChild(divDuration)
    divDuration.appendChild(pLine)

    list.appendChild(divButtonBkg)
    divButtonBkg.appendChild(songLinkButton)
    songLinkButton.appendChild(logoImg)

    songLinkButton.addEventListener("click", () => {
      window.open(Album.link, "_blank");
    })
}

const getAlbums = async () => {
  try {
    const response = await axios.get(`../../album/selected/${idAlbum}`);
      console.log(response);
      // Envolver el objeto en un array si no es un array
    const albums = Array.isArray(response.data) ? response.data : [response.data];

    // Ahora puedo usar map
    albums.map((Album) => {
      renderAlbum(Album);
    });

    const songs = response.data.songs;
    songs.map((song, index) => {
      renderSongs(song, index)
    })

    const trash = document.querySelectorAll(".deleteButton");
    for (let i = 0; i < trash.length; i++) {
      trash[i].addEventListener("click", () => {
        deleteSong(idAlbum, songs[i]._id);
      });
    }
  } catch (error) {
      console.log(error);;
  }
}

getAlbums()

const deleteSong = async (album, song) => {
  try {
    const confirmacion = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podras recuperarla.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarla'
    });

    // Verifica la respuesta
    if (!confirmacion.isConfirmed) {
      // Si el usuario hace clic en "Cancelar", no hace nada.
      return;
    }

    // Si el usuario hace clic en "Aceptar", continua con la eliminación.
    await axios.put(`../../album/song/remove/${album}?idSong=${song}`);
    await Swal.fire(
      '¡Eliminado!',
      'La canción ha sido eliminada.',
      'success'
    );
    await axios.put(`../../album/song/remove/${album}?idSong=${song}`);
    olTag.innerHTML = ""; // Limpia la lista actual.
    const response = await axios.get(`../../album/selected/${idAlbum}`);
    const songs = response.data.songs;
    songs.map((song, index) => {
      renderSongs(song, index);
    });
    const trash = document.querySelectorAll(".deleteButton");
    for (let i = 0; i < trash.length; i++) {
      trash[i].addEventListener("click", () => {
        deleteSong(idAlbum, songs[i]._id);
      });
    }

  } catch (error) {
    console.log(error);
  }
};

const buttonLogOut = document.querySelector("#logOutButton");
buttonLogOut.addEventListener("click", () => {
    logOut();
    window.location.href = `../login/login.html`
})

onLoad()