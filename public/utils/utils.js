const onLoad = async () => {
    try {
      const response = await axios.get("../../user/me");
      const userName = document.querySelector("#userName")
      userName.textContent = `${response.data.nombre} ${response.data.apellido}`;
    } catch (error) {
      window.location.href = "../login/login.html"
    }
  };

  const logOut = async () => {
    try {
      const response = await axios.post("../../user/logOut")
    } catch (error) {
      console.log(error.message);
    }
  }

  export {onLoad, logOut}