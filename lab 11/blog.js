
const articles = [
    {
        title: "Основи HTML",
        author: "Студент",
        date: "2024-01-05",
        category: "HTML",
        content: "Що таке HTML-документ, теги, атрибути та як браузер читає розмітку."
    },
    {
        title: "Семантичні теги в HTML5",
        author: "Студент",
        date: "2024-01-12",
        category: "HTML",
        content: "Розбираємо теги header, main, article, section та їхню роль у структурі сторінки."
    },
    {
        title: "Робота з формами в HTML",
        author: "Студент",
        date: "2024-01-20",
        category: "HTML",
        content: "input, textarea, select, валідація та базові атрибути для форм."
    },
    {
        title: "CSS: перші кроки зі стилями",
        author: "Студент",
        date: "2024-02-02",
        category: "CSS",
        content: "Підключення CSS, базові селектори, колір, шрифти та відступи."
    },
    {
        title: "CSS-селектори та специфічність",
        author: "Студент",
        date: "2024-02-10",
        category: "CSS",
        content: "Класи, ідентифікатори, комбінатори та як працює пріоритет стилів."
    },
    {
        title: "Гнучкі макети з Flexbox",
        author: "Студент",
        date: "2024-02-18",
        category: "CSS",
        content: "Основні властивості flex-контейнера та flex-елементів для побудови адаптивних макетів."
    },
    {
        title: "CSS Grid: двовимірні сітки",
        author: "Студент",
        date: "2024-03-01",
        category: "CSS",
        content: "Базові поняття grid-контейнера, треки, області та auto-placement."
    },
    {
        title: "Адаптивна верстка та медіа-запити",
        author: "Студент",
        date: "2024-03-12",
        category: "CSS",
        content: "Як зробити сторінку зручною на мобільних, планшетах та десктопах."
    },
    {
        title: "Знайомство з JavaScript",
        author: "Студент",
        date: "2024-03-25",
        category: "JavaScript",
        content: "Перші змінні, типи даних, оператори та базові конструкції керування."
    },
    {
        title: "DOM: як JavaScript бачить сторінку",
        author: "Студент",
        date: "2024-04-05",
        category: "JavaScript",
        content: "Пошук елементів, зміна тексту, атрибутів та стилів через JS."
    },
    {
        title: "Обробка подій у JavaScript",
        author: "Студент",
        date: "2024-04-18",
        category: "JavaScript",
        content: "Клік, наведення, клавіатура — як реагувати на дії користувача."
    },
    {
        title: "Локальне збереження даних: LocalStorage",
        author: "Студент",
        date: "2024-05-01",
        category: "JavaScript",
        content: "Зберігання налаштувань та простих даних користувача у браузері."
    },
    {
        title: "Шаблонні рядки та стрілкові функції",
        author: "Студент",
        date: "2024-05-15",
        category: "JavaScript",
        content: "Сучасний синтаксис ES6 для зручного формування тексту та оголошення функцій."
    },
    {
        title: "Анімації та переходи в CSS",
        author: "Студент",
        date: "2024-05-28",
        category: "CSS",
        content: "transition, keyframes та плавні ефекти без JavaScript."
    },
    {
        title: "Міні-вступ до SPA",
        author: "Студент",
        date: "2024-06-10",
        category: "JavaScript",
        content: "Ідея односторінкових застосунків і роль JavaScript у роботі з інтерфейсом."
    }
];

const postsContainer = document.querySelector("#blog-posts");
const articleCountEl = document.querySelector("#articleCount");
const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#searchBtn");
const paginationEl = document.querySelector("#pagination");

let filteredList = [];
let currentPage = 1;
const pageSize = 3;


const sortByDateDesc = (list) =>
    [...list].sort((a, b) => new Date(b.date) - new Date(a.date));

const renderArticle = ({ title, author, date, category, content }) => `
    <article class="blog-card" data-category="${category}">
        <h3>${title}</h3>
        <p><b>Автор:</b> ${author} | <b>Категорія:</b> ${category}</p>
        <p><i>${new Date(date).toLocaleDateString("uk-UA")}</i></p>
        <p>${content}</p>
    </article>
`;

const countArticles = (list) => list.length;

const getPage = (list, page, size = pageSize) => {
    const start = (page - 1) * size;
    return list.slice(start, start + size);
};

const renderPagination = (list, page) => {
    if (!paginationEl) return;

    const totalPages = Math.ceil(list.length / pageSize);

    if (totalPages <= 1) {
        paginationEl.innerHTML = "";
        return;
    }

    paginationEl.innerHTML = `
        <button class="page-btn" data-action="prev" ${page <= 1 ? "disabled" : ""}>
            Попередня
        </button>
        <span class="page-info">Сторінка ${page} з ${totalPages}</span>
        <button class="page-btn" data-action="next" ${page >= totalPages ? "disabled" : ""}>
            Наступна
        </button>
    `;
};

const renderAll = (listParam, page = 1) => {
    if (!postsContainer || !articleCountEl) return;

    filteredList = listParam;
    currentPage = page;

    const pageItems = getPage(filteredList, currentPage);

    if (pageItems.length === 0) {
        postsContainer.innerHTML = `<p>За запитом нічого не знайдено.</p>`;
    } else {
        postsContainer.innerHTML = pageItems.map(renderArticle).join("");
    }

    articleCountEl.textContent =
        `Усього статей: ${articles.length} | Знайдено: ${filteredList.length} | Показано: ${pageItems.length}`;

    renderPagination(filteredList, currentPage);
};

const filterByCategory = (category) =>
    articles.filter(
        a => a.category.toLowerCase() === category.toLowerCase()
    );

console.log("HTML статті:", filterByCategory("HTML"));
console.log("CSS статті:", filterByCategory("CSS"));
console.log("Всього статей:", countArticles(articles));

const findByTitle = (query) =>
    articles.find(a =>
        a.title.toLowerCase().includes(query.toLowerCase())
    );

console.log("Приклад find за 'JavaScript':", findByTitle("JavaScript"));

const filterBySearch = (query) => {
    const q = query.trim().toLowerCase();
    const base = sortByDateDesc(articles);

    if (!q) return base;

    return base.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        a.content.toLowerCase().includes(q)
    );
};


if (searchInput) {

    searchInput.addEventListener("input", () => {
        const list = filterBySearch(searchInput.value);
        renderAll(list, 1); 
    });
}

if (searchBtn && searchInput) {
    searchBtn.addEventListener("click", () => {
        const list = filterBySearch(searchInput.value);
        renderAll(list, 1);
    });
}
if (paginationEl) {
    paginationEl.addEventListener("click", (e) => {
        const btn = e.target.closest("button[data-action]");
        if (!btn) return;

        if (btn.dataset.action === "prev" && currentPage > 1) {
            renderAll(filteredList, currentPage - 1);
        }

        if (btn.dataset.action === "next") {
            const totalPages = Math.ceil(filteredList.length / pageSize);
            if (currentPage < totalPages) {
                renderAll(filteredList, currentPage + 1);
            }
        }
    });
}
const initialList = sortByDateDesc(articles);
renderAll(initialList, 1);
