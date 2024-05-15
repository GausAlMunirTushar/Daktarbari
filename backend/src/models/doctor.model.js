import mongoose from "mongoose";

const { Schema } = mongoose;

const doctorSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    phone: {
        type: String, // Changed to string to accommodate international numbers
        required: [true, "Phone number is required"],
    },
    photo: String,
    ticketPrice: String,
    role: String,
    specialization: String,
    qualifications: [String], // Array of strings for qualifications
    bio: {
        type: String,
        maxlength: 50, // Fixed typo in maxlength
    },
    about: String,
    timeSlots: String,
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review",
    }],
    averageRating: {
        type: Number,
        default: 0,
    },
    totalRating: {
        type: Number,
        default: 0,
    },
    isApproved: {
        type: String,
        enum: ["pending", "approved", "cancelled"],
        default: "pending",
    },
    appointments: [{
        type: Schema.Types.ObjectId,
        ref: "Appointment",
    }],
}, {
    versionKey: false,
    timestamps: true,
});

const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;
