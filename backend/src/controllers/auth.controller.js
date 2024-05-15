import User from "../models/user.model.js";
import Doctor from "../models/doctor.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

const register = async (req, res) => {
    const { name, email, password, role, gender, photo, phone } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        let newUser;
        if (role === "patient") {
            newUser = new User({
                name,
                email,
                password: hashedPassword,
                photo,
                phone,
                gender,
                role,
            });
        } else if (role === "doctor") {
            newUser = new Doctor({
                name,
                email,
                password: hashedPassword,
                photo,
                phone,
                gender,
                role,
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "Invalid user role",
            });
        }

        await newUser.save();

        res.status(201).json({
            success: true,
            message: "User successfully created",
            data: newUser,
        });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({
            success: false,
            message: "Failed to register user",
        });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user;
        // Assuming you have a `role` field in your user schema
        const patient = await User.findOne({ email, role: "patient" });
        const doctor = await User.findOne({ email, role: "doctor" });

        if (patient) {
            user = patient;
        } else if (doctor) {
            user = doctor;
        }

        // check if user not found
        if (!user) {
            return res.status(404).json({
                status: false,
                message: "User not found",
            });
        }

        // compare password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                status: false,
                message: "Invalid credentials",
            });
        }

        //generate token
        const token = generateToken(user);

        const { _id, name, role, appointments } = user._doc;

        res.status(200).json({
            status: true,
            message: "User login successful",
            token: token,
            data: { _id, name, role, appointments }, // Send only necessary data, removing password for security
        });
    } catch (err) {
        res.status(500).json({
            status: false,
            message: "Failed to login",
        });
    }
};
export { register, login };
