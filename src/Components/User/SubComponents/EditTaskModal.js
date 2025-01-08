import React from 'react';

const EditTaskModal = ({ showEditModal, setShowEditModal, editTaskText, setEditTaskText, handleEditTask }) => {
  return (
    showEditModal && (
      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-10">
        <div className="bg-white p-6 rounded-md shadow-md w-96">
          <h2 className="text-xl mb-4">Edit Task</h2>
          <input
            type="text"
            value={editTaskText}
            onChange={(e) => setEditTaskText(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
            placeholder="Edit your task"
          />
          <div className="flex justify-between">
            <button
              onClick={handleEditTask}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Save Edit
            </button>
            <button
              onClick={() => setShowEditModal(false)}
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

export default EditTaskModal;
