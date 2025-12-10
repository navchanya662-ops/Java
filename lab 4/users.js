
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
                document.getElementById("loginStatus").style.color = "green";
                document.getElementById("loginStatus").textContent = "Вхід успішний!";
            } else {
                document.getElementById("loginStatus").style.color = "red";
                document.getElementById("loginStatus").textContent =
                    "Невірний логін або пароль!";
            }
        });
    }
});
