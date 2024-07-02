import { Router } from 'express';
import  createDoctor  from '../controllers/doctor.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import authorize from '../middlewares/authorize.js';

const router = Router();

// router.get('/', authenticate, getAllDoctors)
router.post('/', authenticate , authorize(["admin"]) ,createDoctor )
router.get('/:id', )
// router.put('/:id', authenticate, authorize(['admin']) , updateDoctor)
// router.delete('/:id', authenticate, authorize(['admin']) , deleteDoctor)

export { router as doctorRoutes }