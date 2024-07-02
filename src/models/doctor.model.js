import mongoose, { Schema } from "mongoose";

const doctorSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        name: {
            type: String,
            required: true,
        },
        specialization: {
            type: String,
            required: [true, "Specialization is required"],
        },
        qualifications: [String],
        bio: {
            type: String,
            maxlength: 50,
        },
        about: String,
        ticketPrice: String,
        timeSlots: String,
        reviews: [
            {
                type: Schema.Types.ObjectId,
                ref: "Review",
            },
        ],
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
        appointments: [
            {
                type: Schema.Types.ObjectId,
                ref: "Appointment",
            },
        ]
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;
