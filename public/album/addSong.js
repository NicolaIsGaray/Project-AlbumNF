const query = window.location.search.split("=");
const idSong = query[1]

const redirect = (id) => {
    window.location.href = `./albumContent.html?album=${id}`;
  };

function getInputValues () {
    const titleInput = document.querySelector("#songTitle");
    const durationInput = document.querySelector("#duration");
    const songLinkInput = document.querySelector("#songLink");

    const titleValue = titleInput.value;
    const durationValue = durationInput.value;
    const songLinkValue = songLinkInput.value;

    return {
        titleSong: titleValue,
        duration: durationValue,
        link: songLinkValue
    }
}

const songRegister = async (e) => {
    e.preventDefault();
    const ObjectToSend = getInputValues()
    try {
        await axios.put(`../../album/songAdd/${idSong}`, ObjectToSend);
        window.location.href = "./albums.html"
    } catch (error) {
        console.log(error);
    }
}

const buttonAddSong = document.querySelector("#send");
buttonAddSong.addEventListener("click", (e) => {
    songRegister(e);
})