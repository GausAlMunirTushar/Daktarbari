import Doctor from "../models/doctor.model.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

const createDoctor = async (req, res) => {
    try {
        const { username, email, password, gender, name, specialization, qualifications, bio, about, ticketPrice, timeSlots } = req.body;

        // Check if the user already exists with the same email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // If the user doesn't exist, proceed to create a new User
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            username,
            email,
            password: hashedPassword,
            role: 'doctor',
            gender,
        });
        const savedUser = await user.save();

        // Create the Doctor using relevant fields and the user's _id
        const doctor = new Doctor({
            name,
            specialization,
            qualifications,
            bio,
            about,
            ticketPrice,
            timeSlots,
            user: savedUser._id
        });
        await doctor.save();

        res.status(201).json({
            message: "Doctor created successfully",
            doctor
        });
    } catch (error) {
        res.status(400).send(error);
    }
};

const getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find()
        res.status(200).json({
            message: "Fetched all doctors",
            doctors
        })
    } catch (err) {
        res.status(500).json({
            message: "Failed to fetch doctors",
            error: err.message
        });
    }
}

const getDoctorById = async (req, res) => {
    const doctorId = req.params.id;
    try {
        const doctor = await Doctor.findById(doctorId);
        res.status(200).json({
            message: "Fetched doctor",
            doctor
        });
    } catch (err) {
        res.status(500).json({
            message: "Failed to fetch doctor",
            error: err.message
        });
    }
}

const updateDoctor = async (req, res) => {
    const doctorId = req.params.id;
    const updateData = req.body;

    try {
        // Find and update the doctor, and return the updated document
        const doctor = await Doctor.findByIdAndUpdate(doctorId, updateData, {
            new: true, // Return the updated document
            runValidators: true, // Validate the update operation against the schema
        });

        // If the doctor with the given ID does not exist, return an error
        if (!doctor) {
            return res.status(404).json({
                message: "Doctor not found",
            });
        }

        res.status(200).json({
            message: "Updated doctor successfully",
            doctor,
        });
    } catch (err) {
        res.status(500).json({
            message: "Failed to update doctor",
            error: err.message,
        });
    }
};

const deleteDoctor = async (req, res) => {
    const doctorId = req.params.id;
    try {
        const doctor = await Doctor.findByIdAndDelete(doctorId);
        if (!doctor) {
            return res.status(404).json({
                message: "Doctor not found",
            });
        }
         // Delete the associated user
        await User.findByIdAndDelete(doctor.user);

         // Delete the doctor
        await Doctor.findByIdAndDelete(doctorId);

        res.status(200).json({
            message: "Doctor deleted successfully",
        });
    } catch (err) { 
        res.status(500).json({
            message: "Failed to delete doctor",
            error: err.message,
        });
    }
}

export { createDoctor, getAllDoctors, getDoctorById, updateDoctor, deleteDoctor };
