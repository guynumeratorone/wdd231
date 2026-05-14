import { parkInfoTemplate, footerTemplate } from "./templates.mjs";

function setHeaderInfo(data) {
  const disclaimer = document.querySelector(".disclaimer > a");
  disclaimer.href = data.url;
  disclaimer.innerHTML = data.fullName;

  document.querySelector("head > title").textContent = data.fullName;

  const heroImage = document.querySelector(".hero-banner > img");
  heroImage.src = data.images[0].url;
  heroImage.alt = data.images[0].altText || data.fullName;

  document.querySelector(".hero-banner__content").innerHTML =
    parkInfoTemplate(data);
}

function setFooter(data) {
  const footerEl = document.querySelector("#park-footer");
  footerEl.innerHTML = footerTemplate(data);
}

export default function setHeaderFooter(data) {
  setHeaderInfo(data);
  setFooter(data);
}