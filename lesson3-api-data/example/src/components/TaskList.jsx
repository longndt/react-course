import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_BASE_URL = "http://localhost:3001/api";

const TaskList = () => {
  const queryClient = useQueryClient();

  const {
    data: tasks = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/tasks`);
      return response.data;
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: async ({ taskId, status }) => {
      const response = await axios.put(`${API_BASE_URL}/tasks/${taskId}`, {
        status,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: async (taskId) => {
      await axios.delete(`${API_BASE_URL}/tasks/${taskId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  if (isLoading) return <div className="loading">Loading tasks...</div>;
  if (error) return <div className="error">Error loading tasks</div>;

  return (
    <div className="task-list">
      <h2>Tasks ({tasks.length})</h2>
      {tasks.length === 0 ? (
        <p className="no-tasks">No tasks found. Add your first task!</p>
      ) : (
        <div className="tasks">
          {tasks.map((task) => (
            <div key={task._id} className={`task-card ${task.status}`}>
              <div className="task-content">
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <small>Created: {new Date(task.createdAt).toLocaleDateString()}</small>
              </div>
              <div className="task-actions">
                <button
                  onClick={() =>
                    updateTaskMutation.mutate({
                      taskId: task._id,
                      status: task.status === "pending" ? "completed" : "pending",
                    })
                  }
                  className={`btn ${
                    task.status === "pending" ? "btn-success" : "btn-warning"
                  }`}
                  disabled={updateTaskMutation.isPending}
                >
                  {task.status === "pending" ? "Complete" : "Reopen"}
                </button>
                <button
                  onClick={() => deleteTaskMutation.mutate(task._id)}
                  className="btn btn-danger"
                  disabled={deleteTaskMutation.isPending}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;