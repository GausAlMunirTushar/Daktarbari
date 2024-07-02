import mongoose from "mongoose";

const Schema = mongoose.Schema;

const invoiceSchema = new Schema(
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
        appointment: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Appointment",
        },
        amount: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ['paid', 'unpaid', 'pending'],
            default: 'pending',
        },
        issueDate: {
            type: Date,
            required: true,
            default: Date.now,
        },
        dueDate: {
            type: Date,
            required: true,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

const Invoice = mongoose.model("Invoice", invoiceSchema);
export default Invoice;
