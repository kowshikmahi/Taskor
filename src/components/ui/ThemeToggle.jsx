import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export default function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl border border-white/55 bg-white/65 text-[var(--text)] shadow-sm backdrop-blur transition hover:border-taskor-purple hover:text-taskor-purple dark:bg-white/10 sm:h-11 sm:w-11 ${className}`}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Light mode" : "Dark mode"}
    >
      {isDark ? <Sun size={19} /> : <Moon size={19} />}
    </button>
  );
}
