import express from "express";
import {
  createJobPosting,
  deleteJobPosting,
  getAllJobs,
  getJobById,
  updateJobDetails,
  updateJobTemplatePhoto,
} from "../Controller/jobPostingController.js";
import uploadJobPhoto from "../middleware/jobPhotoUpload.js";

const router = express.Router();

router.post("/jobPost", uploadJobPhoto, createJobPosting);
router.get("/jobs/all", getAllJobs);
router.get("/jobs/:id", getJobById);
router.put("/update/job/post/:id", updateJobDetails);
router.put("/updatePhoto/:id", uploadJobPhoto, updateJobTemplatePhoto);
router.delete("/delete/jobPost/:id", deleteJobPosting);

export default router;
