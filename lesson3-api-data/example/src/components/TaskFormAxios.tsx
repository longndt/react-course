import { useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:3001/api";

interface CreateTaskInput {
    title: string;
    description: string;
}

interface TaskFormAxiosProps {
    onTaskCreated: () => void;
}

const TaskFormAxios = ({ onTaskCreated }: TaskFormAxiosProps) => {
    const [formData, setFormData] = useState<CreateTaskInput>({
        title: "",
        description: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title.trim() || !formData.description.trim()) {
            setError("Please fill in all fields");
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const response = await axios.post(`${API_BASE_URL}/tasks`, {
                title: formData.title.trim(),
                description: formData.description.trim(),
            });

            console.log("Task created:", response.data);

            // Reset form
            setFormData({ title: "", description: "" });

            // Notify parent component
            onTaskCreated();

        } catch (err) {
            setError("Failed to create task");
            console.error("Error creating task:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="task-form">
            <h3>Create New Task</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter task title"
                        disabled={loading}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter task description"
                        rows={3}
                        disabled={loading}
                    />
                </div>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                <div className="form-actions">
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary"
                    >
                        {loading ? "Creating..." : "Create Task"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TaskFormAxios;
