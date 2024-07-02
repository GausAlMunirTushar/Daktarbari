import mongoose from "mongoose";

const Schema = mongoose.Schema;

const medicalRecordSchema = new Schema(
    {
        patient: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Patient",
        },
        recordType: {
            type: String,
            required: true,
        },
        recordDate: {
            type: Date,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

const MedicalRecord = mongoose.model("MedicalRecord", medicalRecordSchema);
export default MedicalRecord;
