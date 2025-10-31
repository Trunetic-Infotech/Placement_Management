import job_applications from "../config/db.js";
import student from "../config/db.js";

// 🟩 Apply for a Job
export const applyForJob = async (req, res) => {
  try {
    const { job_id, cover_letter, portfolio_url, linkedin_url, github_url } = req.body;

    const student_id = req.student.student_id;

    if (!job_id || !student_id) {
      return res.status(400).json({
        success: false,
        message: "Job ID and Student ID are required.",
      });
    }

    // ✅ 1. Check if the student already applied for this job
    const [existing] = await job_applications.query(
      "SELECT * FROM job_applications WHERE job_id = ? AND student_id = ?",
      [job_id, student_id]
    );

    if (existing.length > 0) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this job.",
      });
    }

    // ✅ 2. Fetch student details from database
    const [studentResult] = await student.query(
      `SELECT firstName, lastName, email, phoneNumber, resume_url 
       FROM student 
       WHERE student_id = ?`,
      [student_id]
    );

    if (studentResult.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Student not found.",
      });
    }

    const studentData = studentResult[0];
    const full_name = `${studentData.firstName} ${studentData.lastName}`;
    const resume_url = studentData.resume_url;
    const email = studentData.email;
    const phone_number = studentData.phoneNumber;

    // ✅ 3. Insert into job_applications table
    const [result] = await job_applications.query(
      `INSERT INTO job_applications (
        job_id, student_id, full_name, email, phone_number, resume_url,
        cover_letter, portfolio_url, linkedin_url, github_url, applied_date, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), 'Pending')`,
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

    // ✅ 4. Optionally update student's applied_jobs column
    await student.query(
      `UPDATE student SET applied_jobs = 
       CASE 
         WHEN applied_jobs IS NULL OR applied_jobs = '' 
         THEN ? 
         ELSE CONCAT(applied_jobs, ',', ?) 
       END 
       WHERE student_id = ?`,
      [job_id, job_id, student_id]
    );

    // ✅ 5. Respond success
    res.status(201).json({
      success: true,
      message: "Application submitted successfully.",
      application_id: result.insertId,
    });
  } catch (error) {
    console.error("Error applying for job:", error);
    res.status(500).json({
      success: false,
      message: "Server error while applying for job.",
      error: error.message,
    });
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
    const { student_id } = req.student;
    const [rows] = await job_applications.query(
      `SELECT 
        ja.application_id,
        ja.job_id,
        j.job_title,
        j.company_id,
        ja.full_name,
        ja.email,
        ja.phone_number,
        ja.resume_url,
        ja.cover_letter,
        ja.portfolio_url,
        ja.linkedin_url,
        ja.github_url,
        ja.applied_date,
        ja.status,
        ja.status_message,
        c.company_name
      FROM job_applications AS ja
      LEFT JOIN job_postings AS j ON ja.job_id = j.job_id
      LEFT JOIN company_details as c on j.company_id = c.company_id
      WHERE ja.student_id = ?
      ORDER BY ja.applied_date DESC`,
      [student_id]
    );
    console.log(rows);
    console.log(student_id);
    
    res.json({ success: true, count: rows.length, data: rows });
  } catch (error) {
    console.error(error);
    
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🟧 Update Application Status (Recruiter Only)
export const updateApplicationStatus = async (req, res) => {
  try {
    // ✅ Allow only recruiter
    if (req.user?.role !== "recruiter") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Only recruiters can update status.",
      });
    }

    const { id } = req.params;
    const { status, status_message } = req.body;

    const validStatuses = [
      "Pending",
      "Reviewed",
      "Shortlisted",
      "Rejected",
      "Hired",
      "Ongoing",
    ];

    // ✅ Validate status if provided
    if (status && !validStatuses.includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status value." });
    }

    // ✅ Prepare fields dynamically
    const updateFields = [];
    const values = [];

    if (status) {
      updateFields.push("status = ?");
      values.push(status);
    }

    if (status_message) {
      updateFields.push("status_message = ?");
      values.push(status_message);
    }

    if (updateFields.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No fields provided for update." });
    }

    values.push(id);

    // ✅ Update query
    const [result] = await job_applications.query(
      `UPDATE job_applications SET ${updateFields.join(
        ", "
      )} WHERE application_id = ?`,
      values
    );

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Application not found." });
    }

    res.json({
      success: true,
      message: "Application status updated successfully.",
      updatedFields: { status, status_message },
    });
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
