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

router.get('/invoices', authenticate, authorize(['admin']), listAllInvoices);
router.get('/invoices/:id', authenticate, authorize(['admin']), getInvoiceById);
router.post('/invoices', authenticate, authorize(['admin']), generateInvoice);
router.put('/invoices/:id', authenticate, authorize(['admin']), updateInvoice);
router.delete('/invoices/:id', authenticate, authorize(['admin']), deleteInvoice);

export { router as invoiceRoutes };
