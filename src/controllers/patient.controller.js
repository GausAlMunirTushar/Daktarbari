import Patient from "../models/patient.model.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

const createPatient = async (req, res) => {
    const { username, email, password, gender, name, dateOfBirth } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            username,
            email,
            password: hashedPassword,
            role: 'patient',
            gender,
        });
        const savedUser = await user.save();

        // Create the Doctor using relevant fields and the user's _id
        const doctor = new Patient({
            name,
            dateOfBirth,
            user: savedUser._id
        });
        await doctor.save();

        res.status(201).json({
            message: "Doctor created successfully",
            doctor
        });
    } catch (error) {
        res
            .status(400)
            .send({
                message: "Error in creating patient",
                error: error.message,
            });
    }
};

const getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find();
        res.status(200).json({
            message: "Fetched all patients",
            patients,
        });
    } catch (err) {
        res.status(500).json({
            message: "Failed to fetch patients",
            error: err.message,
        });
    }
}

const getPatientById = async (req, res) => {
    const patientId = req.params.id;
    try {
        const patient = await Patient.findById(patientId);
        res.status(200).json({
            message: "Fetched patient by id",
            patient,
        });
    }
    catch (err) {
        res.status(500).json({
            message: "Failed to fetch patient",
            error: err.message,
        });
    }
}

export { createPatient, getAllPatients, getPatientById }
