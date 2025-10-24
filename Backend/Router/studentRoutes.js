import express from "express";
import {
  deleteStudent,
  getAllStudents,
  getStudentById,
  registerStudent,
  resetStudentPassword,
  studentLogin,
  studentUploadCertificate,
  studentUploadResume,
  updateStudentDetails,
  uploadProfilePhoto,
} from "../Controller/studentController.js";

import { multiUpload } from "../middleware/multiUpload.js";
import { uploadImage } from "../middleware/uploadImage.js";
import { uploadResume } from "../middleware/uploadResume.js";
import { uploadCertificate } from "../middleware/uploadCertificate.js";

const router = express.Router();

// 🟩 Register Student (photo + resume + certificate)
router.post("/register", multiUpload, registerStudent);

router.post("/login/student", studentLogin);

router.get("/getAllStudents", getAllStudents);

router.get("/getStudentId/:id", getStudentById);

router.put("/studentDetailsUpdate/:id", updateStudentDetails);

router.put("/profilePhoto/:id", uploadImage, uploadProfilePhoto);

router.put("/resumeUpdate/:id", uploadResume, studentUploadResume);

router.put(
  "/updateCertificate/:id",
  uploadCertificate,
  studentUploadCertificate
);

router.delete("/studentDelete/:id", deleteStudent);

router.post("/reset-password/:id", resetStudentPassword);

export default router;
