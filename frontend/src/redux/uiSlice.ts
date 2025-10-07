import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axios';

interface UIState {
  superUserToggle: boolean;
  notificationVisibility: boolean;
  superuserModal: boolean;
  newProjectModal: boolean;
  newTicketModal: boolean;
}

const initialState: UIState = {
  superUserToggle: false,
  notificationVisibility: false,
  superuserModal: false,
  newProjectModal: false,
  newTicketModal: false,
};

export const toggleSuperUserAPI = createAsyncThunk('ui/toggleSuperUser', async (password: string) => {
  const response = await axiosInstance.post('/superuser/toggle', { password });
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
    toggleNewTicketModal: (state) => {
      state.newTicketModal = !state.newTicketModal;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(toggleSuperUserAPI.fulfilled, (state, action) => {
        console.log('toggleSuperUserAPI.fulfilled', action.payload);
        state.superUserToggle = action.payload.superuserView;
        state.superuserModal = false;
      });
  },
});

export const { toggleSuperUser, toggleNotificationVisibility, toggleSuperuserModal, toggleNewProjectModal, toggleNewTicketModal } = uiSlice.actions;
export default uiSlice.reducer;
