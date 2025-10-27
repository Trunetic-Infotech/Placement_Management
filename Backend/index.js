import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import dotenv, { config } from "dotenv";
import ConnectDB from "./config/db.js";
import adminRoutes from "./Router/adminRoutes.js";
import studentRoutes from "./Router/studentRoutes.js";
import recruiterRoutes from "./Router/recruiterRoutes.js";
import companyRoutes from "./Router/companyRoutes.js";
import jobPostingRoutes from "./Router/jobPostingRoutes.js";
import jobApplicationRoutes from "./Router/jobApplicationRoutes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ["POST", "GET", "PUT", "PATCH", "DELETE", "OPTIONS"],
  })
);

app.use(express.json());

app.use(cookieParser());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(morgan("dev"));

app.use("/api/v1", adminRoutes);
app.use("/api/v1", studentRoutes);
app.use("/api/v1", recruiterRoutes);
app.use("/api/v1", companyRoutes);
app.use("/api/v1", jobPostingRoutes);
app.use("/api/v1/jobApply/", jobApplicationRoutes);

app.get("/", (req, res) => {
  res.send("<h1>SuccessFully Connected</h1>");
});

app.listen(process.env.PORT, () => {
  console.log(`✅ Server Running At Port ${process.env.PORT}`);
});
