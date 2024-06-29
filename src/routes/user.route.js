import express from "express";
import {
    updateUser,
    deleteUser,
    getSingleUser,
    getAllUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/:id", getSingleUser);
router.get("/", getAllUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export { router as userRoutes };
