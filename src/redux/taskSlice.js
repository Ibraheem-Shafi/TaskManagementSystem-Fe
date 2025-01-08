import { createSlice } from '@reduxjs/toolkit';
import { fetchTasksFromDatabase, addTaskToDatabase, editTaskInDatabase, deleteTaskFromDatabase, toggleTodoInDatabase } from '../Server/api'; 

const initialState = {
  tasks: [],
  filteredTasks: [],
  dueDateFilter: '',
  statusFilter: '',
  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setTasks: (state, action) => {
      state.tasks = action.payload;
      state.filteredTasks = action.payload; // Update filteredTasks when tasks are set
    },
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      state.filteredTasks.push(action.payload); // Ensure filteredTasks is updated
    },
    editTask: (state, action) => {
      const { id, updatedTask } = action.payload;
      const index = state.tasks.findIndex(task => task._id === id);
      if (index !== -1) {
        state.tasks[index] = { ...state.tasks[index], ...updatedTask };
        // Reapply the filters after editing the task
        state.filteredTasks = state.tasks.filter(task => {
          return (
            (state.dueDateFilter ? task.dueDate.split('T')[0] === state.dueDateFilter : true) &&
            (state.statusFilter ? task.status === state.statusFilter : true)
          );
        });
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task._id !== action.payload);
      // Reapply the filters after deleting the task
      state.filteredTasks = state.tasks.filter(task => {
        return (
          (state.dueDateFilter ? task.dueDate.split('T')[0] === state.dueDateFilter : true) &&
          (state.statusFilter ? task.status === state.statusFilter : true)
        );
      });
    },
    toggleTask: (state, action) => {
      const index = state.tasks.findIndex(task => task._id === action.payload);
      if (index !== -1) {
        // Cycle through the statuses
        switch (state.tasks[index].status) {
          case 'Pending':
            state.tasks[index].status = 'In Progress';
            break;
          case 'In Progress':
            state.tasks[index].status = 'Completed';
            break;
          case 'Completed':
            state.tasks[index].status = 'Pending';
            break;
          default:
            state.tasks[index].status = 'Pending';
            break;
        }
        // Reapply the filters after toggling the task's status
        state.filteredTasks = state.tasks.filter(task => {
          return (
            (state.dueDateFilter ? task.dueDate.split('T')[0] === state.dueDateFilter : true) &&
            (state.statusFilter ? task.status === state.statusFilter : true)
          );
        });
      }
    },
    setDueDateFilter: (state, action) => {
      state.dueDateFilter = action.payload;
      // Reapply the filter after changing the dueDateFilter
      state.filteredTasks = state.tasks.filter(task => {
        return (
          (state.dueDateFilter ? task.dueDate.split('T')[0] === state.dueDateFilter : true) &&
          (state.statusFilter ? task.status === state.statusFilter : true)
        );
      });
    },
    setStatusFilter: (state, action) => {
      state.statusFilter = action.payload;
      // Reapply the filter after changing the statusFilter
      state.filteredTasks = state.tasks.filter(task => {
        return (
          (state.dueDateFilter ? task.dueDate.split('T')[0] === state.dueDateFilter : true) &&
          (state.statusFilter ? task.status === state.statusFilter : true)
        );
      });
    },
    setFilteredTasks: (state) => {
      // Apply both dueDateFilter and statusFilter here
      state.filteredTasks = state.tasks.filter(task => {
        return (
          (state.dueDateFilter ? task.dueDate.split('T')[0] === state.dueDateFilter : true) &&
          (state.statusFilter ? task.status === state.statusFilter : true)
        );
      });
    }
  },
});

export const {
  addTask,
  editTask,
  deleteTask,
  toggleTask,
  setLoading,
  setError,
  setTasks,
  setDueDateFilter,
  setStatusFilter,
  setFilteredTasks
} = taskSlice.actions;

// Async Thunks

export const fetchTasks = (userId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await fetchTasksFromDatabase(userId);
    dispatch(setTasks(response.data));  // Store the tasks in the Redux store
    dispatch(setFilteredTasks());  // Apply the initial filters
  } catch (error) {
    dispatch(setError('Failed to fetch tasks'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const addNewTask = (task) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await addTaskToDatabase(task);
    dispatch(addTask(response.data));
  } catch (error) {
    dispatch(setError('Failed to add task'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const updateTask = (id, updatedTask) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await editTaskInDatabase(id, updatedTask);
    dispatch(editTask({ id, updatedTask: response.data }));
  } catch (error) {
    dispatch(setError('Failed to edit task'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const deleteTaskById = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await deleteTaskFromDatabase(id);
    dispatch(deleteTask(id));
  } catch (error) {
    dispatch(setError('Failed to delete task'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const toggleTaskStatus = (id) => async (dispatch) => {
  dispatch(setLoading(true)); // Set loading to true while the request is in progress
  try {
    // Call the backend API to toggle the task's status
    const response = await toggleTodoInDatabase(id); // API call to toggle the task status
    dispatch(toggleTask(id)); // Dispatch the toggleTask action with the updated task data
  } catch (error) {
    dispatch(setError('Failed to toggle task status')); // Handle error
  } finally {
    dispatch(setLoading(false)); // Set loading to false once the request completes
  }
};

export default taskSlice.reducer;
