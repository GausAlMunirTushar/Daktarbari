import mongoose, { Types, } from "mongoose";

const Schema  = mongoose.Schema;

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is Required"],
        },
        email: {
            type: String,
            required: [true, "Email is Required"],
        },
        password: {
            type: String,
            required: [true, "Password is Required"],
        },
        phone: {
            type: Number,
        },
        photo: {
            type: String,
        },
        role: {
            type: String,
            enum: ["patient", "doctor", "admin"],
            default: "patient",
        },
        gender: {
            type: String,
            enum: ["male", "female", "others"],
        },
        bloodType: {
            type: String,
        },
        appointments: [
            {
                type: Types.ObjectId,
                ref: "Appointment",
            },
        ],
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);
export default User;