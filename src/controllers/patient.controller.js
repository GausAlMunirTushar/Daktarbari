import Patient from "../models/patient.model.js";

const createPatient = async (req, res) => {
    try {
        const patient = new Patient(req.body);
        await patient.save();
        res.status(201).send(patient);
    } catch (error) {
        res
            .status(400)
            .send({
                message: "Error in creating patient",
                error: error.message,
            });
    }
};

const getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find();
        res.status(200).send(patients);
    } catch (error) {
        res
            .status(400)
            .send({
                message: "Error in fetching patients",
                error: error.message,
            });
    }
};

export { createPatient, getAllPatients }
