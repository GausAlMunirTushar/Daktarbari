// controllers/report.controller.js

import Appointment from "../models/appointment.model.js";
import Patient from "../models/patient.model.js";
import MedicalRecord from "../models/medicalRecord.model.js";

// Generate appointment report
const generateAppointmentReport = async (req, res) => {
    const { startDate, endDate } = req.query;

    try {
        const query = {};
        if (startDate && endDate) {
            query.appointmentDate = {
                $gte: new Date(startDate),
                $lte: new Date(endDate),
            };
        }

        const appointments = await Appointment.find(query)
            .populate("patient", "name")
            .populate("doctor", "name specialization");

        const report = appointments.map(appointment => ({
            patient: appointment.patient.name,
            doctor: appointment.doctor.name,
            specialization: appointment.doctor.specialization,
            appointmentDate: appointment.appointmentDate,
            timeSlot: appointment.timeSlot,
            status: appointment.status,
            isPaid: appointment.isPaid,
            ticketPrice: appointment.ticketPrice,
        }));

        res.status(200).json({
            message: "Appointment report generated successfully",
            report,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to generate appointment report",
            error: error.message,
        });
    }
};

// Generate patient health report
const generatePatientHealthReport = async (req, res) => {
    const { patientId } = req.params;

    try {
        const patient = await Patient.findById(patientId).populate("user", "name email");
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        const medicalRecords = await MedicalRecord.find({ patient: patientId });

        const report = {
            patient: {
                name: patient.name,
                email: patient.user.email,
                dateOfBirth: patient.dateOfBirth,
            },
            medicalRecords: medicalRecords.map(record => ({
                date: record.date,
                description: record.description,
                diagnosis: record.diagnosis,
                treatment: record.treatment,
                doctor: record.doctor,
            })),
        };

        res.status(200).json({
            message: "Patient health report generated successfully",
            report,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to generate patient health report",
            error: error.message,
        });
    }
};

export { generateAppointmentReport, generatePatientHealthReport };
