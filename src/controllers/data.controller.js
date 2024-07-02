// controllers/data.controller.js

import Patient from '../models/patient.model.js';
import Doctor from '../models/doctor.model.js';
import Appointment from '../models/appointment.model.js';
import { Parser } from 'json2csv';
import fs from 'fs';
import path from 'path';

// Export data
const exportData = async (req, res) => {
    try {
        const patients = await Patient.find().lean();
        const doctors = await Doctor.find().lean();
        const appointments = await Appointment.find().lean();

        const data = { patients, doctors, appointments };
        const json2csvParser = new Parser();
        const csv = json2csvParser.parse(data);

        const filePath = path.join(__dirname, 'data.csv');
        fs.writeFileSync(filePath, csv);

        res.download(filePath);
    } catch (error) {
        res.status(500).json({ message: 'Failed to export data', error: error.message });
    }
};

// Import data
const importData = async (req, res) => {
    try {
        const { data } = req.body;

        // Assuming data is an object containing arrays of patients, doctors, and appointments
        await Patient.insertMany(data.patients);
        await Doctor.insertMany(data.doctors);
        await Appointment.insertMany(data.appointments);

        res.status(200).json({ message: 'Data imported successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to import data', error: error.message });
    }
};

export { exportData, importData };
