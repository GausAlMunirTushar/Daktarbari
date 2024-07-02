import Appointment from "../models/appointment.model.js";
import Patient from "../models/patient.model.js";

const getDoctorAppointmentStatistics = async (req, res) => {
    const doctorId = req.params.doctorId;

    try {
        const appointments = await Appointment.find({ doctor: doctorId });

        const totalAppointments = appointments.length;
        const completedAppointments = appointments.filter(appointment => appointment.status === 'completed').length;
        const scheduledAppointments = appointments.filter(appointment => appointment.status === 'scheduled').length;
        const cancelledAppointments = appointments.filter(appointment => appointment.status === 'cancelled').length;

        res.status(200).json({
            totalAppointments,
            completedAppointments,
            scheduledAppointments,
            cancelledAppointments
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch doctor's appointment statistics",
            error: error.message,
        });
    }
};

const getPatientEngagementMetrics = async (req, res) => {
    const patientId = req.params.patientId;

    try {
        const appointments = await Appointment.find({ patient: patientId });

        const totalAppointments = appointments.length;
        const completedAppointments = appointments.filter(appointment => appointment.status === 'completed').length;
        const cancelledAppointments = appointments.filter(appointment => appointment.status === 'cancelled').length;

        res.status(200).json({
            totalAppointments,
            completedAppointments,
            cancelledAppointments
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch patient engagement metrics",
            error: error.message,
        });
    }
};

export { getDoctorAppointmentStatistics, getPatientEngagementMetrics };
