const express = require('express');
const router = express.Router();

// Import data
const refundDetail = require('../routes/data/refund-detail.json');

// 收件退货详情
router.get('/detail', (req, res) => {
  const { id } = req.query;

  res.json({
    code: 0,
    message: null,
    context: {
      ...refundDetail,
      id: id || receiveDetail.receiveId,
    },
    traceId: '',
    spanId: '',
  });
});

module.exports = router;
