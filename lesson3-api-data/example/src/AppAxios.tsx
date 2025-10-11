import { useState } from "react";
import TaskListAxios from "./components/TaskListAxios";
import TaskFormAxios from "./components/TaskFormAxios";
import "./App.css";

const AppAxios = () => {
    const [showForm, setShowForm] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

    const handleTaskCreated = () => {
        // Trigger refresh of task list
        setRefreshKey(prev => prev + 1);
    };

    return (
        <div className="app">
            <header className="app-header">
                <h1>Task Manager (Axios Version)</h1>
                <p>Learn API integration with Axios - the most popular HTTP client for React</p>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="btn btn-primary"
                >
                    {showForm ? "Hide Form" : "Add New Task"}
                </button>
            </header>

            <main className="app-main">
                {showForm && (
                    <div className="form-section">
                        <TaskFormAxios onTaskCreated={handleTaskCreated} />
                    </div>
                )}

                <div className="tasks-section">
                    <TaskListAxios key={refreshKey} />
                </div>
            </main>

            <footer className="app-footer">
                <p>
                    <strong>Learning Focus:</strong> Axios for HTTP requests, error handling, and loading states
                </p>
                <p>
                    <em>This version uses basic Axios without React Query for learning purposes</em>
                </p>
            </footer>
        </div>
    );
};

export default AppAxios;
