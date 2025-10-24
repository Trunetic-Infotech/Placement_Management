import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";

const certificateStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "Certificates",
    format: file.mimetype.split("/")[1] || "pdf",
    public_id: `certificate_${Date.now()}`,
  }),
});

const certificateFilter = (req, file, cb) => {
  const allowed = ["application/pdf", "image/png", "image/jpg", "image/jpeg"];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Only PDF, PNG, JPG, and JPEG allowed"), false);
};

export const uploadCertificate = multer({
  storage: certificateStorage,
  fileFilter: certificateFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
}).single("certificate"); // frontend field: certificate
