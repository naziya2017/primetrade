/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");

  const loadTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const addTask = async () => {
    if (!title) return;
    await api.post("/tasks", { title });
    setTitle("");
    loadTasks();
  };

  const toggleTask = async (id, completed) => {
    await api.put(`/tasks/${id}`, { completed: !completed });
    loadTasks();
  };

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    loadTasks();
  };

  const filteredTasks = tasks.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-semibold text-gray-800 mb-1">
            Welcome, {user?.name}
          </h2>
          <button
            onClick={logout}
            className="text-red-600 text-sm"
          >
            Logout
          </button>
        </div>

        <input
          className="w-full rounded-lg border border-gray-300 px-4 py-2
             focus:outline-none focus:ring-2 focus:ring-blue-500
             focus:border-transparent transition"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex mb-3">
          <input
            placeholder="New task"
  className="w-full rounded-lg border border-gray-300 px-4 py-2
             focus:outline-none focus:ring-2 focus:ring-blue-500
             focus:border-transparent transition"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            onClick={addTask}
            className="ml-2 bg-blue-600 text-white px-4"
          >
            Add
          </button>
        </div>

        <ul>
          {filteredTasks.map((task) => (
            <li
              key={task._id}
              className="flex justify-between items-center border-b py-2"
            >
              <span
                onClick={() => toggleTask(task._id, task.completed)}
                className={`cursor-pointer ${
                  task.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {task.title}
              </span>
              <button
                onClick={() => deleteTask(task._id)}
                className="text-red-500"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
