const EditTaskModal = ({
  showEditModal,
  setShowEditModal,
  editTaskDetails,
  setEditTaskDetails,
  handleEditTask
}) => {
  return (
    showEditModal && (
      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-10">
        <div className="bg-white p-6 rounded-md shadow-md w-96">
          <h2 className="text-xl mb-4">Edit Task</h2>
          <input
            type="text"
            value={editTaskDetails.title}
            onChange={(e) =>
              setEditTaskDetails({ ...editTaskDetails, title: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
            placeholder="Edit title"
          />
          <textarea
            value={editTaskDetails.description}
            onChange={(e) =>
              setEditTaskDetails({ ...editTaskDetails, description: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
            placeholder="Edit description"
          />
          <input
            type="date"
            value={editTaskDetails.dueDate}
            onChange={(e) =>
              setEditTaskDetails({ ...editTaskDetails, dueDate: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
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
