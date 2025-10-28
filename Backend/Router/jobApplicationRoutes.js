import express from "express";
import {
  applyForJob,
  deleteApplication,
  getAllApplications,
  getApplicationsByJob,
  getApplicationsByStudent,
  updateApplicationStatus,
} from "../Controller/jobApplicationController.js";

import { StudentUploadResume } from "../middleware/studentUploadResume.js";
import {
  authorizeRoles,
  verifyToken,
} from "../middleware/recruiterAuthMiddleware.js";

const router = express.Router();

// 🟩 Student — Apply for a Job
router.post(
  "/jobApply",
  verifyToken,
  authorizeRoles("student"),
  StudentUploadResume,
  applyForJob
);

// 🟨 Admin or Recruiter — View All Applications (Read Only)
router.get(
  "/applyjobGet",
  verifyToken,
  authorizeRoles("admin", "recruiter"),
  getAllApplications
);

// 🟨 Recruiter — View Applications for their Job
router.get(
  "/job/:job_id",
  verifyToken,
  authorizeRoles("recruiter"),
  getApplicationsByJob
);

// 🟦 Student — View Own Applications
router.get(
  "/student/:student_id",
  verifyToken,
  authorizeRoles("student"),
  getApplicationsByStudent
);

// 🟥 Recruiter Only — Update Application Status
router.patch(
  "/status/:id",
  verifyToken,
  authorizeRoles("recruiter"),
  updateApplicationStatus
);

// 🟪 Admin Only — Delete Application
router.delete("/:id", verifyToken, authorizeRoles("admin"), deleteApplication);

export default router;
