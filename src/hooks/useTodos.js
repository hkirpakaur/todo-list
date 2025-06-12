import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchTodos, addTodo, updateTodo, deleteTodo } from '../api/todoApi';

export const useTodos = () => {
    return useQuery({
        queryKey: ['todos'],
        queryFn: fetchTodos,
    })
};

export const useAddTodo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: addTodo,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
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
