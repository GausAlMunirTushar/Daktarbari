import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";

// evnironment variable setup
dotenv.config();

const app = express();

const corsOptions = {
    origin: true,
};

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// database connection
connectDB();

// routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.get("/health", (_req, res) => {
    res.status(200).json({
        message: "Server Health is Okay",
    });
});

// Catch-all route for undefined routes
app.get("*", (_req, res) => {
    res.status(404).json({
        message: "Not Found",
    });
});
export default app;
