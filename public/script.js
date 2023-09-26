//Manipular Texto
// textContent = Cambia texto
// innerHTML = Cambia la etiqueta

//Manipular Atributos
//getAttribute = Se obtiene el valor de un atributo. Ej. img.getAttribute("src").
//setAttribute = Se cambia el valor de un atributo. Ej img.setAttribute("src = 'nueva'").

const divAlbums = document.querySelector(".albums")

const renderAlbums = () => {
    const div = document.createElement("div");
    const imgAlbum = document.createElement("img");
    div.classList.add("album")

    let urlAlbumImg = Album.urlAlbum
    imgAlbum.setAttribute("src", urlAlbumImg)

    div.appendChild(imgAlbum);
    divAlbums.appendChild(div);
}

const getAlbums = async () => {
    try {
        const response = await axios.get("http://localhost:5000/albums/allAlbums");
        response.data.map((Album) => {
        renderAlbums(Album)
        })
    } catch (error) {
        console.log(error);
    }
}

getAlbums()