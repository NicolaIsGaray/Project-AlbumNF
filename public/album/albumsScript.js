// const addAlbum = document.querySelector("#addAlbum");
// const backMain = document.querySelector("#backMain");
// const logOut = document.querySelector("#logOut");

const query = window.location.search.split("=");
const idAlbum = query[1]

const redirect = (id, url) => {
  window.location.href = `${url}?album=${id}`;
};

const divAlbums = document.getElementById("albumsList")

//Function para renderizar (mostrar) la página.
const renderAlbums = (Album) => {
    const div = document.createElement("div");
    const imgAlbum = document.createElement("img");
    div.classList.add("albumSolo")

    let albumImg = Album.urlAlbum;
    imgAlbum.setAttribute("src", albumImg)

    div.appendChild(imgAlbum);
    divAlbums.appendChild(div);
}

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