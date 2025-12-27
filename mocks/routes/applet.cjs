const express = require('express');
const router = express.Router();

// Import controllers
const appletController = require('../controllers/applet.controller.cjs');
const memberController = require('../controllers/applet-member.controller.cjs');

// Mini Program routes
router.use('/applet', appletController);

// Member routes
router.use('/member', memberController);

module.exports = router;
