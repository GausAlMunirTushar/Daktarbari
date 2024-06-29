import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "../config/database.js";
import { Routes } from "../routes/index.js";

// evnironment variable setup
dotenv.config();

const app = express();

const corsOptions = {
    origin: true,
};

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(morgan("dev"));

// database connection
connectDB();

// routes
app.use(Routes);

// health check route
app.get("/api/v1/health", (_req, res) => {
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
