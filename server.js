const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const adminRoutes = require("./routes/admin_route");
const userRoutes = require("./routes/user_routes");



dotenv.config();
connectDB();

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // make uploaded images public

app.get("/", (req, res) => {
  res.send("Backend is working!");
});

// admin route
app.use("/admin", adminRoutes);
app.use("/api/user", userRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




// Frontend Can Now Use These APIs:
// Get all projects
// GET http://localhost:5000/api/user/projects

// Get all clients
// GET http://localhost:5000/api/user/clients

// Submit contact form
// POST http://localhost:5000/api/user/contact

// Subscribe email
// POST http://localhost:5000/api/user/subscribe




// ✅ PROJECT MANAGEMENT
// Add Project
// POST http://localhost:5000/api/admin/projects


// Form Data (multipart/form-data):

// projectImage (File)

// name

// description

// Get All Projects
// GET http://localhost:5000/api/admin/projects

// Delete Project
// DELETE http://localhost:5000/api/admin/projects/:id

// ✅ CLIENT MANAGEMENT
// Add Client
// POST http://localhost:5000/api/admin/clients


// Form Data (multipart/form-data):

// clientImage (File)

// name

// description

// designation

// Get All Clients
// GET http://localhost:5000/api/admin/clients

// Delete Client
// DELETE http://localhost:5000/api/admin/clients/:id

// ✅ CONTACT FORM MANAGEMENT
// Get All Contact Form Submissions
// GET http://localhost:5000/api/admin/contacts

// Delete Contact Entry
// DELETE http://localhost:5000/api/admin/contacts/:id

// ✅ NEWSLETTER SUBSCRIBERS
// Get All Subscribers
// GET http://localhost:5000/api/admin/subscribers

// Delete Subscriber
// DELETE http://localhost:5000/api/admin/subscribers/:id