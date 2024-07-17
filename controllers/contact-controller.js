const Contact = require("../models/contact-model");

const contactform = async (req, res) => {
    try {
        const { username, email, message } = req.body;

        // Validate the inputs
        if (!username || !email || !message) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Create a new contact document
        const newContact = new Contact({ username, email, message });
        await newContact.save();

        // Send a success response
        res.status(200).json({ message: "Thank you for contacting us!" });
    } catch (err) {
        console.error("Error saving contact form submission:", err);
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = { contactform };
