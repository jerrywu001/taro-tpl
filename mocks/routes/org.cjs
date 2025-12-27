const express = require('express');
const router = express.Router();

// Import controllers
const receiveSubController = require('../controllers/receiveSub.controller.cjs');
const approveController = require('../controllers/approve.controller.cjs');
const orgController = require('../controllers/org.controller.cjs');

// Mini Program routes
router.use('/receive-sub', receiveSubController);
router.use('/approve', approveController);
router.use('/org-info', orgController);

module.exports = router;
