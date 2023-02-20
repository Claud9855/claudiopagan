const router = require('express').Router();
const {createContacts, sendEmail} = require('../../controllers/contacts-controller');

router.route('/').post(createContacts);
router.route('/send-email').post(sendEmail);

module.exports = router;