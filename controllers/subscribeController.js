const Subscriber = require("../models/Subscriber");

exports.getSubscribers = async (req, res) => {
    const subscribers = await Subscriber.find();
    res.json(subscribers);
};
