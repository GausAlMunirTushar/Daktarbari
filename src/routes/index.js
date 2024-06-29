import { Router } from 'express';
import { authRoutes } from './auth.route.js';
import { doctorRoutes } from './doctor.routes.js';
import { userRoutes } from './user.route.js';
const router = Router();

router.use('/api/v1/auth', authRoutes);
router.use('/api/v1/users', userRoutes);
router.use('/api/v1/doctors', doctorRoutes);
export { router as Routes }