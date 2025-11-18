const express = require("express");
const multer = require("multer");
const Project = require("../models/Project");
const Admin = require("../models/Admin");
const fs = require("fs");
const path = require("path"); // ✅ this line is required


const { addClient, getClients, deleteClient } = require("../controllers/clientController");
const { getAllContacts } = require("../controllers/contactController");
const { getSubscribers } = require("../controllers/subscribeController");


const router = express.Router();




// Admin Login
// POST /admin/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("Login Body:", req.body);  // DEBUG

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(400).json({ message: "Admin not found" });
    }

    if (password !== admin.password) {
      return res.status(400).json({ message: "Invalid password" });
    }

    res.json({
      message: "Login Successful",
      admin: {
        id: admin._id,
        email: admin.email,
      },
    });

  } catch (error) {
    console.log("LOGIN ERROR:", error);   // SHOW ACTUAL ERROR
    res.status(500).json({ message: "Server Error" });
  }
});


// POST http://localhost:5000/admin/login
// Body:
// {
//   "email": "admin@gmail.com",
//   "password": "123456"
// }




// MULTER STORAGE CONFIG
// ----------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/projects"); // folder to store uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });


// add project route
router.post("/add-project", upload.single("image"), async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Image is required" });
    }

    const newProject = new Project({
      image: req.file.filename,
      name,
      description,
    });

    await newProject.save();

    res.json({
      success: true,
      message: "Project added successfully",
      project: newProject,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// Delete project
router.delete("/delete-project/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    // Delete project image from server if exists
    if (project.image) {
      const imagePath = path.join(process.cwd(), "uploads/projects", project.image);
      fs.unlink(imagePath, (err) => {
        if (err) console.log("Failed to delete project image:", err);
      });
    }

    await Project.findByIdAndDelete(id);

    res.json({ success: true, message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


// Multer Storage for Client Images
const clientStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/clients/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const uploadClient = multer({ storage: clientStorage });

// ------------------ CLIENT ROUTES ------------------
router.post("/add-client", uploadClient.single("image"), addClient);
// Delete client route
router.delete("/delete-client/:id", deleteClient);

router.get("/clients", getClients);

// ------------------ CONTACT ROUTES ------------------
router.get("/contacts", getAllContacts);

// ------------------ SUBSCRIBERS ROUTES ------------------
router.get("/subscribers", getSubscribers);

module.exports = router;

