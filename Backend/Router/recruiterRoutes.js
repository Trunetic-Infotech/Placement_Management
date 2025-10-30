// import express from "express";
// import {
//   getAllRecruiters,
//   getRecruiterById,
//   recruiterLogin,
//   registerRecruiter,
//   updateCompanyLogo,
//   updateRecruiterDetails,
// } from "../Controller/recruiterController.js";
// import { uploadRecruiterFiles } from "../middleware/recruiterUploads.js";

// const router = express.Router();

// router.post("/register/recruiter", uploadRecruiterFiles, registerRecruiter);
// router.post("/login/recruiter", recruiterLogin);
// router.get("/getAllRecruiters", getAllRecruiters);
// router.get("/getRecruiterId/:id", getRecruiterById);
// router.put("/updateRecruiter/:id", updateRecruiterDetails);
// router.put("/updateCompanyLogo/:id", updateCompanyLogo);

// export default router;

import express from "express";
import {
  registerRecruiter,
  recruiterLogin,
  getAllRecruiters,
  getRecruiterById,
  updateRecruiterDetails,
  updateCompanyLogo,
  updateHrPhoto,
  deleteRecruiter,
  resetRecruiterPassword,
  getLatestRecruiter,
} from "../Controller/recruiterController.js";
import {
  uploadCompanyLogo,
  uploadHrPhoto,
  uploadRecruiterFiles,
} from "../middleware/recruiterMulter.js"; // ✅ Correct import
import { adminAuthMiddleware } from "../middleware/adminAuthMiddleware.js";

const router = express.Router();

/** ===============================
 *  Recruiter Routes
 *  ===============================
 */

// 🧩 Register recruiter (with file upload)
router.post(
  "/register/recruiter",
  uploadRecruiterFiles,
  adminAuthMiddleware,
  registerRecruiter
);

// 🔐 Recruiter login
router.post("/login", recruiterLogin);

// 📋 Get all recruiters
router.get("/allRecruiter", adminAuthMiddleware, getAllRecruiters);

// 🔎 Get recruiter by ID
router.get("/:id", adminAuthMiddleware, getRecruiterById);

router.get("/getLatestRecruiter/home",adminAuthMiddleware, getLatestRecruiter);

// ✏️ Update recruiter details (text fields)
router.put("/update/:id", updateRecruiterDetails);

// 🖼️ Update company logo (only logo upload)
router.put("/update-logo/:id", uploadCompanyLogo, updateCompanyLogo);

// 👤 Update HR photo (only HR photo upload)
router.put("/update-hr-photo/:id", uploadHrPhoto, updateHrPhoto);

// Delete Recruiter ID
router.delete("/deleteRecruiter/:id", adminAuthMiddleware, deleteRecruiter);

// 🟩 Reset Password
router.post("/reset-password/recuruiter/:id", resetRecruiterPassword);

export default router;
