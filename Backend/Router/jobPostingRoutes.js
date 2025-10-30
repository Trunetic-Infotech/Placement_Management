import express from "express";
import {
  createJobPosting,
  deleteJobPosting,
  getAllJobs,
  getJobById,
  getLatestJobPostings,
  updateJobDetails,
  updateJobTemplatePhoto,
} from "../Controller/jobPostingController.js";
import uploadJobPhoto from "../middleware/jobPhotoUpload.js";
import { adminAuthMiddleware } from "../middleware/adminAuthMiddleware.js";

const router = express.Router();

router.post("/jobPost", uploadJobPhoto, createJobPosting);
router.get("/jobs/all", adminAuthMiddleware, getAllJobs);
router.get("/jobs/:id", getJobById);
router.get("/latest-jobs", adminAuthMiddleware, getLatestJobPostings);
router.put("/update/job/post/:id", updateJobDetails);
router.put("/updatePhoto/:id", uploadJobPhoto, updateJobTemplatePhoto);
router.delete("/delete/jobPost/:id", adminAuthMiddleware, deleteJobPosting);

export default router;
