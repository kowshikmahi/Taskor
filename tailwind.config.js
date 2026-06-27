/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    container: {
      center: true,
      padding: "1rem",

      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1200px",
        "2xl": "1400px",
      },
    },

    extend: {
      colors: {
        taskor: {
          purple: "#6366F1",
          blue: "#3B82F6",
          cyan: "#06B6D4",

          green: "#22C55E",

          warning: "#F59E0B",

          danger: "#EF4444",

          ink: "#111827",

          slate: "#64748B",

          mist: "#E2E8F0",

          cloud: "#F8FAFC",

          dark: "#0F172A",

          card: "#FFFFFF",

          border: "#E5E7EB",
        },
      },

      fontFamily: {
        sans: [
          "Inter",
          "sans-serif",
        ],

        heading: [
          "Poppins",
          "sans-serif",
        ],
      },

      backgroundImage: {
        "taskor-gradient":
          "linear-gradient(135deg,#6366F1 0%,#3B82F6 100%)",

        hero:
          "radial-gradient(circle at top left,#dbeafe 0%,transparent 40%), radial-gradient(circle at bottom right,#e0e7ff 0%,transparent 40%)",
      },

      borderRadius: {
        btn: "16px",

        card: "24px",

        section: "36px",
      },

      boxShadow: {
        card: "0 10px 40px rgba(15,23,42,.08)",

        hover: "0 20px 60px rgba(15,23,42,.12)",

        glass: "0 8px 32px rgba(31,38,135,.12)",

        button: "0 8px 20px rgba(99,102,241,.25)",
      },

      backdropBlur: {
        xs: "2px",

        glass: "18px",
      },

      transitionTimingFunction: {
        smooth: "cubic-bezier(.4,0,.2,1)",
      },

      animation: {
        float: "float 6s ease-in-out infinite",

        fade: "fade .6s ease",

        blob: "blob 12s infinite",

        shine: "shine 2s linear infinite",

        pulseSlow: "pulse 4s infinite",
      },

      keyframes: {
        float: {
          "0%,100%": {
            transform: "translateY(0px)",
          },

          "50%": {
            transform: "translateY(-12px)",
          },
        },

        fade: {
          from: {
            opacity: 0,
            transform: "translateY(20px)",
          },

          to: {
            opacity: 1,
            transform: "translateY(0px)",
          },
        },

        blob: {
          "0%": {
            transform: "translate(0px,0px) scale(1)",
          },

          "33%": {
            transform: "translate(30px,-40px) scale(1.1)",
          },

          "66%": {
            transform: "translate(-20px,20px) scale(.95)",
          },

          "100%": {
            transform: "translate(0px,0px) scale(1)",
          },
        },

        shine: {
          "0%": {
            backgroundPosition: "-200% center",
          },

          "100%": {
            backgroundPosition: "200% center",
          },
        },
      },
    },
  },

  plugins: [],
};