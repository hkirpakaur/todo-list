import { axiosInstance } from './axiosConfig';

export const fetchTodos = async () => {
    const res = await axiosInstance.get(`/todos`);
    console.log(res.data)
    return res.data.todos;
};

export const addTodo = async (todo) => {
    const res = await axiosInstance.post(`/todos`, {
        "title": todo.title,
        "description": todo.title,
        "completed": todo.completed,
        "deadline": todo.deadline,
    });
    return res.data.todo;
};

export const updateTodo = async (updatedTodo) => {
    const res = await axiosInstance.put(`/todos/${updatedTodo.id}`, {
        "title": updatedTodo.title,
        "description": updatedTodo.title,
        "completed": updatedTodo.completed,
        "notified": updatedTodo.notified,
        "deadline": updatedTodo.deadline,
    });
    return res.data.todo;
};

export const deleteTodo = async (id) => {
    const res = await axiosInstance.delete(`/todos/${id}`);
    return res.data;
};

export const toggleTodo = async (id) => {
    const res = await axiosInstance.patch(`/todos/${id}/toggle`);
    return res.data.todo;
};
