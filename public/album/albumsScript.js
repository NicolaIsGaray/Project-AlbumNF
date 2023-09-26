console.log("Ayo");

const favoriteRecords = ["album1", "album2", "album3"];
function addFavorites(favorites) {
  const imgs = document.querySelectorAll(".albumSolo img");

  imgs.forEach((img) => {
    if (favorites.includes(img.alt)) {
      const icon = document.createElement("i");
      icon.classList.add("fa-solid");
      icon.classList.add("fa-star");
      icon.classList.add("favorites")
      img.parentNode.appendChild(icon);
      img.parentElement.classList.add("favorite");
    }
  });
}

addFavorites(favoriteRecords)