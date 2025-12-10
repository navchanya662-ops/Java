
const statusEl = document.getElementById("status");
const usersListEl = document.getElementById("usersList");
const loadBtn = document.getElementById("loadBtn");

async function loadData() {
  statusEl.textContent = "Завантаження…";
  statusEl.className = "loading";
  usersListEl.innerHTML = ""; 

  try {
    const response = await fetch("data.json");

    if (!response.ok) {
      throw new Error(`Статус відповіді: ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("Некоректний формат даних (очікувався масив)");
    }

    if (data.length === 0) {
      statusEl.textContent = "Дані завантажено, але список порожній.";
      statusEl.className = "success";
      return;
    }

    data.forEach((user, index) => {
      const tr = document.createElement("tr");

      const tdIndex = document.createElement("td");
      tdIndex.textContent = index + 1;

      const tdName = document.createElement("td");
      tdName.textContent = user.name || "—";

      const tdEmail = document.createElement("td");
      tdEmail.textContent = user.email || "—";

      tr.appendChild(tdIndex);
      tr.appendChild(tdName);
      tr.appendChild(tdEmail);

      usersListEl.appendChild(tr);
    });

    statusEl.textContent = "Успішно завантажено.";
    statusEl.className = "success";
  } catch (error) {
    console.error("Помилка завантаження:", error);
    statusEl.textContent = "Помилка: не вдалося завантажити дані.";
    statusEl.className = "error-message";
  }
}

loadBtn.addEventListener("click", loadData);
