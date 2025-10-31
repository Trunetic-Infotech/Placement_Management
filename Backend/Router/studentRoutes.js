import express from "express";
import {
  deleteStudent,
  getAllStudents,
  getJobCountController,
  getLatestStudents,
  getStudentById,
  registerStudent,
  resetStudentPassword,
  studentLogin,
  studentUploadCertificate,
  studentUploadResume,
  updateStudentDetails,
  updateStudentDetailsForStudent,
  uploadProfilePhoto,
} from "../Controller/studentController.js";

import { multiUpload } from "../middleware/multiUpload.js";
import { uploadImage } from "../middleware/uploadImage.js";
import { uploadResume } from "../middleware/uploadResume.js";
import { uploadCertificate } from "../middleware/uploadCertificate.js";
import { adminAuthMiddleware, studentAuthMiddleware } from "../middleware/adminAuthMiddleware.js";

const router = express.Router();

// 🟩 Register Student (photo + resume + certificate)
router.post(
  "/register/student",
  multiUpload,
  adminAuthMiddleware,
  registerStudent
);

router.post("/login/student", studentLogin);

router.get("/getAllStudents", adminAuthMiddleware, getAllStudents);

router.get("/get/student/profile", studentAuthMiddleware, getStudentById);

router.get("/latestStudents", adminAuthMiddleware, getLatestStudents);

router.put("/studentDetailsUpdate/:id", updateStudentDetails);
router.put("/update/profile", studentAuthMiddleware,multiUpload, updateStudentDetailsForStudent);

router.put("/profilePhoto/:id", uploadImage, uploadProfilePhoto);

router.put("/resumeUpdate/:id", uploadResume, studentUploadResume);

router.put(
  "/updateCertificate/:id",
  uploadCertificate,
  studentUploadCertificate
);

router.delete("/studentDelete/:id", adminAuthMiddleware, deleteStudent);

router.post("/reset-password/:id", resetStudentPassword);

router.get('/get-job-counts',studentAuthMiddleware, getJobCountController)

export default router;
