import { parkInfoTemplate, footerTemplate } from "./templates.mjs";


export function enableNavigation() {
  const menuButton = document.querySelector("#global-nav-toggle");
  const globalNav = document.querySelector(".global-nav");

  if (!menuButton || !globalNav) {
    return;
  }

  menuButton.addEventListener("click", () => {
    const isOpen = globalNav.classList.toggle("show");

    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close Menu" : "Open Menu");
  });
}

function setHeaderInfo(data) {
  const disclaimer = document.querySelector(".disclaimer > a");
  disclaimer.href = data.url;
  disclaimer.innerHTML = data.fullName;

  document.querySelector("head > title").textContent = data.fullName;

  const heroImage = document.querySelector(".hero-banner > img");
  const heroContent = document.querySelector(".hero-banner__content");

  if (heroImage) {
    heroImage.src = data.images[0].url;
    heroImage.alt = data.images[0].altText || data.fullName;
  }

  if (heroContent) {
    heroContent.innerHTML = parkInfoTemplate(data);
  }
}

function setFooter(data) {
  const footerEl = document.querySelector("#park-footer");
  footerEl.innerHTML = footerTemplate(data);
}

export default function setHeaderFooter(data) {
  setHeaderInfo(data);
  setFooter(data);
}
