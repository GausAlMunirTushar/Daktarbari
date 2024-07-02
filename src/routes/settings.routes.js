// routes/settings.routes.js

import { Router } from 'express';
import { getSettings, updateSettings } from '../controllers/settings.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import authorize from '../middlewares/authorize.js';

const router = Router();

router.get('/settings', authenticate, authorize(['admin']), getSettings);
router.put('/settings', authenticate, authorize(['admin']), updateSettings);

export { router as settingsRoutes };
