const express = require('express');
const router = express.Router();

// Import controllers
const filesController = require('../controllers/files.controller.cjs');

// Mini Program routes
router.use('/files', filesController);


/**
 * 发送验证码
 */
router.post('/sms/send', (req, res) => {
  // 模拟生成六位验证码
  const code = Math.floor(100000 + Math.random() * 900000);


  res.json({
    code: 0,
    message: null,
    context:code
  });
});

module.exports = router;
