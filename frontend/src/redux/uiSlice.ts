import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axios';
import { fetchProjects } from './projectsSlice';
import { fetchTickets } from './ticketsSlice';

interface UIState {
  superUserToggle: boolean;
  notificationVisibility: boolean;
  superuserModal: boolean;
  newProjectModal: boolean;
  newTicketModal: boolean;
  newTicketModalStatus: string;
}

const initialState: UIState = {
  superUserToggle: false,
  notificationVisibility: false,
  superuserModal: false,
  newProjectModal: false,
  newTicketModal: false,
  newTicketModalStatus: 'open',
};

// Thunk to ENABLE superuser mode (with password)
export const enableSuperuserAPI = createAsyncThunk('ui/enableSuperuser', async (password: string, thunkAPI) => {
  const response = await axiosInstance.post('/superuser/toggle', { password });
  thunkAPI.dispatch(fetchProjects());
  const state = thunkAPI.getState() as any;
  if (state.projects.activeProject) {
    thunkAPI.dispatch(fetchTickets(state.projects.activeProject._id));
  }
  return response.data;
});

// Thunk toDISABLE superuser mode (no password)
export const disableSuperuserAPI = createAsyncThunk('ui/disableSuperuser', async (_, thunkAPI) => {
  const response = await axiosInstance.post('/superuser/toggle', {});
  return response.data;
});

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleNotificationVisibility: (state) => {
      state.notificationVisibility = !state.notificationVisibility;
    },
    toggleSuperuserModal: (state) => {
      state.superuserModal = !state.superuserModal;
    },
    toggleNewProjectModal: (state) => {
      state.newProjectModal = !state.newProjectModal;
    },
    toggleNewTicketModal: (state, action) => {
      state.newTicketModal = !state.newTicketModal;
      if (action.payload) {
        state.newTicketModalStatus = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(enableSuperuserAPI.fulfilled, (state, action) => {
        state.superUserToggle = action.payload.superuserView;
        state.superuserModal = false;
      })
      .addCase(enableSuperuserAPI.rejected, (state, action) => {
        // Error is handled in the component, just log it here
        console.error('Failed to enable super-user mode:', action.error.message);
      })
      .addCase(disableSuperuserAPI.fulfilled, (state, action) => {
        state.superUserToggle = action.payload.superuserView;
      })
      .addCase(disableSuperuserAPI.rejected, (state, action) => {
        console.error('Failed to disable super-user mode:', action.error.message);
      });
  },
});

export const { toggleNotificationVisibility, toggleSuperuserModal, toggleNewProjectModal, toggleNewTicketModal } = uiSlice.actions;
export default uiSlice.reducer;