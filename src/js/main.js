import { getParkData } from "./parkService.mjs";

const parkData = getParkData();

function parkInfoTemplate(info) {
  return `
    <a href="${info.url}" class="hero-banner__title">${info.name}</a>
    <p class="hero-banner__subtitle">
      <span>${info.designation}</span>
      <span>${info.states}</span>
    </p>
  `;
}

function updateDisclaimer(info) {
  const disclaimerLink = document.querySelector(".disclaimer > a");

  disclaimerLink.href = info.url;
  disclaimerLink.innerHTML = info.fullName;
}

function updatePageTitle(info) {
  document.title = info.fullName;
}

function updateHeroImage(info) {
  const heroImage = document.querySelector(".hero-banner img");

  heroImage.src = info.images[0].url;
  heroImage.alt = info.images[0].altText || info.fullName;
}

function updateHeroContent(info) {
  const heroContent = document.querySelector(".hero-banner__content");

  heroContent.innerHTML = parkInfoTemplate(info);
}

updateDisclaimer(parkData);
updatePageTitle(parkData);
updateHeroImage(parkData);
updateHeroContent(parkData);