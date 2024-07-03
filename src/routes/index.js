import { Router } from 'express';
import { authRoutes } from './auth.routes.js';
import { doctorRoutes } from './doctor.routes.js';
import { patientRoutes } from './patient.routes.js';
import { appointmentRoutes } from './appointment.routes.js';
import { medicalRecordRoutes } from './record.routes.js';
import { invoiceRoutes } from './invoice.routes.js';

const router = Router();

router.use('/api/v1/auth', authRoutes);
router.use('/api/v1/doctors', doctorRoutes);
router.use('/api/v1/patients', patientRoutes)
router.use('/api/v1/appointments', appointmentRoutes);
router.use('/api/v1/patients', medicalRecordRoutes)
router.use('/api/v1/invoices', invoiceRoutes)

export { router as Routes }