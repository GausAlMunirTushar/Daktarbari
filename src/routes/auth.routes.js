import express from "express";
import { register, login } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/verify-email",)
router.post("/resend-verification",)
router.post("/login", login)
router.post("/logout",)
router.post("/forgot-password",)


export { router as authRoutes}