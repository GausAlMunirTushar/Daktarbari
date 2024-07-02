// routes/notification.routes.js

import { Router } from 'express';
import { sendNotificationToPatient, sendNotificationToDoctor } from '../controllers/notification.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import authorize from '../middlewares/authorize.js';

const router = Router();

router.post('/notifications/patients/:patientId', authenticate, authorize(['doctor', 'admin']), sendNotificationToPatient);
router.post('/notifications/doctors/:doctorId', authenticate, authorize(['admin']), sendNotificationToDoctor);

export { router as notificationRoutes };
