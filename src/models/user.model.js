import mongoose, { Types, } from "mongoose";

const Schema  = mongoose.Schema;

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: [true, "Name is Required"],
        },
        email: {
            type: String,
            unique: true,
            required: [true, "Email is Required"],
        },
        password: {
            type: String,
            required: [true, "Password is Required"],
        },
        phone: {
            type: Number,
        },
        role: {
            type: String,
            enum: ["patient", "doctor", "admin"],
            default: "patient",
        },
        gender: {
            type: String,
            enum: ["male", "female", "others"],
            required: [true, "gender is Required"],
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