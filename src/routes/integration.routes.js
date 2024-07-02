// routes/integration.routes.js

import { Router } from 'express';
import { integrateWithCalendar } from '../controllers/calendarIntegration.controller.js';
import { integrateWithPaymentGateway } from '../controllers/paymentIntegration.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import authorize from '../middlewares/authorize.js';

const router = Router();

router.post('/integrations/calendar', authenticate, authorize(['doctor', 'admin']), integrateWithCalendar);
router.post('/integrations/payment', authenticate, authorize(['patient']), integrateWithPaymentGateway);

export { router as integrationRoutes };
