const signupButton = document.getElementById("signup-button");
const usernameInput = document.getElementById("username-box");
const passwordInput = document.getElementById("password-box");
let debounce = false;

function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}

function verifyPassword(password) {
    const minLength = 8;
    const maxLength = 128;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasNonalphas = /\W/.test(password);
    return password.length >= minLength &&
           password.length <= maxLength &&
           hasUpperCase &&
           hasLowerCase &&
           hasNumbers &&
           hasNonalphas;
}

function signup() {
    if (debounce) {
        return;
    }
    debounce = true;
    
    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    
    const sanitizedUsername = escapeHTML(username);
    
    if (sanitizedUsername !== username) {
        alert("Username contains invalid characters");
        debounce = false;
        return;
    }
    
    if (verifyPassword(password)) {
        fetch("https://nearby-loon-privately.ngrok-free.app/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: sanitizedUsername,
                password: password // Note: Sending password in body, but still not ideal
            })
        })
        .then(response => {
            if (response.ok) {
                console.log('Signup successful:', response.status);
                alert("Signup successful!");
            } else {
                console.log('Signup failed:', response.status);
                alert("Something went wrong. Please try again later.");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("An error occurred. Please try again.");
        })
        .finally(() => {
            debounce = false;
        });
    } else {
        alert("Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters.");
        debounce = false;
    }
}

signupButton.addEventListener('click', signup);
