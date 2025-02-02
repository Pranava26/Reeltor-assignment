import Notification from "../models/notification.model.js";
import User from "../models/user.model.js";

export const sendNotification = async (req, res) => {
    try {
        const { recipientIds, message, type } = req.body;
        const senderId = req.user._id;

        if (!recipientIds || !message) {
            return res.status(400).json({ message: "Recipient IDs and message are required" });
        }

        const notifications = [];

        for (const recipientId of recipientIds) {
            const recipient = await User.findById(recipientId);
            if (!recipient) {
                return res.status(404).json({ message: `Recipient with ID ${recipientId} not found` });
            }

            // Check availability for non critical notifications
            let status = "Pending";
            let deliveredAt = null;
            if (type === "Critical" || isUserAvailable(recipient)) {
                status = "Delivered";
                deliveredAt = new Date();
            }

            const notification = new Notification({
                senderId,
                recipientIds: [recipientId],
                message,
                type,
                status,
                deliveredAt,
            });

            notifications.push(await notification.save());
        }

        res.status(201).json({ notifications });
    } catch (error) {
        console.error("Error sending notification:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getNotifications = async (req, res) => {
    try {
        const userId = req.user._id;

        const notifications = await Notification.find({
            recipientIds: userId,
        }).sort({ createdAt: -1 });

        res.status(200).json({ notifications });
    } catch (error) {
        console.error("Error fetching notifications:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Check if user is available
const isUserAvailable = (user) => {
    const currentTime = new Date().toTimeString().slice(0, 5);
    const { start, end } = user.availability || {};
    return start <= currentTime && currentTime <= end;
};
