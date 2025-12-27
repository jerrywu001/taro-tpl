const express = require('express');
const router = express.Router();

const contractController = require('../controllers/contract.controller.cjs');

router.use('/contract', contractController);

module.exports = router;

