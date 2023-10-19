//[Selección de botones (o acciones) dentro del HTML]
const addAlbum = document.querySelector("#addAlbum");
const backMain = document.querySelector("#backMain");
const logOut = document.querySelector("#logOut");

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
  const deleteAlbum = document.querySelectorAll(".deleteButton") //Ver y acomodar a futuro.

    const div = document.createElement("div");
    const imgAlbum = document.createElement("img");
    div.classList.add("albumSolo")

    let albumImg = Album.urlAlbum ? Album.urlAlbum : "../images/albums/default.jpg"
    imgAlbum.setAttribute("src", albumImg)

    const trashButton = document.createElement("img");
    trashButton.setAttribute("src", "../images/icons/deleteIco.png")
    trashButton.appendChild(div)

    div.appendChild(imgAlbum);
    divAlbums.appendChild(div);

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
      console.log(response);
      response.data.map((Album) => {
      renderAlbums(Album)
      })
  } catch (error) {
      console.log(error);;
  }
}

getAlbums()