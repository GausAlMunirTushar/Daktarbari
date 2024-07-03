// routes/miscellaneous.routes.js

import { Router } from 'express';
import { exportData, importData } from '../controllers/data.controller.js';
import { searchAppointmentsByDateRange } from '../controllers/appointment.controller.js';
import { listAvailableSlots } from '../controllers/doctor.controller.js';
import { requestFeedback } from '../controllers/feedback.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import authorize from '../middlewares/authorize.js';

const router = Router();

router.get('/data/export', authenticate, authorize(['admin']), exportData);
router.post('/data/import', authenticate, authorize(['admin']), importData);
router.get('/appointments/search', authenticate, authorize(['doctor', 'admin']), searchAppointmentsByDateRange);
router.get('/doctors/:doctorId/available-slots', authenticate, authorize(['doctor', 'admin']), listAvailableSlots);
router.post('/feedback/patients/:patientId', authenticate, authorize(['doctor', 'admin']), requestFeedback);


export { router as miscellaneousRoutes };
