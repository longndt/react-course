import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:3001/api";

interface Task {
    _id: string;
    title: string;
    description: string;
    status: "pending" | "completed";
    createdAt: string;
}

const TaskListAxios = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch tasks using Axios
    const fetchTasks = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get<Task[]>(`${API_BASE_URL}/tasks`);
            setTasks(response.data);
        } catch (err) {
            setError("Failed to fetch tasks");
            console.error("Error fetching tasks:", err);
        } finally {
            setLoading(false);
        }
    };

    // Update task status using Axios
    const updateTask = async (taskId: string, status: "pending" | "completed") => {
        try {
            const response = await axios.put(`${API_BASE_URL}/tasks/${taskId}`, { status });
            setTasks(prev => prev.map(task =>
                task._id === taskId ? { ...task, status: response.data.status } : task
            ));
        } catch (err) {
            setError("Failed to update task");
            console.error("Error updating task:", err);
        }
    };

    // Delete task using Axios
    const deleteTask = async (taskId: string) => {
        try {
            await axios.delete(`${API_BASE_URL}/tasks/${taskId}`);
            setTasks(prev => prev.filter(task => task._id !== taskId));
        } catch (err) {
            setError("Failed to delete task");
            console.error("Error deleting task:", err);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    if (loading) {
        return <div className="loading">Loading tasks...</div>;
    }

    if (error) {
        return (
            <div className="error">
                <p>{error}</p>
                <button onClick={fetchTasks}>Retry</button>
            </div>
        );
    }

    return (
        <div className="task-list">
            <h2>Tasks ({tasks.length})</h2>
            {tasks.length === 0 ? (
                <p>No tasks found. Create your first task!</p>
            ) : (
                <div className="tasks">
                    {tasks.map(task => (
                        <div key={task._id} className={`task-card ${task.status}`}>
                            <div className="task-content">
                                <h3>{task.title}</h3>
                                <p>{task.description}</p>
                                <small>Created: {new Date(task.createdAt).toLocaleDateString()}</small>
                            </div>
                            <div className="task-actions">
                                <button
                                    onClick={() => updateTask(task._id, task.status === "pending" ? "completed" : "pending")}
                                    className={`btn ${task.status === "pending" ? "btn-success" : "btn-warning"}`}
                                >
                                    {task.status === "pending" ? "Complete" : "Undo"}
                                </button>
                                <button
                                    onClick={() => deleteTask(task._id)}
                                    className="btn btn-danger"
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

export default TaskListAxios;
