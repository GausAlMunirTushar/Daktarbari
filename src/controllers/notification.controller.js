// controllers/notification.controller.js

import { sendNotification } from "../services/notification.service.js";
import Patient from "../models/patient.model.js";
import Doctor from "../models/doctor.model.js";

const sendNotificationToPatient = async (req, res) => {
    const { patientId } = req.params;
    const { message, type } = req.body;

    try {
        const patient = await Patient.findById(patientId).populate('user');
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        await sendNotification({
            userId: patient.user._id,
            message,
            type,
        });

        res.status(200).json({ message: "Notification sent to patient successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to send notification", error: error.message });
    }
};

const sendNotificationToDoctor = async (req, res) => {
    const { doctorId } = req.params;
    const { message, type } = req.body;

    try {
        const doctor = await Doctor.findById(doctorId).populate('user');
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        await sendNotification({
            userId: doctor.user._id,
            message,
            type,
        });

        res.status(200).json({ message: "Notification sent to doctor successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to send notification", error: error.message });
    }
};

export { sendNotificationToPatient, sendNotificationToDoctor };
