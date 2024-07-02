import { Router } from 'express';
import {
    getMedicalRecords,
    addMedicalRecord,
    updateMedicalRecord,
    deleteMedicalRecord,
} from '../controllers/medicalRecord.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import authorize from '../middlewares/authorize.js';

const router = Router();

router.get('/:patientId/medical-records', authenticate, authorize(['doctor', 'admin']), getMedicalRecords);
router.post('/:patientId/medical-records', authenticate, authorize(['doctor', 'admin']), addMedicalRecord);
router.put('/:patientId/medical-records/:recordId', authenticate, authorize(['doctor', 'admin']), updateMedicalRecord);
router.delete('/:patientId/medical-records/:recordId', authenticate, authorize(['doctor', 'admin']), deleteMedicalRecord);

export { router as medicalRecordRoutes };
