const express = require('express');
const router = express.Router();

router.post('/logout', (req, res) => {
  res.json({
    code: 0,
    message: null,
  });
});

/**
 * 切换店铺
 */
router.post('/change-shop', (req, res) => {
  res.json({
    code: 0,
    message: null,
  });
});

module.exports = router;
