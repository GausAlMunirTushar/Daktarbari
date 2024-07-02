import mongoose, { Schema } from "mongoose";

const patientSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        name: {
            type: String,
            required: true,
        },
        dateOfBirth: {
            type: String,
            required: [true, "Birthdate is Required"],
        },
        appointments: [
            {
                type: Schema.Types.ObjectId,
                ref: "Appointment",
            },
        ],
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

const Patient = mongoose.model("Patient", patientSchema);
export default Patient;
