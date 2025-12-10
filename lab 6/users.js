
document.addEventListener("DOMContentLoaded", () => {

    const registerForm = document.getElementById("registerForm");
    const loginForm = document.getElementById("loginForm");

    if (registerForm) {
        registerForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const user = {
                username: document.getElementById("username").value,
                password: document.getElementById("password").value,
                bio: document.getElementById("bio").value,
                gender: document.querySelector('input[name="gender"]:checked').value,
                role: document.getElementById("role").value,
                birthday: document.getElementById("birthday").value
            };

            localStorage.setItem("registeredUser", JSON.stringify(user));

            document.getElementById("result").textContent =
                "Користувача успішно зареєстровано!";
        });
    }

    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const savedUser = JSON.parse(localStorage.getItem("registeredUser"));

            const loginUser = document.getElementById("loginUsername").value;
            const loginPass = document.getElementById("loginPassword").value;

            if (savedUser &&
                loginUser === savedUser.username &&
                loginPass === savedUser.password
            ) {
                const statusEl = document.getElementById("loginStatus");
                statusEl.style.color = "green";
                statusEl.textContent = "Вхід успішний!";
            } else {
                const statusEl = document.getElementById("loginStatus");
                statusEl.style.color = "red";
                statusEl.textContent = "Невірний логін або пароль!";
            }
        });
    }
});
