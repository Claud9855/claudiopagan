const {Schema, model} = require('mongoose');

const contactsSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    email_address: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date
    }
});

const Contacts = model("Contact", contactsSchema);

module.exports = Contacts;