import { createSlice } from '@reduxjs/toolkit';
import { fetchTasksFromDatabase, addTaskToDatabase, editTaskInDatabase, deleteTaskFromDatabase, toggleTodoInDatabase } from '../Server/api'; 

const initialState = {
  tasks: [],  // Changed 'todos' to 'tasks'
  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: 'tasks',  // Changed 'todos' to 'tasks'
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setTasks: (state, action) => {
      state.tasks = action.payload;  // Changed 'todos' to 'tasks'
    },
    addTask: (state, action) => {
      state.tasks.push(action.payload);  // Changed 'todos' to 'tasks'
    },
    editTask: (state, action) => {
        const { id, updatedTask } = action.payload;
        const index = state.tasks.findIndex(task => task._id === id); // Use _id or whatever field is used to identify the task
        if (index !== -1) {
          state.tasks[index] = { ...state.tasks[index], ...updatedTask }; // Update the task in the state
        }
    },
    deleteTask: (state, action) => {
        state.tasks = state.tasks.filter(task => task._id !== action.payload);  // Changed 'todos' to 'tasks'
    },
    toggleTask: (state, action) => {
        const index = state.tasks.findIndex(task => task.id === action.payload);
        if (index !== -1) {
          state.tasks[index].completed = !state.tasks[index].completed; // Toggle the `completed` status
        }
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
  setTasks
} = taskSlice.actions;

// Async Thunks

export const fetchTasks = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await fetchTasksFromDatabase();  // Removed userId as it's now handled by backend auth
      dispatch(setTasks(response.data));  // Store the tasks in the Redux store
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
      // Call the backend API to toggle the task's completion status
      const response = await toggleTodoInDatabase(id); // API call to toggle the task status
      dispatch(toggleTask(response.data.id)); // Dispatch the toggleTask action with the id of the toggled task
    } catch (error) {
      dispatch(setError('Failed to toggle task status')); // Handle error
    } finally {
      dispatch(setLoading(false)); // Set loading to false once the request completes
    }
  };

export default taskSlice.reducer;
