import { useState } from "react";
import TaskList from "./components/TaskList.jsx";
import TaskForm from "./components/TaskForm.jsx";
import TaskListAxios from "./components/TaskListAxios.jsx";
import TaskFormAxios from "./components/TaskFormAxios.jsx";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [useAxios, setUseAxios] = useState(true);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Task Management App</h1>
        <p>React + Node.js + MongoDB Integration Demo</p>

        <div className="version-toggle">
          <button
            className={`btn ${useAxios ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setUseAxios(true)}
          >
            Axios (Basic)
          </button>
          <button
            className={`btn ${!useAxios ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setUseAxios(false)}
          >
            React Query (Advanced)
          </button>
        </div>
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
            {useAxios ? (
              <TaskFormAxios onTaskCreated={() => setShowForm(false)} />
            ) : (
              <TaskForm onSuccess={() => setShowForm(false)} />
            )}
          </div>
        )}

        <div className="tasks-section">
          {useAxios ? <TaskListAxios /> : <TaskList />}
        </div>
      </main>
    </div>
  );
}

export default App;
