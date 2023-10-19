const onLoad = async () => {
    try {
      const response = await axios.get("../../../../me");
      username.textContent = `${response.data.nombre} ${response.data.apellido}`;
    } catch (error) {
      window.location.href = "../Login/index.html";
    }
  };