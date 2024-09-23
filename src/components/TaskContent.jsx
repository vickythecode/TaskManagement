import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const TaskContent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [taskName, setTaskName] = useState('');
  const [taskContent, setTaskContent] = useState('');
  const [status, setStatus] = useState('pending');

  useEffect(() => {
    const storedName = localStorage.getItem(`task-${id}`) || `Task #${+id + 1}`;
    const storedContent = localStorage.getItem(`content-${id}`) || ''; // Fetching content
    const storedStatus = localStorage.getItem(`status-${id}`) || 'pending';

    setTaskName(storedName);
    setTaskContent(storedContent); // Setting content
    setStatus(storedStatus);
  }, [id]);

  const handleSave = () => {
    localStorage.setItem(`task-${id}`, taskName);
    localStorage.setItem(`content-${id}`, taskContent); // Storing content
    localStorage.setItem(`status-${id}`, status);
    navigate('/boards'); // Redirect back to the board
  };

  return (
    <div className="max-w-xl mx-auto p-4 border rounded bg-white shadow">
    <h2 className="text-xl font-bold mb-4">Edit Task #{+id + 1}</h2>
    <input
      type="text"
      className="border p-2 w-full mb-4"
      value={taskName}
      onChange={(e) => setTaskName(e.target.value)}
      placeholder="Task Name"
    />
    <textarea
      className="border p-2 w-full mb-4"
      value={taskContent}
      onChange={(e) => setTaskContent(e.target.value)}
      placeholder="Task Content"
    />
    <select
      className="border p-2 w-full mb-4"
      value={status}
      onChange={(e) => setStatus(e.target.value)}
    >
      <option value="pending">Pending</option>
      <option value="in progress">In Progress</option>
      <option value="completed">Completed</option>
    </select>
    <button className="bg-green-500 text-white px-4 py-2" onClick={handleSave}>
      Save
    </button>
  </div>
  );
};

export default TaskContent;
