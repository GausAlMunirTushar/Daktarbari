import Doctor from '../models/doctor.model.js';
import { logger } from '../utils/logger.js';

const getAllDoctors = async (_req, res) => {
    try {
        const doctors = await Doctor.find();
        res.status(200).json({
            success: true,
            data: doctors,
        });
    } catch (error) {
        logger.error(`Failed to fetch doctors: ${error.message}`);
        res.status(500).json({
            success: false,
            message: 'Server Error. Please try again later.',
        });
    }
};

export { getAllDoctors }