"use client";

import { useState } from "react";

export default function SiteControls() {
  const [dark, setDark] = useState(false);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.setAttribute("data-theme", next ? "dark" : "");
  }

  return (
    <div className="controls">
      <button className="ctrl-btn" onClick={toggleTheme} aria-label="Toggle dark mode">
        {dark ? "☀ Light" : "☾ Dark"}
      </button>
    </div>
  );
}
