import MedicalRecord from "../models/medicalRecord.model.js";
import Patient from "../models/patient.model.js";

const getMedicalRecords = async (req, res) => {
    const patientId = req.params.patientId;

    try {
        const medicalRecords = await MedicalRecord.find({ patient: patientId });
        res.status(200).json({
            message: "Fetched medical records",
            medicalRecords,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch medical records",
            error: error.message,
        });
    }
};

const addMedicalRecord = async (req, res) => {
    const patientId = req.params.patientId;
    const { recordType, recordDate, description } = req.body;

    try {
        const patient = await Patient.findById(patientId);
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        const medicalRecord = new MedicalRecord({
            patient: patientId,
            recordType,
            recordDate,
            description,
        });

        const savedMedicalRecord = await medicalRecord.save();
        res.status(201).json({
            message: "Medical record added successfully",
            medicalRecord: savedMedicalRecord,
        });
    } catch (error) {
        res.status(400).json({
            message: "Error adding medical record",
            error: error.message,
        });
    }
};

const updateMedicalRecord = async (req, res) => {
    const patientId = req.params.patientId;
    const recordId = req.params.recordId;
    const updateData = req.body;

    try {
        const medicalRecord = await MedicalRecord.findOneAndUpdate(
            { _id: recordId, patient: patientId },
            updateData,
            { new: true, runValidators: true }
        );

        if (!medicalRecord) {
            return res.status(404).json({ message: "Medical record not found" });
        }

        res.status(200).json({
            message: "Medical record updated successfully",
            medicalRecord,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to update medical record",
            error: error.message,
        });
    }
};

const deleteMedicalRecord = async (req, res) => {
    const patientId = req.params.patientId;
    const recordId = req.params.recordId;

    try {
        const medicalRecord = await MedicalRecord.findOneAndDelete({ _id: recordId, patient: patientId });

        if (!medicalRecord) {
            return res.status(404).json({ message: "Medical record not found" });
        }

        res.status(200).json({
            message: "Medical record deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete medical record",
            error: error.message,
        });
    }
};

export { getMedicalRecords, addMedicalRecord, updateMedicalRecord, deleteMedicalRecord };
