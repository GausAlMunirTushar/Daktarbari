import { Router } from 'express';
import { authRoutes } from './auth.routes.js';
import { doctorRoutes } from './doctor.routes.js';
import { patientRoutes } from './patient.routes.js';

const router = Router();

router.use('/api/v1/auth', authRoutes);
router.use('/api/v1/doctors', doctorRoutes);
router.use('/api/v1/patients', patientRoutes)

export { router as Routes }