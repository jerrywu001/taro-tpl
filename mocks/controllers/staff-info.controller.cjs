const express = require('express');
const router = express.Router();

router.post('/update-password', (req, res) => {
  res.json({
    code: 0,
    message: null,
  });
});

module.exports = router;
