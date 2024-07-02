import { Router } from 'express';
import {
    listAllPrescriptions,
    getPrescriptionById,
    createPrescription,
    updatePrescription,
    deletePrescription,
} from '../controllers/prescription.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import authorize from '../middlewares/authorize.js';

const router = Router();

router.get('/prescriptions', authenticate, authorize(['doctor', 'admin']), listAllPrescriptions);
router.get('/prescriptions/:id', authenticate, authorize(['doctor', 'admin']), getPrescriptionById);
router.post('/prescriptions', authenticate, authorize(['doctor']), createPrescription);
router.put('/prescriptions/:id', authenticate, authorize(['doctor']), updatePrescription);
router.delete('/prescriptions/:id', authenticate, authorize(['doctor', 'admin']), deletePrescription);

export { router as prescriptionRoutes };
