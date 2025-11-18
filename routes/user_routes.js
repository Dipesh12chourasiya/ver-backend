const express = require('express');
const router = express.Router();

const Project = require("../models/Project");
const Client = require("../models/Client");
const Contact = require("../models/Contact");
const Subscriber = require("../models/Subscriber");


// ------------------- PROJECTS ROUTE -------------------
router.get("/projects", async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// ------------------- CLIENTS ROUTE -------------------
router.get("/clients", async (req, res) => {
    try {
        const clients = await Client.find();
        res.json(clients);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// ------------------- CONTACT FORM ROUTE -------------------
router.post("/contact", async (req, res) => {
    try {
        const { fullName, email, mobile, city } = req.body;

        const newContact = new Contact({
            fullName,
            email,
            mobile,
            city
        });

        await newContact.save();

        res.json({ success: true, message: "Contact form submitted successfully!" });

    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});


// ------------------- NEWSLETTER SUBSCRIPTION ROUTE -------------------
router.post("/subscribe", async (req, res) => {
    try {
        const { email } = req.body;

        const newSub = new Subscriber({ email });
        await newSub.save();

        res.json({ success: true, message: "Subscribed successfully!" });

    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});



module.exports = router;
