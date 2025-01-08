import React, { useState } from 'react';

const AddTaskModal = ({ showAddModal, setShowAddModal, newTask, setNewTask, handleAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = () => {
    if (title.trim() && description.trim() && dueDate.trim()) {
      handleAddTask({ title, description, dueDate });
      setShowAddModal(false);
    }
  };

  return (
    showAddModal && (
      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-10">
        <div className="bg-white p-6 rounded-md shadow-md w-96">
          <h2 className="text-xl mb-4">Add Task</h2>

          {/* Title input */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
            placeholder="Enter task title"
          />

          {/* Description input */}
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
            placeholder="Enter task description"
          />

          {/* Due Date input */}
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
          />

          <div className="flex justify-between">
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Add
            </button>
            <button
              onClick={() => setShowAddModal(false)}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default AddTaskModal;
