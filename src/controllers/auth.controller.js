import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

const register = async (req, res) => {
    const { username, email, password, role, gender } = req.body;

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
        newUser = new User({
            username,
            email,
            password: hashedPassword,
            role,
            gender,
        });
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
        // Find user by email and role in one query
        const user = await User.findOne({ email })

        // Check if user exists
        if (!user) {
            return res.status(404).json({
                status: false,
                message: "User not found",
            });
        }

        // Compare password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                status: false,
                message: "Invalid credentials",
            });
        }

        // Remove sensitive information from user object
        delete user.password;

        // Generate token
        const token = generateToken(user);

        res.status(200).json({
            status: true,
            message: "User login successful",
            token: token,
        });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({
            status: false,
            message: "Failed to login",
        });
    }
};
export { register, login };
