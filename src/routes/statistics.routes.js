import { Router } from 'express';
import { getDoctorAppointmentStatistics, getPatientEngagementMetrics } from '../controllers/statistics.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import authorize from '../middlewares/authorize.js';

const router = Router();

router.get('/doctors/:doctorId/statistics/appointments', authenticate, authorize(['doctor', 'admin']), getDoctorAppointmentStatistics);
router.get('/patients/:patientId/statistics/engagement', authenticate, authorize(['doctor', 'admin']), getPatientEngagementMetrics);

export { router as statisticsRoutes };
