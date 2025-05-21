import React, { createContext, useState, useEffect, useContext } from 'react';

const PreferencesContext = createContext();



export const PreferencesProvider = ({ children }) => {

    const [tasks, setTasks] = useState(() => {
        const storedTasks = localStorage.getItem("tasks");
        return storedTasks ? JSON.parse(storedTasks) : [];
    });

    const [deadlineMode, setDeadlineMode] = useState(() => {
        return localStorage.getItem("deadlineMode") === "true";
    });

    const [autoCompleteMode, setAutoCompleteMode] = useState(() => {
        return localStorage.getItem("autoCompleteMode") === "true";
    });

    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "synthwave";
    });

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
        localStorage.setItem("deadlineMode", deadlineMode);
        localStorage.setItem("autoCompleteMode", autoCompleteMode);
        localStorage.setItem("theme", theme);
        document.documentElement.setAttribute("data-theme", theme);
    }, [deadlineMode, autoCompleteMode, theme, tasks]);

    const resetPreferences = () => {
        setDeadlineMode(false);
        setAutoCompleteMode(false);
        setTheme("synthwave");
    };
    //replace state functions with custom functions

    //component life cycle

    return (
        <PreferencesContext.Provider
            value={{
                deadlineMode,
                setDeadlineMode,
                autoCompleteMode,
                setAutoCompleteMode,
                theme,
                setTheme,
                resetPreferences,
                tasks,
                setTasks,
            }}
        >
            {children}
        </PreferencesContext.Provider>
    );
};

export const usePreferences = () => useContext(PreferencesContext);
