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

const router = express.Router();

router.post("/jobApply", StudentUploadResume, applyForJob);
router.get("/applyjobGet", getAllApplications);
router.get("/job/:job_id", getApplicationsByJob);
router.get("/student/:student_id", getApplicationsByStudent);
router.patch("/status/:id", updateApplicationStatus);
router.delete("/:id", deleteApplication);

export default router;
