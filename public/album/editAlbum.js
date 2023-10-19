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
    e.preventDefault()
    const ObjectToUpdate = getInputValues()
    try {
        await axios.put(`../../album/editAlbum/${idAlbum}`, ObjectToUpdate)
        ? swal(
            "Successfully Updated!",
            "success"
        )
        : swal (
            "Woops! Maybe was a error.",
            "error"
        )
        window.location.href = "./albums.html"
    } catch (error) {
        console.log(error);
    }
}

const confirmUpdateButton = document.querySelector("#send");
confirmUpdateButton.addEventListener("click", (e) => {
    updateAlbum(e);
})