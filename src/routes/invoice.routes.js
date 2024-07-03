import { Router } from 'express';
import {
    listAllInvoices,
    getInvoiceById,
    generateInvoice,
    updateInvoice,
    deleteInvoice,
} from '../controllers/invoice.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import authorize from '../middlewares/authorize.js';

const router = Router();

router.get('/', authenticate, authorize(['admin']), listAllInvoices);
router.get('/:id', authenticate, authorize(['admin']), getInvoiceById);
router.post('/', authenticate, authorize(['admin']), generateInvoice);
router.put('/:id', authenticate, authorize(['admin']), updateInvoice);
router.delete('/:id', authenticate, authorize(['admin']), deleteInvoice);

export { router as invoiceRoutes };
