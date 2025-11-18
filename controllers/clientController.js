const Client = require("../models/Client");
const path = require("path");
const fs = require("fs");

exports.addClient = async (req, res) => {
    try {
        const { name, description, designation } = req.body;

        const newClient = new Client({
            image: req.file ? req.file.filename : null,
            name,
            description,
            designation
        });

        await newClient.save();
        res.json({ success: true, message: "Client added successfully", client: newClient });

    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.getClients = async (req, res) => {
    const clients = await Client.find();
    res.json(clients);
};

exports.deleteClient = async (req, res) => {
  try {
    const { id } = req.params;

    const client = await Client.findById(id);
    if (!client) {
      return res.status(404).json({ success: false, message: "Client not found" });
    }

    // Delete client image from server if exists
    if (client.image) {
      const imagePath = path.join(process.cwd(), "uploads/clients", client.image);
      fs.unlink(imagePath, (err) => {
        if (err) console.log("Failed to delete image:", err);
      });
    }

    await Client.findByIdAndDelete(id);

    res.json({ success: true, message: "Client deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};