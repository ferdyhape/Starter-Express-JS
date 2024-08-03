import express from "express";
import { register, login, myProfile } from "../controllers/authController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// start set middleware
router.use(authenticateToken);
router.get("/my-profile", myProfile);

export default router;
