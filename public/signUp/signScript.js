const getSignUp = async () => {
    try {
        const response = await axios.get("http://localhost:5000/users/signUp");
        response.data.map((User) => {
        })
    } catch (error) {
        console.log(error);
    }
}

getSignUp()