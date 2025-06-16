import React, { useState, useEffect, useRef } from 'react';
import ToDoItem from './ToDoItem';
import { toast, Toaster } from 'react-hot-toast';
import SidebarSettings from './SidebarSettings';
import QuoteCard from './QuoteCard';
import { usePreferences } from '../context/PreferencesContext';
import { useTodos, useAddTodo, useUpdateTodo, useDeleteTodo, useToggleTodo } from '../hooks/useTodos';

const TodoList = ({ setIsLoggedIn }) => {
    const { data: tasks = [], isLoading } = useTodos();
    console.log(tasks)
    const addTodo = useAddTodo();
    const updateTodo = useUpdateTodo();
    const deleteTodo = useDeleteTodo();
    const toggleTodo = useToggleTodo();
    const { deadlineMode, setDeadlineMode, autoCompleteMode, setAutoCompleteMode } = usePreferences();
    const [modalOpen, setModalOpen] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [newTaskDeadline, setNewTaskDeadline] = useState("");
    const [editingTask, setEditingTask] = useState(null);
    const [viewingTask, setViewingTask] = useState(null);
    const [viewModalOpen, setViewModalOpen] = useState(false);


    useEffect(() => {
        if (!deadlineMode) return;
        const interval = setInterval(() => {
            tasks.forEach(task => {
                if (
                    task.deadline &&
                    new Date(task.deadline) < Date.now() &&
                    !task.notified &&
                    !task.completed
                ) {
                    toast.error(`Deadline missed for task: "${task.title}"`);
                    updateTodo.mutate({ ...task, notified: true });
                }
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [tasks, deadlineMode]);

    // Add or update a task
    const saveTask = () => {
        if (!newTaskTitle.trim()) return;

        if (editingTask) {
            updateTodo.mutate(
                {
                    id: editingTask.id,
                    title: newTaskTitle.trim(),
                    description: newTaskTitle.trim(),
                    completed: editingTask.completed,
                    notified: editingTask.notified,
                    deadline: deadlineMode
                        ? new Date(newTaskDeadline).toISOString()
                        : ""
                },
                {
                    onSuccess: () => {
                        setEditingTask(null)
                        setNewTaskTitle("");
                        setNewTaskDeadline("");
                        setModalOpen(false);
                    }
                }
            );
        } else {
            addTodo.mutate(
                {
                    title: newTaskTitle.trim(),
                    description: newTaskTitle.trim(),
                    completed: autoCompleteMode,
                    notified: false,
                    deadline: deadlineMode
                        ? new Date(newTaskDeadline).toISOString()
                        : ""
                },
                {
                    onSuccess: () => {
                        setNewTaskTitle("");
                        setNewTaskDeadline("");
                        setModalOpen(false);
                        toast.success("Task Added!")
                    }
                }
            );
        }

    };

    const deleteTask = (taskId) => {
        deleteTodo.mutate(taskId)
    };

    const editTask = (task) => {
        setEditingTask(task);
        setNewTaskTitle(task.title);
        if (task.deadline) {
            const toLocalDatetimeString = (date) => {
                const pad = (n) => String(n).padStart(2, '0');
                return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
            };
            setNewTaskDeadline(toLocalDatetimeString(new Date(task.deadline)));
        } else {
            setNewTaskDeadline("");
        }
        setModalOpen(true);
    };

    const viewTask = (task) => {
        setViewingTask(task);
        setViewModalOpen(true);
    };

    const closeViewModal = () => {
        setViewingTask(null);
        setViewModalOpen(false);
    };


    const toggleTask = (taskId) => {
        toggleTodo.mutate(taskId);
    };



    return (
        <div className="flex min-h-screen">
            <div className="todo-list flex-grow p-6">

                {/* Button to Open the Modal */}
                <button className="btn btn-soft btn-info padding-right=10" onClick={() => setModalOpen(true)}>
                    Add Task
                </button>

                {/* Add/Edit Modal */}
                {deadlineMode ? modalOpen && (
                    <div className="modal modal-open">
                        <div className="modal-box bg-base-100 rounded-xl shadow-xl max-h-none overflow-visible">
                            <h3 className="font-bold text-lg mb-4">
                                {editingTask ? "Edit Task" : "New Task"}
                            </h3>
                            <input
                                type="text"
                                placeholder="Task name"
                                value={newTaskTitle}
                                onChange={(e) => setNewTaskTitle(e.target.value)}
                                className="input input-bordered w-full mb-4"
                            />

                            <input
                                type="datetime-local"
                                value={newTaskDeadline}
                                onChange={(e) => setNewTaskDeadline(e.target.value)}
                                className="input input-bordered w-full mb-4"
                            />


                            <div className="modal-action flex justify-end gap-2">
                                <button className="btn btn-primary" onClick={saveTask}>
                                    {editingTask ? "Save" : "Add"}
                                </button>
                                <button className="btn btn-outline" onClick={() => setModalOpen(false)}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                ) : modalOpen && (
                    <div className="modal modal-open">
                        <div className="modal-box bg-base-100 rounded-xl shadow-xl">
                            <h3 className="font-bold text-lg mb-4">
                                {editingTask ? "Edit Task" : "New Task"}
                            </h3>
                            <input
                                type="text"
                                placeholder="Task name"
                                value={newTaskTitle}
                                onChange={(e) => setNewTaskTitle(e.target.value)}
                                className="input input-bordered w-full mb-4"
                            />
                            <div className="modal-action flex justify-end gap-2">
                                <button className="btn btn-primary" onClick={saveTask}>
                                    {editingTask ? "Save" : "Add"}
                                </button>
                                <button className="btn btn-outline" onClick={() => setModalOpen(false)}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}


                {/* View Modal */}
                {viewModalOpen && viewingTask && (
                    <div className="modal modal-open">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Task Details</h3>
                            <p className="text-lg mb-2">
                                <strong>Task:</strong> {viewingTask.title || "Untitled Task"}
                            </p>
                            <p className="text-sm text-gray-500">
                                <strong>Deadline:</strong> {viewingTask.deadline || "No deadline"}
                            </p>
                            <div className="modal-action">
                                <button className="btn" onClick={closeViewModal}>Close</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Grouped Task List */}
                <div className="w-full p-8 bg-base-100 min-h-screen">
                    {/* Group tasks by deadline */}
                    {deadlineMode ? Object.entries(
                        tasks.reduce((groups, task) => {
                            const dateKey = task.deadline
                                ? new Date(task.deadline).toLocaleDateString()
                                : "No Deadline";
                            if (!groups[dateKey]) {
                                groups[dateKey] = [];
                            }
                            groups[dateKey].push(task);
                            return groups;
                        }, {})
                    )
                        .sort(([a], [b]) => {
                            if (a === "No Deadline") return 1;
                            if (b === "No Deadline") return -1;
                            return new Date(a) - new Date(b);
                        })
                        .map(([date, tasks]) => (
                            <div key={date} className="mb-8">
                                <h2 className="text-2xl font-bold mb-4">{date}</h2>
                                {tasks.map((task) => (
                                    <ToDoItem
                                        key={task.id}
                                        task={task}
                                        onDelete={() => deleteTask(task.id)}
                                        onEdit={() => editTask(task)}
                                        onView={() => viewTask(task)}
                                        onToggle={() => toggleTask(task.id)}
                                        deadlineMode={deadlineMode}
                                    />
                                ))}
                            </div>
                        ))
                        : tasks.map((task) => (
                            <ToDoItem
                                key={task.id}
                                task={task}
                                onDelete={() => deleteTask(task.id)}
                                onEdit={() => editTask(task)}
                                onView={() => viewTask(task)}
                                onToggle={() => toggleTask(task.id)}
                                deadlineMode={deadlineMode}
                            />
                        ))}
                </div>

            </div>
            {/* Sidebar */}
            <div className="w-85 p-4 bg-base-200 border-l border-base-300 flex flex-col gap-4">
                <QuoteCard />
                <SidebarSettings
                    deadlineMode={deadlineMode}
                    setDeadlineMode={setDeadlineMode}
                    autoCompleteMode={autoCompleteMode}
                    setAutoCompleteMode={setAutoCompleteMode}
                    setIsLoggedIn={setIsLoggedIn}
                />
            </div>

        </div>

    );
};

export default TodoList;
