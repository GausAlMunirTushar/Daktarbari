// models/settings.model.js

import mongoose from "mongoose";

const Schema = mongoose.Schema;

const settingsSchema = new Schema(
    {
        timezone: {
            type: String,
            default: "UTC",
        },
        defaultValues: {
            type: Map,
            of: String,
            default: {},
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

const Settings = mongoose.model("Settings", settingsSchema);
export default Settings;
