function mainMenuHandler(ev) {
  const menuButton = ev.currentTarget;
  const globalNav = document.querySelector(".global-nav");

  if (!globalNav) {
    return;
  }

  const isOpen = globalNav.classList.toggle("show");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Close Menu" : "Open Menu");
}

function subMenuHandler(ev) {
  const toggle = ev.currentTarget;
  const listItem = toggle.closest("li");
  const submenu = listItem?.querySelector(".global-nav__submenu");

  if (!submenu) {
    return;
  }

  const isOpen = submenu.classList.toggle("show");
  toggle.setAttribute("aria-expanded", String(isOpen));
  toggle.querySelector(".icon")?.classList.toggle("rotate", isOpen);
}

export default function enableNavigation() {
  const menuButton = document.querySelector("#global-nav-toggle");
  const subMenuToggles = document.querySelectorAll(
    ".global-nav__split-button__toggle"
  );

  if (menuButton && !menuButton.dataset.navEnabled) {
    menuButton.addEventListener("click", mainMenuHandler);
    menuButton.dataset.navEnabled = "true";
  }

  subMenuToggles.forEach((toggle) => {
    if (toggle.dataset.navEnabled) {
      return;
    }

    toggle.setAttribute("aria-expanded", "false");
    toggle.addEventListener("click", subMenuHandler);
    toggle.dataset.navEnabled = "true";
  });
}
