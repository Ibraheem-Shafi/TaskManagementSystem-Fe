import React from 'react';

const DeleteTaskModal = ({ showDeleteModal, setShowDeleteModal, handleDeleteTask }) => {
  return (
    showDeleteModal && (
      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-10">
        <div className="bg-white p-6 rounded-md shadow-md w-96">
          <h2 className="text-xl mb-4">Are you sure you want to delete this task?</h2>
          <div className="flex justify-between">
            <button
              onClick={handleDeleteTask}
              className="bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Yes, Delete
            </button>
            <button
              onClick={() => setShowDeleteModal(false)}
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

export default DeleteTaskModal;
