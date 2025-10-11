import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());

import authRoutes from './routes/AuthRoutes.js';

import projectRoutes from './routes/ProjectRoutes.js';

import superuserRoutes from './routes/SuperuserRoutes.js';

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/superuser', superuserRoutes);

export default app;
