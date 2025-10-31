import express from "express";
import {
  deleteCompany,
  getAllCompanies,
  getCompanyById,
  loginCompany,
  registerCompany,
  resetCompanyPassword,
  updateCompanyDetails,
  updateCompanyLogo,
} from "../Controller/companyController.js";
import { uploadCompanyLogo } from "../middleware/recruiterMulter.js";
import { adminAuthMiddleware } from "../middleware/adminAuthMiddleware.js";

const router = express.Router();

router.post(
  "/register/company",
  uploadCompanyLogo,
  adminAuthMiddleware,
  registerCompany
);
router.post("/login/company", loginCompany);
router.get("/allCompany", adminAuthMiddleware, getAllCompanies);
router.get("/getCompanyId/:id", getCompanyById);
router.put("/updateCompanyDetails/:id", updateCompanyDetails);
router.put("/updateCompanyLogo/:id", uploadCompanyLogo, updateCompanyLogo);
router.delete("/companyDelete/:id", adminAuthMiddleware, deleteCompany);
router.post("/reset-password/company", resetCompanyPassword);

export default router;
