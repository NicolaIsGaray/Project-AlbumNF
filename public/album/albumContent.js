const addSong = document.querySelector("#addSong");
const backMain = document.querySelector("#backMain");
const logOut = document.querySelector("#logOut");

const query = window.location.search.split("=");
const idAlbum = query[1]

const redirect = (id, url) => {
  window.location.href = `${url}?album=${id}`;
};

const divSongs = document.getElementById("albumsList")

//Function para renderizar (mostrar) la página.
const renderSongs = (Album) => {
    const oList = document.querySelector("ol");
    const divGroup = document.querySelector(".groupDiv");

    const list = document.createElement("li");
    const spans = document.createElement("span");
    const songLinkButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    const deleteLogo = document.createElement("img");
    const pLine = document.createElement("p");
    const anchorSong = document.createElement("a");
    const logoImg = document.createElement("img");

    spans.classList.add("songTitleBox");
    songLinkButton.classList.add("songsButton")
    deleteButton.classList.add("deleteButton");
    deleteLogo.classList.add("deleteLogo");
    pLine.classList.add("duration");
    logoImg.classList.add("logoImg");
    anchorSong.classList.add("linkSong");

    deleteLogo.setAttribute("src", "../images/icons/deleteIco.png");
    logoImg.setAttribute("src", "../images/icons/youtubeIcon.png");

    const divSongTitle = document.createElement("div");
    const divButtonBkg = document.createElement("div");
    const divDuration = document.createElement("div");

    divSongTitle.classList.add("songTitle")
    divButtonBkg.classList.add("buttonBkg")
    divDuration.classList.add("durationDiv")

    list.appendChild(divGroup);

    divSongTitle.appendChild(list);

    spans.appendChild(divSongTitle);
    deleteButton.appendChild(divSongTitle);
    deleteLogo.appendChild(deleteButton);

    divDuration.appendChild(list);
    pLine.appendChild(divDuration);

    divButtonBkg.appendChild(list);
    songLinkButton.appendChild(divButtonBkg);
    anchorSong.appendChild(songLinkButton);
    logoImg.appendChild(anchorSong);

    spans.textContent = Album.songs.titleSong;
    pLine.textContent = Album.songs.duration;
    anchorSong.setAttribute("src", Album.songs.link);

    songLinkButton.addEventListener("click", () => {
      window.open(Album.link, "_blank");
    })

    oList.appendChild(list)
}

const idSong = query[1]

const getSongs = async () => {
  try {
    const response = await axios.get(`../../album/song/${idSong}`);
      console.log(response);
      response.data.map((Album) => {
      renderSongs(Album)
      })
  } catch (error) {
      console.log(error);;
  }
}

getSongs()

addSong.addEventListener("click", () => {
  redirect(Album._id, "./addSong.html")
})