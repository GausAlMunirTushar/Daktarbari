import { Router } from 'express';
import { createDoctor, deleteDoctor, getAllDoctors, updateDoctor } from '../controllers/doctor.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', authenticate, getAllDoctors)
router.post('/', createDoctor )
router.get('/:id', )
router.put('/:id', updateDoctor)
router.delete('/:id', deleteDoctor)

export { router as doctorRoutes }