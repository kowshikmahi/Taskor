const configuredBaseUrl = import.meta.env.VITE_API_URL;
const fallbackBaseUrl = import.meta.env.DEV ? "http://localhost:5000/api" : "";
const BASE_URL = (configuredBaseUrl || fallbackBaseUrl).replace(/\/$/, "");

async function request(endpoint, options = {}) {
  if (!BASE_URL) {
    throw new Error("Frontend is missing VITE_API_URL. Set it to your deployed Render API URL ending with /api.");
  }

  const token = localStorage.getItem("taskor_token");

  const response = await fetch(`${BASE_URL}${endpoint}`, {
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
