import React, { useState } from 'react';

const TaskForm = ({ addTask }) => {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim()) {
            addTask(text);
            setText('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Add a new task..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button type="submit">Add</button>
        </form>
    );
};

export default TaskForm;
