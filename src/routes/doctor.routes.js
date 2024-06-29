import { Router } from 'express';
import { getAllDoctors } from '../controllers/doctor.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', authenticate, getAllDoctors)
router.post('/', )
router.get('/:id', )
router.put('/:id', )
router.delete('/:id', )

export { router as doctorRoutes }