import Prescription from "../models/prescription.model.js";
import Patient from "../models/patient.model.js";
import Doctor from "../models/doctor.model.js";

const listAllPrescriptions = async (req, res) => {
    try {
        const prescriptions = await Prescription.find().populate('patient').populate('doctor');
        res.status(200).json({
            message: "Fetched all prescriptions",
            prescriptions,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch prescriptions",
            error: error.message,
        });
    }
};

const getPrescriptionById = async (req, res) => {
    const prescriptionId = req.params.id;

    try {
        const prescription = await Prescription.findById(prescriptionId).populate('patient').populate('doctor');
        if (!prescription) {
            return res.status(404).json({
                message: "Prescription not found",
            });
        }

        res.status(200).json({
            message: "Fetched prescription details",
            prescription,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch prescription details",
            error: error.message,
        });
    }
};

const createPrescription = async (req, res) => {
    const { patientId, doctorId, medications, notes } = req.body;

    try {
        const patient = await Patient.findById(patientId);
        const doctor = await Doctor.findById(doctorId);

        if (!patient || !doctor) {
            return res.status(404).json({
                message: "Invalid patient or doctor ID",
            });
        }

        const prescription = new Prescription({
            patient: patientId,
            doctor: doctorId,
            medications,
            notes,
        });

        const savedPrescription = await prescription.save();
        res.status(201).json({
            message: "Prescription created successfully",
            prescription: savedPrescription,
        });
    } catch (error) {
        res.status(400).json({
            message: "Error creating prescription",
            error: error.message,
        });
    }
};

const updatePrescription = async (req, res) => {
    const prescriptionId = req.params.id;
    const updateData = req.body;

    try {
        const prescription = await Prescription.findByIdAndUpdate(prescriptionId, updateData, { new: true, runValidators: true });

        if (!prescription) {
            return res.status(404).json({ message: "Prescription not found" });
        }

        res.status(200).json({
            message: "Prescription updated successfully",
            prescription,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to update prescription",
            error: error.message,
        });
    }
};

const deletePrescription = async (req, res) => {
    const prescriptionId = req.params.id;

    try {
        const prescription = await Prescription.findByIdAndDelete(prescriptionId);

        if (!prescription) {
            return res.status(404).json({ message: "Prescription not found" });
        }

        res.status(200).json({
            message: "Prescription deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete prescription",
            error: error.message,
        });
    }
};

export { listAllPrescriptions, getPrescriptionById, createPrescription, updatePrescription, deletePrescription };
