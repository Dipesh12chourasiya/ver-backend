const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    mobile: String,
    city: String
}, { timestamps: true });

module.exports = mongoose.model("Contact", contactSchema);
