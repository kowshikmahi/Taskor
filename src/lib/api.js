const envUrl = (import.meta.env.VITE_API_URL || "").trim();

let targetUrl = envUrl;

if (import.meta.env.DEV) {
  targetUrl = envUrl || "http://localhost:5000";
} else {
  // In production, if VITE_API_URL is missing or points to stale taskor-2.onrender.com, use live taskor.onrender.com
  if (!envUrl || envUrl.includes("taskor-2.onrender.com")) {
    targetUrl = "https://taskor.onrender.com";
  }
}

// Standardize base URL by removing trailing slash and trailing /api (since service endpoints include /api)
const BASE_URL = targetUrl.replace(/\/$/, "").replace(/\/api$/, "");

async function request(endpoint, options = {}) {
  const token = localStorage.getItem("taskor_token");

  // Ensure endpoint starts with /
  const formattedEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const fullUrl = `${BASE_URL}${formattedEndpoint}`;

  const response = await fetch(fullUrl, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
      ...(options.headers || {}),
    },
  });

  const contentType = response.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await response.json()
    : { message: await response.text() };

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong.");
  }

  return data;
}

export default request;
