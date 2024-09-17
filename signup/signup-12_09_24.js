const signupButton = document.getElementById("signup-button");
const usernameInput = document.getElementById("username-box");
const passwordInput = document.getElementById("password-box");

function verifyPassword(password) {
    if (password.length > 2 && password.length < 16) {
        return true;
    } else {
        return false;
    }
};

function signup() {
    const username = usernameInput.value
    const password = passwordInput.value
    if (verifyPassword(password) === true) {
        fetch("http://192.168.1.78:5069/signup", {
            method: "POST",
            headers: {
                "username": username,
                "password": password
            }
        })
        .then(response => {
            if (response.ok) {
                console.log('Signup successful:', response.status);
            } else {
                console.log('Signup failed:', response.status);
                alert("Something went wrong.. Try again later")
            }
        })
        .catch(error => console.error('Error:', error));
    } else {
        alert("Password must be between 3 and 15 characters.");
    }
};

signupButton.addEventListener('click', signup);