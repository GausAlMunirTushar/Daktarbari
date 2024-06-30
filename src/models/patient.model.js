import mongoose, { Schema } from "mongoose";

const patientSchema = new Schema ({
    id: {
        type: Schema.Types.ObjectId,
        required: true,
        auto: true
    },
    name: {
        type: String,
        required: [true, "Name is Required"],
    },
    birthdate: {
        type: String,
        required: [true, "Birthdate is Required"],
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female", "Others"]
    }
}, {
    versionKey: false,
    timestamps: true
});

const Patient = mongoose.model("Patient", patientSchema);
export default Patient;