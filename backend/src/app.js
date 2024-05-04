import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

// evnironment variable setup
dotenv.config();

const app = express();

app.get('/health', (_req, res) => {
    res.status(200).json({
        message: "Server Health is Okay"
    })
})

export default app;
