import mongoose from "mongoose";

const Schema = mongoose.Schema;

const appointmentSchema = new Schema(
    {
        patient: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Patient",
        },
        doctor: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Doctor",
        },
        ticketPrice: {
            type: String,
            required: true,
        },
        appointmentDate: {
            type: Date,
            required: true,
        },
        timeSlot: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ['scheduled', 'completed', 'cancelled'],
            default: 'scheduled',
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


