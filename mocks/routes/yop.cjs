const express = require('express');
const router = express.Router();

// Import controllers
const yopBaseController = require('../controllers/yop-base.controller.cjs');

// Mini Program routes
router.use('/yop/base', yopBaseController);

module.exports = router;
