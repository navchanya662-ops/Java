

const studentName = "Прізвище Ім'я";

const group = "група";

const emoji = "👩‍💻"; 
function generatePageId() {

  const ts = new Date().toISOString().replace(/[-:.TZ]/g, "");

  const rnd = Math.random().toString(36).slice(2, 8).toUpperCase();

  return `LAB1-${ts}-${rnd}`;

}

 

function setBadge(id) {

  const el = document.getElementById("pageIdBadge");

  if (el) {

    el.textContent = `PageID: ${id}`;

    el.setAttribute("data-owner", studentName);

  }

}

 

function setAccentPreview() {

  const preview = document.querySelector(".accent-preview");

  const accent = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();

  if (preview) {

    preview.textContent = accent || "—";

  }

}

 

function helloConsole(id) {


  console.log(`${emoji} Вітаю! Це моя ЛР1. Студент(ка): ${studentName}, група: ${group}. Унікальний ID: ${id}`);

}

 

document.addEventListener("DOMContentLoaded", () => {

  const id = generatePageId();

  setBadge(id);

  setAccentPreview();


  try {

    localStorage.setItem("lab1.pageId", id);

  } catch (_) {

  }

 

  helloConsole(id);

});