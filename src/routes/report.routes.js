// routes/report.routes.js

import { Router } from 'express';
import { generateAppointmentReport, generatePatientHealthReport } from '../controllers/report.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import authorize from '../middlewares/authorize.js';

const router = Router();

router.get('/reports/appointments', authenticate, authorize(['admin', 'doctor']), generateAppointmentReport);
router.get('/reports/patients/:patientId/health', authenticate, authorize(['admin', 'doctor']), generatePatientHealthReport);

export { router as reportRoutes };
