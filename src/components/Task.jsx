import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const Task = ({ id, onDelete, currentStatus ,content }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [taskName, setTaskName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem(`task-${id}`) || `Task #${id + 1}`;
    setTaskName(storedName);
  }, [id]);

  const handleUpdateClick = () => {
    navigate(`/task/${id}`);
  };

  const deleteButtonStyle = currentStatus === 'completed' ? { backgroundColor: 'green', color: 'white' } : {};

  return (
    <div
      className="p-4 bg-gray-50 rounded-md shadow-sm hover:shadow-lg transition relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Task Header */}
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold text-lg">{taskName}</span>
        <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded">{currentStatus}</span>
      </div>

      {/* Task Content - Display only on hover */}
      {isHovered && (
        <p className="text-gray-700 text-sm mb-4">{content}</p>
      )}

      {/* Action Buttons */}
      <div className="flex justify-end gap-2">
        <button
          className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition"
          onClick={handleUpdateClick}
        >
          Update
        </button>
        <button
          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
          onClick={() => onDelete(id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Task;
