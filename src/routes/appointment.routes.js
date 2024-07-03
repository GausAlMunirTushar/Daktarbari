import { Router } from 'express';
import {
    createAppointment,
    getAllAppointments,
    getAppointmentById,
    updateAppointment,
    deleteAppointment,
} from '../controllers/appointment.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import authorize from '../middlewares/authorize.js';

const router = Router();

router.post('/', authenticate, authorize(['patient', 'doctor', 'admin']), createAppointment);
router.get('/', authenticate, authorize(['doctor', 'admin']), getAllAppointments);
router.get('/:appointmentId', authenticate, authorize(['doctor', 'admin']), getAppointmentById);
router.put('/:appointmentId', authenticate, authorize(['patient', 'doctor', 'admin']), updateAppointment);
router.delete('/:appointmentId', authenticate, authorize(['patient', 'doctor', 'admin']), deleteAppointment);

export { router as appointmentRoutes };
