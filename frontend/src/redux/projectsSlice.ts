import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../api/axios';

interface ProjectsState {
  projects: any[];
  activeProject: any;
  loading: boolean;
}

const initialState: ProjectsState = {
  projects: [],
  activeProject: null,
  loading: false,
};

export const fetchProjects = createAsyncThunk('projects/fetchProjects', async () => {
  const response = await axiosInstance.get('/projects');
  return response.data;
});

export const createProject = createAsyncThunk('projects/createProject', async (projectData: { name: string; description: string }) => {
  const response = await axiosInstance.post('/projects', projectData);
  return response.data;
});

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setActiveProject: (state, action: PayloadAction<any>) => {
      state.activeProject = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state) => {
        state.loading = false;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.projects.push(action.payload);
      });
  },
});

export const { setActiveProject } = projectsSlice.actions;
export default projectsSlice.reducer;
