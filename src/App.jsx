import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);

  // Fetch tasks
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response = await axios.get(import.meta.env.VITE_API_URL);
        setTasks(response.data);
        // toast.success('Tasks loaded successfully!');
      } catch (error) {
        toast.error('Error fetching tasks!');
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  // Add task
  const addTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) {
      toast.error('Task title cannot be empty!');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(import.meta.env.VITE_API_URL, {
        title: newTask,
      });
      setTasks([response.data, ...tasks]);
      setNewTask('');
      toast.success('Task added successfully!');
    } catch (error) {
      toast.error('Error adding task!');
      console.error('Error adding task:', error);
    } finally {
      setLoading(false);
    }
  };

  // Edit task
  const editTask = async (id, newTitle) => {
    if (!newTitle.trim()) {
      toast.error('Task title cannot be empty!');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/${id}`, {
        title: newTitle,
        isCompleted: tasks.find((task) => task._id === id).isCompleted,
      });
      setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
      toast.success('Task updated successfully!');
    } catch (error) {
      toast.error('Error updating task!');
      console.error('Error updating task:', error);
    } finally {
      setLoading(false);
    }
  };

  // Mark task as completed
  const completeTask = async (id) => {
    setLoading(true);
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/${id}`, {
        isCompleted: true,
      });
      setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
      toast.success('Task marked as completed!');
    } catch (error) {
      toast.error('Error completing task!');
      console.error('Error completing task:', error);
    } finally {
      setLoading(false);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
      toast.success('Task deleted successfully!');
    } catch (error) {
      toast.error('Error deleting task!');
      console.error('Error deleting task:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.isCompleted;
    if (filter === 'pending') return !task.isCompleted;
    return true;
  });

  return (
    <div className="app">
      <h1>Task Manager</h1>
      {loading && <div className="spinner"></div>}
      <form onSubmit={addTask}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button type="submit" disabled={loading}>
          Add Task
        </button>
      </form>
      <div className="filters">
        <button
          onClick={() => setFilter('all')}
          className={filter === 'all' ? 'active' : ''}
          disabled={loading}
        >
          All
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={filter === 'completed' ? 'active' : ''}
          disabled={loading}
        >
          Completed
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={filter === 'pending' ? 'active' : ''}
          disabled={loading}
        >
          Pending
        </button>
      </div>
      <TaskList
        tasks={filteredTasks}
        completeTask={completeTask}
        deleteTask={deleteTask}
        editTask={editTask}
        loading={loading}
      />
    </div>
  );
}

export default App;