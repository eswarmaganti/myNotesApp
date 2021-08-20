import express from "express";
import {
  loginUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  updateUserPassword,
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
  .patch("/updatePass/:id", protect, updateUserPassword)
  .patch("/updateProfile/:id", protect, updateUserProfile)
  .post("/getVerificationCode", getVerificationCode)
  .post("/validateVC", validateVerificationCode)
  .post("/resetPassword", resetPassword);

export default router;
