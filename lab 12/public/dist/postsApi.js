"use strict";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

async function fetchPosts(limit) {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        const data = await response.json();
        return data.slice(0, limit);
    }
    catch (error) {
        console.error("Помилка під час завантаження постів:", error);
        throw error;
    }
}
