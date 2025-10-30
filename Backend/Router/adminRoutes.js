import express from "express";
import {
  adminDashboardStats,
  adminLogin,
  createAdmin,
  deleteAdmin,
  getAdminById,
  getAllAdmins,
  resetAdminPassword,
  updateAdmin,
} from "../Controller/adminController.js";
import { adminAuthMiddleware } from "../middleware/adminAuthMiddleware.js";

const router = express.Router();

router.post("/create", createAdmin);
router.get("/getAllAdmin", getAllAdmins);
router.get("/getAdminId/:id", getAdminById);
router.put("/updateAdmin/:id", updateAdmin);
router.delete("/:id", deleteAdmin);
router.post("/login", adminLogin);
router.post("/reset-password", resetAdminPassword);
router.get("/dashboard/stats", adminAuthMiddleware, adminDashboardStats);

export default router;
