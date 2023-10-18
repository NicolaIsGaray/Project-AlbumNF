// innerHTML = Cambia la etiqueta

//Manipular Atributos
//getAttribute = Se obtiene el valor de un atributo. Ej. img.getAttribute("src").
//setAttribute = Se cambia el valor de un atributo. Ej img.setAttribute("src = 'nueva'").

const getAlbums = async (res) => {
    try {
        let response = await axios.get("../../album/showAlbums");
        res.status(200).send(response)
    } catch (error) {
        console.log(error);
    }
}

getAlbums()