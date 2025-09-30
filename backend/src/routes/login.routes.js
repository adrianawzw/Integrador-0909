// backend/src/routes/login.routes.js
import { Router } from 'express';
import { login } from '../controllers/login/login.controller.js';

const router = Router();

// Solo login
router.post('/login', login); // POST /api/auth/login

export default router;
