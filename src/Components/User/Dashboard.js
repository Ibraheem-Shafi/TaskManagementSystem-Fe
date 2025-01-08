import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchTasks, addNewTask, updateTask, deleteTaskById, toggleTaskStatus } from '../../redux/taskSlice';
import AddTaskModal from './SubComponents/AddTaskModal';
import EditTaskModal from './SubComponents/EditTaskModal';
import DeleteTaskModal from './SubComponents/DeleteTaskModal';

import Logout from './Logout';

const Dashboard = () => {
  const { userId } = useParams();
  const [newTask, setNewTask] = useState('');
  const [editTaskText, setEditTaskText] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks.tasks);
  const loading = useSelector(state => state.tasks.loading);
  const error = useSelector(state => state.tasks.error);

  useEffect(() => {
    if (userId) {
      dispatch(fetchTasks(userId)); // Fetch tasks for the user from the API
    }
  }, [dispatch, userId]);

  // Handle adding new task
  const handleAddTask = useCallback(() => {
    if (newTask.trim()) {
      dispatch(addNewTask({
        userId: userId, 
        id: Date.now(),
        text: newTask,
        completed: false,
      }));
      setNewTask('');
      setShowAddModal(false);
    }
  }, [newTask, userId, dispatch]);

  // Handle editing existing task
  const handleEditTask = useCallback(() => {
    console.log('Editing task with id:', editTaskId);
    if (editTaskText.trim()) {
      const updatedTask = { text: editTaskText };
      dispatch(updateTask(editTaskId, { text: editTaskText, id: editTaskId }));
      setEditTaskText('');
      setEditTaskId(null);
      setShowEditModal(false);
    }
  }, [editTaskText, editTaskId, dispatch]);

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

  return (
    <div className="dashboard-container">
      <Logout />
      <h2>Task Dashboard</h2>

      {/* Error and Loading States */}
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <button className="btn-add" onClick={() => setShowAddModal(true)}>Add Task</button>

      {/* Task List (Styled as large tiles) */}
      <div className="task-grid">
        {tasks.length === 0 ? <p>No Tasks available</p> : tasks.map(task => (
          <div key={task._id} className={`task-tile ${task.completed ? 'completed' : ''}`}>
            <div className="task-text" onClick={() => handleToggleTask(task._id)}>
              {task.text}
            </div>

            {/* Toggle Completed */}
            <button className="btn-toggle" onClick={() => handleToggleTask(task._id)}>
              {task.completed ? 'Undo' : 'Complete'}
            </button>

            {/* Edit Task Button */}
            <button onClick={() => {
              setEditTaskText(task.text);
              setEditTaskId(task._id);
              setShowEditModal(true);
            }}>Edit</button>

            {/* Delete Task Button */}
            <button onClick={() => {
              setTaskToDelete(task._id);
              setShowDeleteModal(true);
            }}>Delete</button>
          </div>
        ))}
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
        editTaskText={editTaskText}
        setEditTaskText={setEditTaskText}
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
