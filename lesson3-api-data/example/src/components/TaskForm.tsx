import { useState, FormEvent, ChangeEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_BASE_URL = "http://localhost:3001/api";

interface TaskFormProps {
  onSuccess: () => void;
}

interface TaskFormData {
  title: string;
  description: string;
}

const TaskForm = ({ onSuccess }: TaskFormProps) => {
  const [formData, setFormData] = useState<TaskFormData>({
    title: "",
    description: "",
  });

  const queryClient = useQueryClient();

  const createTaskMutation = useMutation({
    mutationFn: async (newTask: TaskFormData) => {
      const response = await axios.post(`${API_BASE_URL}/tasks`, newTask);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setFormData({ title: "", description: "" });
      onSuccess();
    },
    onError: (error) => {
      console.error("Failed to create task:", error);
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.title.trim() && formData.description.trim()) {
      createTaskMutation.mutate(formData);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h3>Add New Task</h3>

      <div className="form-group">
        <label htmlFor="title">Task Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Enter task title..."
          required
          maxLength={100}
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Enter task description..."
          required
          maxLength={500}
          rows={4}
        />
      </div>

      <div className="form-actions">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={
            createTaskMutation.isPending ||
            !formData.title.trim() ||
            !formData.description.trim()
          }
        >
          {createTaskMutation.isPending ? "Creating..." : "Create Task"}
        </button>

        <button type="button" className="btn btn-secondary" onClick={onSuccess}>
          Cancel
        </button>
      </div>

      {createTaskMutation.isError && (
        <div className="error-message">
          Failed to create task. Please try again.
        </div>
      )}
    </form>
  );
};

export default TaskForm;
