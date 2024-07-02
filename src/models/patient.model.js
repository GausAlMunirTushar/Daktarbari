import mongoose, { Schema } from "mongoose";

const patientSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        dateOfBirth: {
            type: String,
            required: [true, "Birthdate is Required"],
        },
        gender: {
            type: String,
            required: true,
            enum: ["male", "female", "others"],
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
