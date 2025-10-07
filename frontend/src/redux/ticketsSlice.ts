import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../api/axios';

interface TicketsState {
  tickets: any[];
  loading: boolean;
}

const initialState: TicketsState = {
  tickets: [],
  loading: false,
};

export const fetchTickets = createAsyncThunk('tickets/fetchTickets', async (projectId: string) => {
  const response = await axiosInstance.get(`/projects/${projectId}/tickets`);
  return response.data;
});

export const createTicket = createAsyncThunk('tickets/createTicket', async (ticketData: any) => {
  const response = await axiosInstance.post(`/projects/${ticketData.projectId}/tickets`, ticketData);
  return response.data;
});

export const updateTicket = createAsyncThunk('tickets/updateTicket', async (ticketData: any) => {
  const response = await axiosInstance.put(`/projects/${ticketData.projectId}/tickets/${ticketData.id}`, ticketData);
  return response.data;
});

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    addTicket: (state, action: PayloadAction<any>) => {
      state.tickets.push(action.payload);
    },
    updateTicketInList: (state, action: PayloadAction<any>) => {
      const index = state.tickets.findIndex((ticket) => ticket.id === action.payload.id);
      if (index !== -1) {
        state.tickets[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets = action.payload;
      })
      .addCase(fetchTickets.rejected, (state) => {
        state.loading = false;
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.tickets.push(action.payload);
      })
      .addCase(updateTicket.fulfilled, (state, action) => {
        const index = state.tickets.findIndex((ticket) => ticket.id === action.payload.id);
        if (index !== -1) {
          state.tickets[index] = action.payload;
        }
      });
  },
});

export const { addTicket, updateTicketInList } = ticketsSlice.actions;
export default ticketsSlice.reducer;
