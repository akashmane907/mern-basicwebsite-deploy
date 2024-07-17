const { Schema, model } = require('mongoose');

const contactSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: Date, default: Date.now } // Optional: to track when the contact was created
});

const Contact = model('Contact', contactSchema);

module.exports = Contact;
