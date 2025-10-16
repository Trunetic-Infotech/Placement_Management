import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import dotenv, { config } from "dotenv";
import ConnectDB from "./config/db.js";

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

app.get("/", (req, res) => {
  res.send("<h1>SuccessFully Connected</h1>");
});

app.listen(process.env.PORT, () => {
  console.log(`✅ Server Running At Port ${process.env.PORT}`);
});
