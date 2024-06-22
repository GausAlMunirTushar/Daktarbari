import express from "express";
import {
    updateUser,
    deleteUser,
    getSingleUser,
    getAllUser,
} from "../controllers/user.controller.js";

const userRoute = express.Router();

userRoute.get("/:id", getSingleUser);
userRoute.get("/", getAllUser);
userRoute.put("/:id", updateUser);
userRoute.delete("/:id", deleteUser);

export default userRoute;
