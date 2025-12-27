const express = require('express');
const router = express.Router();

// Import controllers
const receiveSubController = require('../controllers/receiveSub.controller.cjs');
const approveController = require('../controllers/approve.controller.cjs');
const refundController = require('../controllers/refund.controller.cjs');
const receiveController = require('../controllers/operation-receive.controller.cjs');
const refoundController = require('../controllers/operation-refound.controller.cjs');

// Mini Program routes
router.use('/receive-sub', receiveSubController);
router.use('/approve', approveController);
router.use('/refund', refundController);

// Receive order routes
router.use('/receive', receiveController);

// Refund routes
router.use('/refund', refoundController);

module.exports = router;
