import { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark" ||
        (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.body.classList.add("bg-gray-900", "text-white"); // Ensures the background updates
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("bg-gray-900", "text-white");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="relative flex items-center p-2 bg-gray-700 dark:bg-gray-900 rounded-full transition duration-300 shadow-md hover:shadow-lg"
      title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      <span className="absolute left-1 transition-transform duration-300 transform scale-90">
        {darkMode ? (
          <FaSun className="text-yellow-400 text-lg animate-pulse" />
        ) : (
          <FaMoon className="text-gray-400 text-lg" />
        )}
      </span>
      <div
        className={`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 
          ${darkMode ? "translate-x-6 bg-yellow-500" : "translate-x-0 bg-gray-300"}`}
      />
    </button>
  );
};

export default DarkModeToggle;
