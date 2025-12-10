"use strict";
const titleInput = document.getElementById("title");
const bodyInput = document.getElementById("body");
const categoryInput = document.getElementById("category");
const addPostBtn = document.getElementById("addPost");
const clearPostsBtn = document.getElementById("clearPosts");
const postsCounter = document.getElementById("postsCounter");
const userPosts = [];
function postToArticle(post, rawCategory) {
    const normalizedCategory = rawCategory.trim() || "User";
    return {
        title: post.title,
        author: "Користувач",
        date: post.createdAt.toISOString().slice(0, 10),
        category: normalizedCategory,
        content: post.body,
        isUser: true
    };
}
function updateCounter() {
    if (!postsCounter)
        return;
    postsCounter.textContent = `Усього постів (доданих з форми): ${userPosts.length}`;
}
function handleAddPost(event) {
    event.preventDefault();
    if (!titleInput || !bodyInput) {
        console.error("Не знайдені поля title або body");
        return;
    }
    const title = titleInput.value.trim();
    const body = bodyInput.value.trim();
    const category = categoryInput ? categoryInput.value.trim() : "";
    if (!title || !body) {
        return;
    }
    const post = {
        id: Date.now(),
        title,
        body,
        createdAt: new Date()
    };
    userPosts.push(post);
    const article = postToArticle(post, category);
    articles.push(article);
    const sorted = typeof sortByDateDesc === "function"
        ? sortByDateDesc(articles)
        : articles;
    renderAll(sorted, 1);
    titleInput.value = "";
    bodyInput.value = "";
    if (categoryInput) {
        categoryInput.value = "";
    }
    updateCounter();
}
function clearUserPosts(event) {
    event.preventDefault();
    for (let i = articles.length - 1; i >= 0; i--) {
        if (articles[i].isUser) {
            articles.splice(i, 1);
        }
    }
    userPosts.length = 0;
    const sorted = typeof sortByDateDesc === "function"
        ? sortByDateDesc(articles)
        : articles;
    renderAll(sorted, 1);
    updateCounter();
}
function init() {
    if (!addPostBtn ||
        !clearPostsBtn ||
        !titleInput ||
        !bodyInput ||
        !postsCounter) {
        console.error("Не знайдено один із елементів форми блогу");
        return;
    }
    if (!categoryInput) {
        console.warn("Поле категорії не знайдено, тема буде 'User'");
    }
    addPostBtn.addEventListener("click", handleAddPost);
    clearPostsBtn.addEventListener("click", clearUserPosts);
    updateCounter();
}
init();
