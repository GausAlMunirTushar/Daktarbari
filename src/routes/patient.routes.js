import { Router } from 'express';
import { createPatient, getAllPatients } from '../controllers/patient.controller.js';

const router = Router();

router.post('/', createPatient);
router.get('/', getAllPatients);


export { router as patientRoutes }