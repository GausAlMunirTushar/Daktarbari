// controllers/settings.controller.js

import Settings from "../models/settings.model.js";

// Get application settings
const getSettings = async (req, res) => {
    try {
        const settings = await Settings.findOne();
        if (!settings) {
            return res.status(404).json({ message: "Settings not found" });
        }
        res.status(200).json({
            message: "Settings retrieved successfully",
            settings,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to retrieve settings",
            error: error.message,
        });
    }
};

// Update application settings
const updateSettings = async (req, res) => {
    const { timezone, defaultValues } = req.body;
    try {
        let settings = await Settings.findOne();
        if (!settings) {
            settings = new Settings({ timezone, defaultValues });
        } else {
            if (timezone) settings.timezone = timezone;
            if (defaultValues) settings.defaultValues = defaultValues;
        }
        await settings.save();
        res.status(200).json({
            message: "Settings updated successfully",
            settings,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to update settings",
            error: error.message,
        });
    }
};

export { getSettings, updateSettings };
