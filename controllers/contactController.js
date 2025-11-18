const Contact = require("../models/Contact");

exports.getAllContacts = async (req, res) => {
    const contacts = await Contact.find();
    res.json(contacts);
};
