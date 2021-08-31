import express from "express";
import {
  loginUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getVerificationCode,
  validateVerificationCode,
  resetPassword,
} from "../controllers/userController.js";
import protect from "../middleware/authMiddleware.js";
const router = express.Router();

router
  .post("/login", loginUser)
  .post("/", registerUser)
  .get("/profile", protect, getUserProfile)
  .put("/profile", protect, updateUserProfile)
  .post("/getVerificationCode", getVerificationCode)
  .post("/validateVC", validateVerificationCode)
  .post("/resetPassword", resetPassword);

export default router;
