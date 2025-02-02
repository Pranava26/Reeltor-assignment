import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recipientIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["Critical", "Non-Critical"],
      default: "Non-Critical",
    },
    sentAt: {
      type: Date,
      default: Date.now,
    },
    deliveredAt: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["Pending", "Delivered"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;