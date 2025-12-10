"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const USERS_KEY = "users";              
    const CURRENT_KEY = "currentUserEmail"; 
    const getUsers = () => {
        try {
            const raw = localStorage.getItem(USERS_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch (e) {
            console.error("Помилка читання USERS_KEY", e);
            return [];
        }
    };

    const saveUsers = (users) => {
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
    };

    const getCurrentUserEmail = () => localStorage.getItem(CURRENT_KEY);

    const setCurrentUserEmail = (email) => {
        localStorage.setItem(CURRENT_KEY, email);
    };

    const clearCurrentUserEmail = () => {
        localStorage.removeItem(CURRENT_KEY);
    };

    const getCurrentUser = () => {
        const email = getCurrentUserEmail();
        if (!email) return null;
        return getUsers().find((u) => u.email === email) || null;
    };
    const navLoginLink = document.querySelector("#linkLogin");
    const navRegisterLink = document.querySelector("#linkRegister");
    const navUserInfo = document.querySelector("#userInfo");
    const navLogoutBtn = document.querySelector("#logoutGlobal");

    const updateHeaderAuthUI = () => {
        if (!navUserInfo || !navLogoutBtn) return;

        const user = getCurrentUser();

        if (user) {
            navUserInfo.textContent = `Привіт, ${user.name || user.email}!`;
            navLogoutBtn.hidden = false;
            if (navLoginLink) navLoginLink.hidden = true;
            if (navRegisterLink) navRegisterLink.hidden = true;
        } else {
            navUserInfo.textContent = "";
            navLogoutBtn.hidden = true;
            if (navLoginLink) navLoginLink.hidden = false;
            if (navRegisterLink) navRegisterLink.hidden = false;
        }
    };

    if (navLogoutBtn) {
        navLogoutBtn.addEventListener("click", () => {
            clearCurrentUserEmail();
            updateHeaderAuthUI();
        });
    }

    updateHeaderAuthUI();
    const registerForm = document.querySelector("#registerForm");

    if (registerForm) {
        const nameInput = document.querySelector("#regName");
        const emailInput = document.querySelector("#regEmail");
        const passwordInput = document.querySelector("#regPassword");
        const confirmInput = document.querySelector("#regConfirm");
        const resultEl = document.querySelector("#result");

        const nameError = document.querySelector("#error-name");
        const emailError = document.querySelector("#error-email");
        const passwordError = document.querySelector("#error-password");
        const confirmError = document.querySelector("#error-confirm");

        const setError = (input, errorEl, message) => {
            if (!input || !errorEl) return;
            input.classList.toggle("invalid", Boolean(message));
            input.classList.toggle("valid", !message);
            errorEl.textContent = message;
        };

        const validateRegisterForm = () => {
            
            let ok = true;

            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const pass = passwordInput.value;
            const conf = confirmInput.value;

            if (!name) {
                setError(nameInput, nameError, "Ім'я не може бути порожнім.");
                ok = false;
            } else if (name.length < 2) {
                setError(nameInput, nameError, "Ім'я має містити хоча б 2 символи.");
                ok = false;
            } else {
                setError(nameInput, nameError, "");
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email) {
                setError(emailInput, emailError, "Введіть Email.");
                ok = false;
            } else if (!emailPattern.test(email)) {
                setError(emailInput, emailError, "Некоректний Email (user@example.com).");
                ok = false;
            } else {
                setError(emailInput, emailError, "");
            }

            if (!pass) {
                setError(passwordInput, passwordError, "Введіть пароль.");
                ok = false;
            } else if (pass.length < 6) {
                setError(
                    passwordInput,
                    passwordError,
                    "Пароль має містити мінімум 6 символів."
                );
                ok = false;
            } else {
                setError(passwordInput, passwordError, "");
            }

            if (!conf) {
                setError(confirmInput, confirmError, "Повторіть пароль.");
                ok = false;
            } else if (conf !== pass) {
                setError(confirmInput, confirmError, "Паролі не співпадають.");
                ok = false;
            } else {
                setError(confirmInput, confirmError, "");
            }

            return ok;
        };
            [nameInput, emailInput, passwordInput, confirmInput].forEach((input) => {
                if (!input) return;
                input.addEventListener("input", () => {
                validateRegisterForm();  
            });
            });
        registerForm.addEventListener("submit", (e) => {
            e.preventDefault();

            if (!validateRegisterForm()) return;

            const users = getUsers();
            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const password = passwordInput.value;

            const exists = users.some((u) => u.email === email);
            if (exists) {
                setError(
                    emailInput,
                    emailError,
                    "Користувач з таким Email уже існує."
                );
                return;
            }

            const newUser = {
                id: Date.now(),
                name,
                email,
                password,
                registeredAt: new Date().toISOString()
            };

            users.push(newUser);
            saveUsers(users);
            setCurrentUserEmail(email); 
            if (resultEl) {
                resultEl.textContent =
                    "Реєстрація успішна! Перехід на головну сторінку…";
            }

            updateHeaderAuthUI();

            setTimeout(() => {
                window.location.href = "Index.html";
            }, 1000);
        });
    }

    const loginForm = document.querySelector("#loginForm");

    if (loginForm) {
        const emailInput = document.querySelector("#loginEmail");
        const passwordInput = document.querySelector("#loginPassword");
        const emailError = document.querySelector("#login-error-email");
        const passwordError = document.querySelector("#login-error-password");
        const statusEl = document.querySelector("#loginStatus");

        const setLoginError = (input, errorEl, message) => {
            if (!input || !errorEl) return;
            input.classList.toggle("invalid", Boolean(message));
            errorEl.textContent = message;
        };

        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const email = emailInput.value.trim();
            const pass = passwordInput.value;
            let ok = true;

            if (!email) {
                setLoginError(emailInput, emailError, "Введіть Email.");
                ok = false;
            } else {
                setLoginError(emailInput, emailError, "");
            }

            if (!pass) {
                setLoginError(passwordInput, passwordError, "Введіть пароль.");
                ok = false;
            } else {
                setLoginError(passwordInput, passwordError, "");
            }

            if (!ok) return;

            const users = getUsers();
            const user = users.find(
                (u) => u.email === email && u.password === pass
            );

            if (!user) {
                if (statusEl) {
                    statusEl.textContent = "Невірний Email або пароль.";
                }
                return;
            }

            setCurrentUserEmail(user.email);
            updateHeaderAuthUI();

            if (statusEl) {
                statusEl.textContent =
                    "Вхід успішний! Перехід на головну сторінку…";
            }

            setTimeout(() => {
                window.location.href = "Index.html";
            }, 800);
        });
    }
    const usersTableBody = document.querySelector("#usersTableBody");
    const usersEmptyEl = document.querySelector("#usersEmpty");

    if (usersTableBody) {
        const users = getUsers();

        if (!users.length) {
            if (usersEmptyEl) {
                usersEmptyEl.textContent = "Ще немає жодного зареєстрованого користувача.";
            }
        } else {
            users.forEach((user, index) => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
          <td>${index + 1}</td>
          <td>${user.name || "(без імені)"}</td>
          <td>${user.email}</td>
        `;
                usersTableBody.appendChild(tr);
            });
        }
    }
});
