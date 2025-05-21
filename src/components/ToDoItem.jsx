import React from 'react';
import TodoList from './ToDoList';
import { useState } from 'react';
import { usePreferences } from '../context/PreferencesContext';



const ToDoItem = ({ task, onDelete, onEdit, onView, onToggle }) => {
    const { tasks, setTasks, deadlineMode, setDeadlineMode, autoCompleteMode, setAutoCompleteMode, theme, setTheme, resetPreferences } = usePreferences();
    const [taskToDelete, setTaskToDelete] = useState(null);
    const formattedDeadline = task.deadline
        ? new Date(task.deadline).toLocaleString()
        : "No deadline";

    return (
        <ul className="list bg-base-100 shadow-md mb-4 w-full rounded-lg">
            <li className="min-w-200 flex items-center gap-4 p-4 border-b last:border-b-0">
                {/* Checkbox */}
                <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    onChange={() => onToggle(task.id)}
                    checked={task.completed}

                />
                <div className="flex-grow">
                    <h3
                        className={`font-semibold text-lg ${task.completed ? "line-through text-gray-500" : ""
                            } ${deadlineMode && new Date(task.deadline) < Date.now() && !task.completed ? "text-red-500" : ""}`}
                    >
                        {task.text || "Untitled Task"}
                    </h3>
                    {deadlineMode && (
                        <p className={`text-sm text-gray-500  ${deadlineMode && new Date(task.deadline) < Date.now() && !task.completed ? "text-red-500" : ""}`}>{formattedDeadline}</p>
                    )}
                </div>
                {/* Dropdown Menu */}
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-sm btn-outline">
                        ⋮
                    </label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40">
                        <li>
                            <button className="btn btn-sm btn-outline" onClick={() => onView(task)}>View</button>
                        </li>
                        <li>
                            <button className="btn btn-sm btn-primary" onClick={() => onEdit(task)}>Edit</button>
                        </li>
                        <li>
                            <button className="btn btn-sm btn-error" onClick={() => setTaskToDelete(task)}>
                                Delete
                            </button>
                        </li>
                    </ul>
                </div>
            </li>
            {taskToDelete && (
                <div className="modal modal-open">
                    <div className="modal-box bg-base-100">
                        <h3 className="font-bold text-lg">Delete Task?</h3>
                        <p className="py-4">
                            Are you sure you want to delete the task: <strong>{taskToDelete.text}</strong>?
                        </p>
                        <div className="modal-action">
                            <button
                                className="btn btn-error"
                                onClick={() => {
                                    onDelete(task.id);
                                    setTaskToDelete(null);
                                }}
                            >
                                Confirm
                            </button>
                            <button className="btn" onClick={() => setTaskToDelete(null)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </ul>
    );
};

export default ToDoItem;
