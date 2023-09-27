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
        const response = await axios.get("/albums/allAlbum");
        response.data.map((Album) => {
        renderAlbums(Album)
        })
    } catch (error) {
        swal('Vaya!', 'Parece que ha habido un problema al cargar tu album. Porfavor, intenta denuevo.', 'error');
    }
}

getAlbums()