const express = require('express');
const router = express.Router();

// Import controllers
const invoiceController = require('../controllers/invoice.controller.cjs');

// Invoice routes
router.use('/invoice-apply', invoiceController);
router.use('/invoice', invoiceController);

module.exports = router;
