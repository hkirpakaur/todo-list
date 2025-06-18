import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchTodos, addTodo, updateTodo, deleteTodo, toggleTodo, loginUser, signupUser, checkAuth, logoutUser } from '../api/todoApi';

export const useTodos = () => {
    return useQuery({
        queryKey: ['todos'],
        queryFn: fetchTodos,
    });
};

export const useAddTodo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: addTodo,
        onSuccess: () => {
            console.log("invalidating todos...");
            queryClient.invalidateQueries({ queryKey: ['todos'] });
        }
    });
};

export const useUpdateTodo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateTodo,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
    });
};

export const useDeleteTodo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteTodo,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
    });
};

export const useToggleTodo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: toggleTodo,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
    });
};

export const useLogin = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: loginUser,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['authStatus'] }),
    });
};

export const useCheckAuth = () => {
    return useQuery({
        queryKey: ['authStatus'],
        queryFn: checkAuth,
        refetchOnWindowFocus: false,
    });
};

export const useLogout = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: logoutUser,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['authStatus'] }),
    });
};