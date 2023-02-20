const db = require('../config/connection');
const {Contacts} = require('../models');

const contactsData = require('./contacts.json');

db.once('open', async () => {
    await Contacts.deleteMany({});

    const contacts = await Contacts.insertMany(contactsData);

    console.log('Contacts Seeded!');
    process.exit(0);
});