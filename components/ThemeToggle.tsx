"use client";

import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <button
        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 
              transition-colors duration-200 ease-in-out"
      >
        <div className="relative w-6 h-6">
          {/* Sun icon with fade animation */}
          <div
            className={`absolute inset-0 transform transition-transform duration-200 
                    ${
                      theme !== "dark"
                        ? "scale-0 opacity-0"
                        : "scale-100 opacity-100"
                    }`}
          >
            <Sun className="w-6 h-6 text-amber-500" />
          </div>

          {/* Moon icon with fade animation */}
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 
                transition-colors duration-200 ease-in-out"
      aria-label={
        theme == "dark" ? "Switch to light theme" : "Switch to dark theme"
      }
    >
      <div className="relative w-6 h-6">
        {/* Sun icon with fade animation */}
        <div
          className={`absolute inset-0 transform transition-transform duration-200 
                      ${
                        theme !== "dark"
                          ? "scale-0 opacity-0"
                          : "scale-100 opacity-100"
                      }`}
        >
          <Sun className="w-6 h-6 text-amber-500" />
        </div>

        {/* Moon icon with fade animation */}
        <div
          className={`absolute inset-0 transform transition-transform duration-200 
                      ${
                        theme === "light"
                          ? "scale-100 opacity-100"
                          : "scale-0 opacity-0"
                      }`}
        >
          <Moon className="w-6 h-6 text-blue-400" />
        </div>
      </div>
    </button>
  );
};

export default ThemeToggle;
