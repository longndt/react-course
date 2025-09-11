import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

// API functions
const fetchTodos = async (): Promise<Todo[]> => {
  const response = await fetch("https://api.example.com/todos");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const createTodo = async (title: string): Promise<Todo> => {
  const response = await fetch("https://api.example.com/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, completed: false }),
  });
  if (!response.ok) {
    throw new Error("Failed to create todo");
  }
  return response.json();
};

const updateTodo = async (todo: Todo): Promise<Todo> => {
  const response = await fetch(`https://api.example.com/todos/${todo.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  if (!response.ok) {
    throw new Error("Failed to update todo");
  }
  return response.json();
};

const deleteTodo = async (id: number): Promise<void> => {
  const response = await fetch(`https://api.example.com/todos/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete todo");
  }
};

// Custom hooks
export function useTodos() {
  return useQuery<Todo[], Error>({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });
}

export function useCreateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTodo,
    onSuccess: (newTodo) => {
      queryClient.setQueryData<Todo[]>(["todos"], (old = []) => [
        ...old,
        newTodo,
      ]);
    },
  });
}

export function useUpdateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTodo,
    onSuccess: (updatedTodo) => {
      queryClient.setQueryData<Todo[]>(["todos"], (old = []) =>
        old.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
      );
    },
  });
}

export function useDeleteTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTodo,
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData<Todo[]>(["todos"], (old = []) =>
        old.filter((todo) => todo.id !== deletedId)
      );
    },
  });
}
