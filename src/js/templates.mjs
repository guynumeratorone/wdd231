export function parkInfoTemplate(info) {
  return `
    <a href="${info.url}" class="hero-banner__title">${info.name}</a>
    <p class="hero-banner__subtitle">
      <span>${info.designation}</span>
      <span>${info.states}</span>
    </p>
  `;
}

export function mediaCardTemplate(info) {
  return `
    <div class="media-card">
      <a href="${info.link}">
        <img src="${info.image}" alt="${info.name}" class="media-card__img">
        <h3 class="media-card__title">${info.name}</h3>
      </a>
      <p>${info.description}</p>
    </div>
  `;
}

function getMailingAddress(addresses) {
  return addresses.find((address) => address.type === "Mailing") || addresses[0];
}

function getVoicePhone(contacts) {
  const phoneNumbers = Array.isArray(contacts)
    ? contacts[0]?.phoneNumbers
    : contacts?.phoneNumbers;

  const voice = phoneNumbers?.find((number) => number.type === "Voice");
  return voice?.phoneNumber || "No phone number listed";
}

export function footerTemplate(info) {
  const mailing = getMailingAddress(info.addresses);
  const voice = getVoicePhone(info.contacts);

  return `
    <section class="contact">
      <h3>Contact Info</h3>
      <h4>Mailing Address:</h4>
      <div>
        <p>${mailing.line1}</p>
        <p>${mailing.city}, ${mailing.stateCode} ${mailing.postalCode}</p>
      </div>
      <h4>Phone:</h4>
      <p>${voice}</p>
    </section>
  `;
}

export function alertTemplate(alert) {
  let alertType = alert.category.toLowerCase();

  if (alert.category === "Park Closure") {
    alertType = "closure";
  }

  return `<li class="alert">
    <svg class="icon" focusable="false" aria-hidden="true">
      <use xlink:href="/images/sprite.symbol.svg#alert-${alertType}"></use>
    </svg>
    <div>
      <h3 class="alert-${alertType}">${alert.title}</h3>
      <p>${alert.description}</p>
    </div>
  </li>`;
}

function getTodayHours(center) {
  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday"
  ];
  const today = days[new Date().getDay()];
  const standardHours = center.operatingHours?.[0]?.standardHours;

  return standardHours?.[today] || "Hours not listed";
}

function getOpenStatus(hours) {
  if (hours.toLowerCase().includes("closed")) {
    return "Closed today";
  }

  if (hours === "Hours not listed") {
    return "Hours not listed";
  }

  return "Open today";
}

export function visitorCenterTemplate(center) {
  const hours = getTodayHours(center);
  const openStatus = getOpenStatus(hours);
  const description = center.description || "No description available.";
  const directions = center.directionsInfo || "No directions listed.";

  return `<li class="visitor-card">
    <h3>${center.name}</h3>
    <p class="hours-status">${openStatus}: ${hours}</p>
    <p>${description}</p>
    <p>${directions}</p>
  </li>`;
}

export function activityTemplate(activity) {
  return `<li>${activity.name}</li>`;
}
