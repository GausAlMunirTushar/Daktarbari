import Invoice from "../models/invoice.model.js";
import Appointment from "../models/appointment.model.js";
import Patient from "../models/patient.model.js";
import Doctor from "../models/doctor.model.js";

const listAllInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find().populate('patient').populate('doctor').populate('appointment');
        res.status(200).json({
            message: "Fetched all invoices",
            invoices,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch invoices",
            error: error.message,
        });
    }
};

const getInvoiceById = async (req, res) => {
    const invoiceId = req.params.id;

    try {
        const invoice = await Invoice.findById(invoiceId).populate('patient').populate('doctor').populate('appointment');
        if (!invoice) {
            return res.status(404).json({
                message: "Invoice not found",
            });
        }

        res.status(200).json({
            message: "Fetched invoice details",
            invoice,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch invoice details",
            error: error.message,
        });
    }
};

const generateInvoice = async (req, res) => {
    const { patientId, doctorId, appointmentId, amount, dueDate } = req.body;

    try {
        const patient = await Patient.findById(patientId);
        const doctor = await Doctor.findById(doctorId);
        const appointment = await Appointment.findById(appointmentId);

        if (!patient || !doctor || !appointment) {
            return res.status(404).json({
                message: "Invalid patient, doctor, or appointment ID",
            });
        }

        const invoice = new Invoice({
            patient: patientId,
            doctor: doctorId,
            appointment: appointmentId,
            amount,
            dueDate,
        });

        const savedInvoice = await invoice.save();
        res.status(201).json({
            message: "Invoice generated successfully",
            invoice: savedInvoice,
        });
    } catch (error) {
        res.status(400).json({
            message: "Error generating invoice",
            error: error.message,
        });
    }
};

const updateInvoice = async (req, res) => {
    const invoiceId = req.params.id;
    const updateData = req.body;

    try {
        const invoice = await Invoice.findByIdAndUpdate(invoiceId, updateData, { new: true, runValidators: true });

        if (!invoice) {
            return res.status(404).json({ message: "Invoice not found" });
        }

        res.status(200).json({
            message: "Invoice updated successfully",
            invoice,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to update invoice",
            error: error.message,
        });
    }
};

const deleteInvoice = async (req, res) => {
    const invoiceId = req.params.id;

    try {
        const invoice = await Invoice.findByIdAndDelete(invoiceId);

        if (!invoice) {
            return res.status(404).json({ message: "Invoice not found" });
        }

        res.status(200).json({
            message: "Invoice deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete invoice",
            error: error.message,
        });
    }
};

export { listAllInvoices, getInvoiceById, generateInvoice, updateInvoice, deleteInvoice };
