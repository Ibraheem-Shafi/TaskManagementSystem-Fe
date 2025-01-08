import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchTasks, addNewTask, updateTask, deleteTaskById, toggleTaskStatus, setDueDateFilter, setStatusFilter, setFilteredTasks } from '../../redux/taskSlice';
import AddTaskModal from './SubComponents/AddTaskModal';
import EditTaskModal from './SubComponents/EditTaskModal';
import DeleteTaskModal from './SubComponents/DeleteTaskModal';
import Logout from './Logout';

const Dashboard = () => {
  const { userId } = useParams();
  const [newTask, setNewTask] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskDetails, setEditTaskDetails] = useState({ title: '', description: '', dueDate: '' });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const [dueDateFilter, setDueDateFilterState] = useState('');
  const [statusFilter, setStatusFilterState] = useState('');

  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks.filteredTasks);
  const loading = useSelector(state => state.tasks.loading);
  const error = useSelector(state => state.tasks.error);

  useEffect(() => {
    if (userId) {
      dispatch(fetchTasks(userId)); // Fetch tasks for the user from the API
    }
  }, [dispatch, userId]);

  // Handle adding new task
  const handleAddTask = useCallback(({ title, description, dueDate }) => {
    if (title.trim() && description.trim() && dueDate.trim()) {
      dispatch(addNewTask({
        userId: userId, 
        id: Date.now(),
        title,
        description,
        dueDate,
        completed: false,
      }));
      setNewTask(''); // Clear input fields if needed
      setShowAddModal(false); // Close the modal
    }
  }, [userId, dispatch]);

  const handleEditTask = useCallback(() => {
    if (
      editTaskDetails.title.trim() &&
      editTaskDetails.description.trim() &&
      editTaskDetails.dueDate.trim()
    ) {
      dispatch(
        updateTask(editTaskId, {
          ...editTaskDetails,
          id: editTaskId,
        })
      );
      setEditTaskDetails({ title: '', description: '', dueDate: '' });
      setEditTaskId(null);
      setShowEditModal(false);
    }
  }, [editTaskDetails, editTaskId, dispatch]);

  const handleDeleteTask = useCallback(() => {
    if (taskToDelete) {
      dispatch(deleteTaskById(taskToDelete));  // Dispatch the delete action
      setTaskToDelete(null);  // Reset the taskToDelete state
      setShowDeleteModal(false);  // Close the modal
    }
  }, [taskToDelete, dispatch]);

  // Handle toggling completion of task
  const handleToggleTask = useCallback((id) => {
    dispatch(toggleTaskStatus(id));
  }, [dispatch]);

  // Handle the due date filter
  const handleDueDateFilterChange = (e) => {
    setDueDateFilterState(e.target.value);
    dispatch(setDueDateFilter(e.target.value)); // Dispatch the action to set the due date filter
    dispatch(setFilteredTasks()); // Reapply the filters
  };

  // Handle the status filter
  const handleStatusFilterChange = (e) => {
    setStatusFilterState(e.target.value);
    dispatch(setStatusFilter(e.target.value)); // Dispatch the action to set the status filter
    dispatch(setFilteredTasks()); // Reapply the filters
  };

  return (
    <div className="p-4">

      <div className='w-full flex flex-col md:flex-row justify-around'>
        <div className='flex gap-2 justify-center mb-4'>
          <Link className="bg-blue-500 text-white p-2 rounded-md" to='/'>Home</Link>
          <Logout />
        </div>
        <h2 className="text-xl font-semibold mb-4">Task Dashboard</h2>
        <button className="bg-blue-500 text-white p-2 rounded-md" onClick={() => setShowAddModal(true)}>
          Add Task
        </button>
      </div>

      {/* Filter UI */}
      <div className="flex space-x-4 mt-4">
        <div>
          <label htmlFor="dueDateFilter" className="mr-2">Filter by Due Date:</label>
          <input
            id="dueDateFilter"
            type="date"
            value={dueDateFilter}
            onChange={handleDueDateFilterChange}
            className="p-2 border rounded-md"
          />
        </div>
        <div>
          <label htmlFor="statusFilter" className="mr-2">Filter by Status:</label>
          <select
            id="statusFilter"
            value={statusFilter}
            onChange={handleStatusFilterChange}
            className="p-2 border rounded-md"
          >
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Error and Loading States */}
      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Task List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {tasks.length === 0 ? (
          <p className="text-center text-gray-500">No Tasks available</p>
        ) : (
          tasks.map(task => (
            <div key={task._id} className={`relative border p-6 pt-16 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg ${task.status === 'Completed' ? 'bg-green-100' : 'bg-white'}`}>
              <div className="text-xl font-semibold text-gray-800 mb-2">
                {task.title}
              </div>
              <div className="text-sm text-gray-600 mb-4">
                {task.description}
              </div>
              <div className="text-sm text-gray-600 mb-4">
                {new Date(task.dueDate).toLocaleDateString("en-US", {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              <div 
                className={`absolute top-4 right-4 py-1 px-2 text-xs text-white rounded-2xl ${
                  task.status === 'Completed' ? 'bg-green-500' :
                  task.status === 'In Progress' ? 'bg-blue-500' : 'bg-gray-500'
                }`}
              >
                {task.status}
              </div>
              <button
                className={`absolute top-4 left-4 py-1 px-4 text-sm text-white rounded-md ${
                  task.status === 'Completed' ? 'bg-green-500' :
                  task.status === 'In Progress' ? 'bg-blue-500' : 'bg-gray-500'
                }`}
                onClick={() => handleToggleTask(task._id)}
              >
                {task.status === 'Completed' ? 'Undo' :
                  task.status === 'In Progress' ? 'Mark As Complete' : 'Mark As In Progress'}
              </button>

              <div className="mt-4 space-x-2">
                <button
                  onClick={() => {
                    setEditTaskDetails({
                      title: task.title || '',
                      description: task.description || '',
                      dueDate: task.dueDate || '',
                    });
                    setEditTaskId(task._id);
                    setShowEditModal(true);
                  }}
                  className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition'
                >
                  Edit
                </button>

                <button
                  className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
                  onClick={() => {
                    setTaskToDelete(task._id);
                    setShowDeleteModal(true);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>


      {/* Modal Components */}
      <AddTaskModal
        showAddModal={showAddModal}
        setShowAddModal={setShowAddModal}
        newTask={newTask}
        setNewTask={setNewTask}
        handleAddTask={handleAddTask}
      />
      <EditTaskModal
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        editTaskDetails={editTaskDetails}
        setEditTaskDetails={setEditTaskDetails}
        handleEditTask={handleEditTask}
      />
      <DeleteTaskModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        handleDeleteTask={handleDeleteTask}
      />
    </div>
  );
};

export default Dashboard;
