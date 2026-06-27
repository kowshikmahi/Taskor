const BASE_URL =
import.meta.env.VITE_API_URL ||
"http://localhost:5000/api";

async function request(
  endpoint,
  options = {}
) {
  const token = localStorage.getItem("taskor_token");

  const response = await fetch(
    `${BASE_URL}${endpoint}`,
    {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token && {
          Authorization: `Bearer ${token}`,
        }),
        ...(options.headers || {}),
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Something went wrong."
    );
  }

  return data;
}

export default request;