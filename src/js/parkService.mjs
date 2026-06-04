const baseUrl = "https://developer.nps.gov/api/v1/";
const apiKey = import.meta.env.VITE_NPS_API_KEY;
const parkCode = "yell";

const parkInfoLinks = [
  {
    name: "Current Conditions &#x203A;",
    link: "conditions.html",
    image: "",
    description:
      "See what conditions to expect in the park before leaving on your trip!"
  },
  {
    name: "Fees and Passes &#x203A;",
    link: "fees.html",
    image: "",
    description: "Learn about the fees and passes that are available."
  },
  {
    name: "Visitor Centers &#x203A;",
    link: "visitor_centers.html",
    image: "",
    description: "Learn about the visitor centers in the park."
  }
];

async function getJson(url) {
  const separator = url.includes("?") ? "&" : "?";
  const requestUrl = `${baseUrl}${url}${separator}api_key=${apiKey}`;

  const response = await fetch(requestUrl);

  if (response.ok) {
    return await response.json();
  }

  const errorData = await response.json();
  throw new Error(errorData.error?.message || "response not ok");
}

export async function getParkData() {
  const parkData = await getJson(`parks?parkCode=${parkCode}`);
  return parkData.data[0];
}

export async function getParkAlerts(parkCode) {
  const alerts = await getJson(`alerts?parkCode=${parkCode}`);
  return alerts.data;
}

export async function getVisitorCenterData(parkCode) {
  const visitorCenters = await getJson(`visitorcenters?parkCode=${parkCode}`);
  return visitorCenters.data;
}

export function getInfoLinks(data) {
  return parkInfoLinks.map((item, index) => {
    return {
      ...item,
      image: data[index + 2]?.url || data[index]?.url || ""
    };
  });
}
