var usernameInput = document.getElementById("username")
var passwordInput = document.getElementById("password")
var loginButton = document.getElementById("login-button")

function login() {
    if (usernameInput.value == "") {
        alert("Username field is required")
        return
    }

    if (passwordInput.value == "") {
        alert("Password field is required")
        return
    }

    fetch("https://nearby-loon-privately.ngrok-free.app/login", {
        method: "POST",
        headers: {
            "username": usernameInput.value,
            "password": passwordInput.value
        }
    })
    .then(response => response.json())
    .then(response => console.log(response.message))
    .catch(err => console.log(err))
}

loginButton.addEventListener('click', login)
