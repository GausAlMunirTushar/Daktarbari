import { Router } from 'express';
import { authRoutes } from './auth.route.js';
import { doctorRoutes } from './doctor.routes.js';
import { userRoutes } from './user.route.js';
import { patientRoutes } from './patient.routes.js';

const router = Router();

router.use('/api/v1/auth', authRoutes);
router.use('/api/v1/users', userRoutes);
router.use('/api/v1/doctors', doctorRoutes);
router.use('/api/v1/patients', patientRoutes)

export { router as Routes }