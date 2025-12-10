"use strict";

const postsContainer = document.querySelector("#posts");
const statusElement = document.querySelector("#status");
const reloadButton = document.querySelector("#reload-posts");

let state = { status: "idle" };

function renderState() {
    if (!statusElement || !postsContainer)
        return;
    statusElement.textContent = "";
    postsContainer.innerHTML = "";
    if (state.status === "idle") {
        statusElement.textContent =
            "Натисніть «Оновити пости», щоб завантажити дані.";
        return;
    }
    if (state.status === "loading") {
        statusElement.textContent = "Завантаження постів…";
        return;
    }
    if (state.status === "error") {
        statusElement.textContent = state.message;
        return;
    }
    // success
    const posts = state.data;
    statusElement.textContent = `Показано ${posts.length} постів:`;
    posts.forEach((post) => {
        const article = document.createElement("article");
        const title = document.createElement("h3");
        const body = document.createElement("p");
        title.textContent = post.title;
        const previewLength = 120;
        const text = post.body.length > previewLength
            ? post.body.slice(0, previewLength) + "…"
            : post.body;
        body.textContent = text;
        article.appendChild(title);
        article.appendChild(body);
        postsContainer.appendChild(article);
    });
}

async function loadPosts() {
    state = { status: "loading" };
    renderState();
    if (reloadButton)
        reloadButton.disabled = true;
    try {
     
        const posts = await fetchPosts(5);
        state = { status: "success", data: posts };
    }
    catch (_a) {
        state = {
            status: "error",
            message: "Не вдалося завантажити пости. Спробуйте пізніше.",
        };
    }
    if (reloadButton)
        reloadButton.disabled = false;
    renderState();
}

document.addEventListener("DOMContentLoaded", () => {
    renderState();
    if (reloadButton) {
        reloadButton.addEventListener("click", () => {
            void loadPosts();
        });
    }
});
