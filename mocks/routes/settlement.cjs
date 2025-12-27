const express = require('express');
const router = express.Router();

// Import controllers
const settlementController = require('../controllers/settlement.controller.cjs');
const paymentOrderController = require('../controllers/payment-order.controller.cjs');
const receiptOrderController = require('../controllers/receipt-order.controller.cjs');

// Settlement routes
router.use('/settlement-order', settlementController);

// Payment order routes
router.use('/payment-order', paymentOrderController);

// Receipt order routes
router.use('/receipt-order', receiptOrderController);

module.exports = router;
