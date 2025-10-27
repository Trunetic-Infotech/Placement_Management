import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";

const jobPhotoStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Job_Postings",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    public_id: (req, file) => `job_template_${Date.now()}`,
  },
});

const uploadJobPhoto = multer({ storage: jobPhotoStorage }).single(
  "job_template_photo"
);

export default uploadJobPhoto;
