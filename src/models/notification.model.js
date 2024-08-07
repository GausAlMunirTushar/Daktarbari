import mongoose from "mongoose";

const Schema = mongoose.Schema;

const notificationSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        read: {
            type: Boolean,
            default: false,
        },
        type: {
            type: String,
            enum: ["email", "sms", "push"],
            default: "email",
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
