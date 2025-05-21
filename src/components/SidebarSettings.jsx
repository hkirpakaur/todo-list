import React, { useState, useEffect } from 'react';
import { usePreferences } from '../context/PreferencesContext';

const SidebarSettings = ({ deadlineMode, setDeadlineMode, autoCompleteMode, setAutoCompleteMode }) => {
  const { theme, setTheme } = usePreferences();

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "synthwave" : "light"));
  };

  const resetDefaults = () => {
    setDeadlineMode(false);
    setAutoCompleteMode(false);
    setTheme("synthwave");
    localStorage.setItem("deadlineMode", "false");
    localStorage.setItem("autoCompleteMode", "false");
    localStorage.setItem("theme", "synthwave");
  };


  return (
    <div className="card h-60 w-75 bg-base-100 card-md shadow-sm">
      <div className="card-body">
        <h2 className="card-title">⚙️ Settings</h2>
        <h1></h1>
        {/* Theme Toggle */}
        <label className="flex cursor-pointer gap-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <circle cx="12" cy="12" r="5" />
            <path
              d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
          </svg>
          <input
            type="checkbox"
            className="toggle toggle-primary"
            checked={theme === "synthwave"}
            onChange={toggleTheme}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg> {/* moon icon */}
        </label>

        {/* Deadline Mode */}
        <div className="form-control">
          <label className="label cursor-pointer justify-between">
            <span className="label-text">Deadline Mode</span>
            <input
              type="checkbox"
              className="toggle toggle-primary"
              checked={deadlineMode}
              onChange={(e) => setDeadlineMode(e.target.checked)}
            />
          </label>
        </div>

        {/* Auto-Complete Mode */}
        <div className="form-control">
          <label className="label cursor-pointer justify-between">
            <span className="label-text">Auto-Complete</span>
            <input
              type="checkbox"
              className="toggle toggle-primary"
              onChange={(e) => setAutoCompleteMode(e.target.checked)}
              checked={autoCompleteMode}

            />
          </label>
        </div>
        <h1></h1>
        <button className="btn btn-soft btn-error w=5" onClick={resetDefaults}>Reset Settings</button>
      </div>
    </div>
  );
};

export default SidebarSettings;
