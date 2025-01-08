import React from 'react';

const AddTaskModal = ({ showAddModal, setShowAddModal, newTask, setNewTask, handleAddTask }) => {
  return (
    showAddModal && (
      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-10">
        <div className="bg-white p-6 rounded-md shadow-md w-96">
          <h2 className="text-xl mb-4">Add Task</h2>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
            placeholder="Enter new task"
          />
          <div className="flex justify-between">
            <button
              onClick={handleAddTask}
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
