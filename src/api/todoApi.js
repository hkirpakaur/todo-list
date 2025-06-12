import { axiosInstance } from './axiosConfig';

export const fetchTodos = async () => {
    const res = await axiosInstance.get(`/todos`, {
        "title": todo.title,
        "description": todo.title,
    });
    return res.data;
};

export const addTodo = async (todo) => {
    const res = await fetch(`https://todo-api-zlkh.onrender.com/api/todos`, {
        method: "post",
        body: {
            "title": todo.title,
            "description": todo.title,
        },
        credentials: "include"
    });
    return await res.json();
};

export const updateTodo = async (updatedTodo) => {
    const res = await axiosInstance.put(`/todos/${updatedTodo.id}`);
    return res.data;
};

export const deleteTodo = async (id) => {
    const res = await axiosInstance.delete(`/todos/${id}`);
    return res.data;
};
