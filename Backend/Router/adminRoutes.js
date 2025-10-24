import express from "express";
import {
  adminLogin,
  createAdmin,
  deleteAdmin,
  getAdminById,
  getAllAdmins,
  resetAdminPassword,
  updateAdmin,
} from "../Controller/adminController.js";

const router = express.Router();

router.post("/create", createAdmin);
router.get("/getAllAdmin", getAllAdmins);
router.get("/getAdminId/:id", getAdminById);
router.put("/updateAdmin/:id", updateAdmin);
router.delete("/:id", deleteAdmin);
router.post("/login", adminLogin);
router.post("/reset-password", resetAdminPassword);

export default router;
