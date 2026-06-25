/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        taskor: {
          purple: "#7C3AED",
          blue: "#2563EB",
          green: "#22C55E",
          ink: "#0B1533",
          slate: "#24324A",
          mist: "#E2E8F0",
          cloud: "#F8FAFC",
        },
      },
      backgroundImage: {
        "taskor-gradient": "linear-gradient(135deg, #7C3AED 0%, #2563EB 100%)",
      },
      boxShadow: {
        card: "0 12px 40px rgba(15, 23, 42, 0.08)",
        hover: "0 18px 50px rgba(15, 23, 42, 0.12)",
      },
      borderRadius: {
        btn: "14px",
      },
    },
  },
  plugins: [],
};