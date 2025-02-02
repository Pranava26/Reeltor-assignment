import express from "express";
import { sendNotification, getNotifications } from "../controllers/notification.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/send", protectRoute, sendNotification);

router.get("/", protectRoute, getNotifications);

export default router;
