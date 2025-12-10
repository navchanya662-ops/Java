import { BREAKPOINTS } from "./breakpoints.js";
const sidebarRaw = document.getElementById("sidebar");
const menuButtonRaw = document.getElementById("menuButton");
if (!(sidebarRaw instanceof HTMLElement) || !(menuButtonRaw instanceof HTMLButtonElement)) {
    console.warn("Елементи #sidebar або #menuButton не знайдено, адаптивна логіка не буде виконана.");
}
else {
    const sidebar = sidebarRaw;
    const menuButton = menuButtonRaw;
    const mqlMobile = window.matchMedia(BREAKPOINTS.mobile);
    const mqlTablet = window.matchMedia(BREAKPOINTS.tablet);
    const mqlDesktop = window.matchMedia(BREAKPOINTS.desktop);
    function applyResponsiveLayout() {
        if (mqlDesktop.matches) {
            // Десктоп
            sidebar.classList.remove("hidden");
            menuButton.classList.add("hidden");
        }
        else if (mqlTablet.matches) {
            // Планшет
            sidebar.classList.remove("hidden");
            menuButton.classList.add("hidden");
        }
        else if (mqlMobile.matches) {
            // Мобільний
            sidebar.classList.add("hidden");
            menuButton.classList.remove("hidden");
        }
    }
    function toggleSidebar() {
        sidebar.classList.toggle("hidden");
    }

    applyResponsiveLayout();

    mqlDesktop.addEventListener("change", applyResponsiveLayout);
    mqlTablet.addEventListener("change", applyResponsiveLayout);
    mqlMobile.addEventListener("change", applyResponsiveLayout);

    menuButton.addEventListener("click", toggleSidebar);
}
