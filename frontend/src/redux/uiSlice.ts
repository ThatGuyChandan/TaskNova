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

export const toggleSuperUserAPI = createAsyncThunk('ui/toggleSuperUser', async (password: string, thunkAPI) => {
  const response = await axiosInstance.post('/superuser/toggle', { password });
  thunkAPI.dispatch(fetchProjects());
  const state = thunkAPI.getState() as any;
  if (state.projects.activeProject) {
    thunkAPI.dispatch(fetchTickets(state.projects.activeProject._id));
  }
  return response.data;
});

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSuperUser: (state) => {
      state.superUserToggle = !state.superUserToggle;
    },
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
      .addCase(toggleSuperUserAPI.fulfilled, (state, action) => {
        state.superUserToggle = action.payload.superuserView;
        state.superuserModal = false;
      })
      .addCase(toggleSuperUserAPI.rejected, (state, action) => {
        console.error('Failed to toggle super-user mode:', action.error.message);
        state.superuserModal = false;
      });
  },
});
export const { toggleSuperUser, toggleNotificationVisibility, toggleSuperuserModal, toggleNewProjectModal, toggleNewTicketModal } = uiSlice.actions;
export default uiSlice.reducer;
