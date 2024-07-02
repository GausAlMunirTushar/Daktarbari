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

export default createDoctor;
