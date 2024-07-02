import mongoose from "mongoose";

const Schema = mongoose.Schema;

const prescriptionSchema = new Schema(
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
        medications: [
            {
                name: {
                    type: String,
                    required: true,
                },
                dosage: {
                    type: String,
                    required: true,
                },
                frequency: {
                    type: String,
                    required: true,
                },
            },
        ],
        issueDate: {
            type: Date,
            required: true,
            default: Date.now,
        },
        notes: {
            type: String,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

const Prescription = mongoose.model("Prescription", prescriptionSchema);
export default Prescription;
