import { useState, useEffect } from 'react';
import Task from './Task';

const Board = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskContent, setNewTaskContent] = useState('');
  const [selectedTaskToClone, setSelectedTaskToClone] = useState('');

  useEffect(() => {
    const storedTasks = Object.keys(localStorage)
      .filter(key => key.startsWith('task-'))
      .map(key => ({
        id: key.split('-')[1],
        name: localStorage.getItem(key),
        content: localStorage.getItem(`content-${key.split('-')[1]}`) || '',
        status: localStorage.getItem(`status-${key.split('-')[1]}`) || 'pending',
      }));
    setTasks(storedTasks);
  }, []);

  const addTask = () => {
    const newId = tasks.length+1;
    
    localStorage.setItem(`task-${newId}`, newTaskName);
    localStorage.setItem(`content-${newId}`, newTaskContent);
    localStorage.setItem(`status-${newId}`, 'pending');
    
    setTasks([...tasks, { id: newId, name: newTaskName, content: newTaskContent, status: 'pending' }]);
    
    setNewTaskName('');
    setNewTaskContent('');
  };

  const cloneTask = () => {
    const taskToClone = tasks.find(task => task.id === selectedTaskToClone);
    if (taskToClone) {
      const newId = tasks.length + 1;
      
      localStorage.setItem(`task-${newId}`, taskToClone.name);
      localStorage.setItem(`content-${newId}`, taskToClone.content);
      localStorage.setItem(`status-${newId}`, taskToClone.status);
      
      setTasks([...tasks, { id: newId, name: taskToClone.name, content: taskToClone.content, status: taskToClone.status }]);
    }
  };

  const deleteTask = (id) => {
    localStorage.removeItem(`task-${id}`);
    localStorage.removeItem(`content-${id}`);
    localStorage.removeItem(`status-${id}`);
    
    setTasks(tasks.filter(task => task.id !== id));
  };

  const updateTaskStatus = (id, newStatus) => {
    localStorage.setItem(`status-${id}`, newStatus);
    setTasks(tasks.map(task => (task.id === id ? { ...task, status: newStatus } : task)));
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
    {/* Task Creation and Cloning Section */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      {/* Create Task Section */}
      <div className="bg-white shadow-md rounded p-6">
        <h3 className="text-xl font-bold mb-4">Create New Task</h3>
        <div className="grid gap-4 mb-4">
          <input
            type="text"
            className="border p-2 rounded w-full"
            placeholder="Task Name"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
          />
          <textarea
            className="border p-2 rounded w-full"
            placeholder="Task Content"
            value={newTaskContent}
            onChange={(e) => setNewTaskContent(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 transition"
          onClick={addTask}
        >
          Create Task
        </button>
      </div>

      {/* Clone Task Section */}
      <div className="bg-white shadow-md rounded p-6">
        <h3 className="text-xl font-bold mb-4">Clone Existing Task</h3>
        <div className="grid gap-4">
          <select
            value={selectedTaskToClone}
            onChange={(e) => setSelectedTaskToClone(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="" disabled>Select a task to clone</option>
            {tasks.map((task) => (
              <option key={task.id} value={task.id}>{task.name}</option>
            ))}
          </select>
          <button
            className="bg-yellow-500 text-white px-4 py-2 rounded w-full hover:bg-yellow-600 transition"
            onClick={cloneTask}
          >
            Clone Task
          </button>
        </div>
      </div>
    </div>

    {/* Displaying Tasks */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {tasks.map((task) => (
        <div key={task.id} className="bg-white border rounded p-4 shadow">
          <Task
            id={task.id}
            onDelete={deleteTask}
            currentStatus={task.status}
            content={task.content}
          />
        </div>
      ))}
    </div>
  </div>
  );
};

export default Board;
