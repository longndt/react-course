import { useState } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import "./App.css";

function App() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Task Management App</h1>
        <p>React + Node.js + MongoDB Integration Demo</p>
      </header>

      <main className="app-main">
        <div className="app-controls">
          <button
            className="btn btn-primary"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Hide Form" : "Add New Task"}
          </button>
        </div>

        {showForm && (
          <div className="form-section">
            <TaskForm onSuccess={() => setShowForm(false)} />
          </div>
        )}

        <div className="tasks-section">
          <TaskList />
        </div>
      </main>
    </div>
  );
}

export default App;
