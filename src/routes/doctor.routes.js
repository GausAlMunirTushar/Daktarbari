import { Router } from 'express';
import  { createDoctor, deleteDoctor, getAllDoctors, getDoctorById, updateDoctor }  from '../controllers/doctor.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import authorize from '../middlewares/authorize.js';

const router = Router();

router.get('/', authenticate, getAllDoctors)
router.post('/', authenticate , authorize(["admin"]) ,createDoctor )
router.get('/:id', authenticate, getDoctorById)
router.put('/:id', authenticate, authorize(['admin']) , updateDoctor)
router.delete('/:id', authenticate, authorize(['admin']) , deleteDoctor)

export { router as doctorRoutes }