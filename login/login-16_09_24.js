const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginButton = document.getElementById("login-button");

const debounce = (() => {
    let isDebouncing = false;
    return {
        set: () => { isDebouncing = true; },
        reset: () => { isDebouncing = false; },
        isActive: () => isDebouncing
    };
})();

async function login() {
    if (debounce.isActive()) {
        return;
    }
    debounce.set();

    try {
        if (!usernameInput.value.trim()) {
            throw new Error("Username field is required");
        }
        if (!passwordInput.value) {
            throw new Error("Password field is required");
        }

        const response = await fetch("https://nearby-loon-privately.ngrok-free.app/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: usernameInput.value.trim(),
                password: passwordInput.value
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data.message);
    } catch (error) {
        console.error("Login error:", error.message);
        alert(error.message);
    } finally {
        debounce.reset();
    }
}

loginButton.addEventListener('click', login);

document.querySelector('form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    login();
});
