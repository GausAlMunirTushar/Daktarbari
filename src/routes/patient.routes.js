import { Router } from 'express';
import { createPatient, getAllPatients, getPatientById } from '../controllers/patient.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import authorize from '../middlewares/authorize.js';

const router = Router();

router.post('/', authenticate, authorize(["doctor", "admin"]), createPatient);
router.get('/', getAllPatients);
router.get('/:id', getPatientById);



export { router as patientRoutes }