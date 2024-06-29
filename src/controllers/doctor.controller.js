import Doctor from "../models/doctor.model.js";
import { logger } from "../utils/logger.js";

const getAllDoctors = async (_req, res) => {
    try {
        const doctors = await Doctor.find();
        res.status(200).json({
            success: true,
            data: doctors,
        });
    } catch (error) {
        logger.error(`Failed to fetch doctors: ${error.message}`);
        res.status(500).json({
            success: false,
            message: "Server Error. Please try again later.",
        });
    }
};

const getDoctorById = async (req, res) => {
    const { id } = req.params;
    try {
        const doctor = await Doctor.findById(id);
        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found",
            });
        }
        res.status(200).json({
            success: true,
            data: doctor,
        });
    } catch (error) {
        logger.error(`Failed to fetch doctor: ${error.message}`);
        res.status(500).json({
            success: false,
            message: "Server Error. Please try again later.",
        });
    }
};

/**
 * Creates a new doctor in the database.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the doctor is created.
 */
const createDoctor = async (req, res) => {
    try {
        const { email } = req.body;
        const doctorExists = await Doctor.findOne({ email });
        if (doctorExists) {
            return res.status(400).json({
                success: false,
                message: "Doctor already exists",
            });
        }
        const doctor = await Doctor.create(req.body);
        res.status(201).json({
            success: true,
            data: doctor,
        });
    } catch (error) {
        logger.error(`Failed to create doctor: ${error.message}`);
        res.status(500).json({
            success: false,
            message: "Server Error. Please try again later.",
        });
    }
};

const updateDoctor = async (req, res) => {
    const { id } = req.params;
    try {
        const doctor = await Doctor.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found",
            });
        }
        res.status(200).json({
            success: true,
            data: doctor,
        });
    } catch (error) {
        logger.error(`Failed to update doctor: ${error.message}`);
        res.status(500).json({
            success: false,
            message: "Server Error. Please try again later.",
        });
    }
};

const deleteDoctor = async (req, res) => {
    const { id } = req.params;
    try {
        const doctor = await Doctor.findByIdAndDelete(id);
        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Doctor deleted successfully",
        });
    } catch (error) {
        logger.error(`Failed to delete doctor: ${error.message}`);
        res.status(500).json({
            success: false,
            message: "Server Error. Please try again later.",
        });
    }

}
export { getAllDoctors, getDoctorById, createDoctor, updateDoctor, deleteDoctor };
