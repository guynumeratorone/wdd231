import {
  getParkData,
  getParkAlerts,
  getVisitorCenterData
} from "./parkService.mjs";
import {
  activityTemplate,
  alertTemplate,
  visitorCenterTemplate
} from "./templates.mjs";
import setHeaderFooter, { enableNavigation } from "./setHeaderFooter.mjs";

function setAlerts(alerts) {
  const alertsContainer = document.querySelector(".alerts > ul");
  alertsContainer.innerHTML = "";

  if (alerts.length === 0) {
    alertsContainer.innerHTML = "<li>No current alerts listed.</li>";
    return;
  }

  const html = alerts.map(alertTemplate);
  alertsContainer.insertAdjacentHTML("beforeend", html.join(""));
}

function setVisitorCenters(visitorCenters) {
  const visitorContainer = document.querySelector(".visitor details > ul");
  visitorContainer.innerHTML = "";

  if (visitorCenters.length === 0) {
    visitorContainer.innerHTML = "<li>No visitor centers listed.</li>";
    return;
  }

  const html = visitorCenters.map(visitorCenterTemplate);
  visitorContainer.insertAdjacentHTML("beforeend", html.join(""));
}

function setActivities(activities) {
  const activityContainer = document.querySelector(".activities details > ul");
  activityContainer.innerHTML = "";

  if (activities.length === 0) {
    activityContainer.innerHTML = "<li>No activities listed.</li>";
    return;
  }

  const html = activities.map(activityTemplate);
  activityContainer.insertAdjacentHTML("beforeend", html.join(""));
}

async function init() {
  enableNavigation();

  try {
    const parkData = await getParkData();
    const alerts = await getParkAlerts(parkData.parkCode);
    const visitorCenters = await getVisitorCenterData(parkData.parkCode);

    setHeaderFooter(parkData);
    setAlerts(alerts);
    setVisitorCenters(visitorCenters);
    setActivities(parkData.activities);
  } catch (error) {
    console.error("Current conditions page failed to initialize:", error);
  }
}

init();
