const express = require('express');
const router = express.Router();

const detail = require('./data/invoice-detail.json');
const receiveInvoiceList = require('./data/receive-invoice-list.json');

const invoiceDetail = JSON.parse(JSON.stringify(detail));

/**
 * 查询发票申请详情
 */
router.get('/detail/:id', (req, res) => {
  res.json({
    code: 0,
    message: null,
    context: invoiceDetail,
  });
});

/**
 * 查询收件单开票信息列表
 */
router.get('/receive-list', (req, res) => {
  const { receiveId } = req.query;
  let data = JSON.parse(JSON.stringify(receiveInvoiceList));

  // 可以根据 receiveId 进行筛选
  if (receiveId) {
    // 这里可以根据实际业务逻辑进行筛选
    // 示例：根据单据编号筛选
  }

  res.json({
    code: 0,
    message: null,
    context: data,
    traceId: '',
    spanId: '',
  });
});

module.exports = router;
