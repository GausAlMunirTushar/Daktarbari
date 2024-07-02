import Appointment from "../models/appointment.model.js";
import Patient from "../models/patient.model.js";
import Doctor from "../models/doctor.model.js";

const createAppointment = async (req, res) => {
    const { patientId, doctorId, ticketPrice, appointmentDate, timeSlot } = req.body;

    try {
        const patient = await Patient.findById(patientId);
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        const appointment = new Appointment({
            patient: patientId,
            doctor: doctorId,
            ticketPrice,
            appointmentDate,
            timeSlot,
            isPaid: true, // Assuming all appointments are paid by default
        });

        const savedAppointment = await appointment.save();
        res.status(201).json({
            message: "Appointment created successfully",
            appointment: savedAppointment,
        });
    } catch (error) {
        res.status(400).json({
            message: "Error creating appointment",
            error: error.message,
        });
    }
};

const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find()
            .populate('patient', 'name')
            .populate('doctor', 'name');
        res.status(200).json({
            message: "Fetched all appointments",
            appointments,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch appointments",
            error: error.message,
        });
    }
};

const getAppointmentById = async (req, res) => {
    const appointmentId = req.params.appointmentId;

    try {
        const appointment = await Appointment.findById(appointmentId)
            .populate('patient', 'name')
            .populate('doctor', 'name');
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }
        res.status(200).json({
            message: "Fetched appointment",
            appointment,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch appointment",
            error: error.message,
        });
    }
};

const updateAppointment = async (req, res) => {
    const appointmentId = req.params.appointmentId;
    const updateData = req.body;

    try {
        const appointment = await Appointment.findByIdAndUpdate(appointmentId, updateData, {
            new: true,
            runValidators: true,
        });

        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        res.status(200).json({
            message: "Updated appointment successfully",
            appointment,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to update appointment",
            error: error.message,
        });
    }
};

const deleteAppointment = async (req, res) => {
    const appointmentId = req.params.appointmentId;

    try {
        const appointment = await Appointment.findByIdAndDelete(appointmentId);
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }
        res.status(200).json({
            message: "Deleted appointment successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete appointment",
            error: error.message,
        });
    }
};

export {
    createAppointment,
    getAllAppointments,
    getAppointmentById,
    updateAppointment,
    deleteAppointment,
};
