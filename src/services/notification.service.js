// services/notification.service.js

import Notification from "../models/notification.model.js";

const sendNotification = async ({ userId, message, type = "email" }) => {
    try {
        // Save the notification to the database
        const notification = new Notification({
            user: userId,
            message,
            type,
        });
        await notification.save();

        // Implement the actual notification sending logic here (e.g., SMS, email, push notification)
        console.log(`Notification of type ${type} sent to user ${userId}: ${message}`);
        // Example: Use an email service, SMS gateway, or push notification service here.
    } catch (error) {
        console.error("Error sending notification:", error);
    }
};

export { sendNotification };
