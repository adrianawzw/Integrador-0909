import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Rutas
import adminRoutes from './routes/admin/admin.routes.js';
import loginRoutes from './routes/login.routes.js';
import panelRoutes from './routes/panel.routes.js';

// Middlewares
import { loginMiddleware } from './middlewares/login.middleware.js';


dotenv.config();

const app = express();

// Middlewares globales
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());

// Health check
app.get('/healthz', (req, res) => res.send('ok'));

// Rutas públicas
app.use('/api/login', loginRoutes);

// Rutas protegidasx
app.use('/api/panel', loginMiddleware, panelRoutes);

// Admin (rutas ya tienen middlewares internos)
app.use('/api/admin', adminRoutes);

export default app;
