import job_applications from "../config/db.js";

// 🟩 Apply for a Job
export const applyForJob = async (req, res) => {
  try {
    const {
      job_id,
      student_id,
      full_name,
      email,
      phone_number,
      cover_letter,
      portfolio_url,
      linkedin_url,
      github_url,
    } = req.body;

    if (
      !job_id ||
      !student_id ||
      !full_name ||
      !email ||
      !phone_number ||
      !cover_letter
    )
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });

    if (!req.file)
      return res.status(400).json({
        success: false,
        message: "Resume is required",
      });

    const resume_url = req.file.path;

    const [result] = await job_applications.query(
      `INSERT INTO job_applications (
        job_id, student_id, full_name, email, phone_number, resume_url, 
        cover_letter, portfolio_url, linkedin_url, github_url
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        job_id,
        student_id,
        full_name,
        email,
        phone_number,
        resume_url,
        cover_letter || null,
        portfolio_url || null,
        linkedin_url || null,
        github_url || null,
      ]
    );

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      application_id: result.insertId,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🟨 Get All Applications
export const getAllApplications = async (req, res) => {
  try {
    const [rows] = await job_applications.query(
      "SELECT * FROM job_applications ORDER BY applied_date DESC"
    );

    res.json({ success: true, count: rows.length, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🟦 Get Applications by Job ID
export const getApplicationsByJob = async (req, res) => {
  try {
    const { job_id } = req.params;
    const [rows] = await job_applications.query(
      "SELECT * FROM job_applications WHERE job_id = ? ORDER BY applied_date DESC",
      [job_id]
    );
    res.json({ success: true, count: rows.length, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🟪 Get Applications by Student ID
export const getApplicationsByStudent = async (req, res) => {
  try {
    const { student_id } = req.params;
    const [rows] = await job_applications.query(
      "SELECT * FROM job_applications WHERE student_id = ? ORDER BY applied_date DESC",
      [student_id]
    );
    res.json({ success: true, count: rows.length, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🟧 Update Application Status
export const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = [
      "Pending",
      "Reviewed",
      "Shortlisted",
      "Rejected",
      "Hired",
    ];

    if (!validStatuses.includes(status))
      return res
        .status(400)
        .json({ success: false, message: "Invalid status" });

    const [result] = await job_applications.query(
      "UPDATE job_applications SET status = ? WHERE application_id = ?",
      [status, id]
    );

    if (result.affectedRows === 0)
      return res
        .status(404)
        .json({ success: false, message: "Application not found" });

    res.json({ success: true, message: "Status updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🟥 Delete Application
export const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await job_applications.query(
      "DELETE FROM job_applications WHERE application_id = ?",
      [id]
    );

    if (result.affectedRows === 0)
      return res
        .status(404)
        .json({ success: false, message: "Application not found" });

    res.json({ success: true, message: "Application deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
