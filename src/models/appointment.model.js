import mongoose from "mongoose";

const Schema = mongoose.Schema;

const appointmentSchema = new Schema(
    {
        doctor: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Doctor",
        },
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        ticketPrice: {
            type: String,
            required: true,
        },
        appointmentDate: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "approved", "cancelled"],
            default: "pending",
        },
        isPaid: {
            type: Boolean,
            default: true,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;


