const express = require('express');
const router = express.Router();

const officialPriceProducts = require('../routes/data/official-price-products.json');
const pickUpList = require('../routes/data/pickUpList.json');
const receiveRefundOptions = require('../routes/data/receive-refund-options.json');
const receiveContractInfo = require('./data/receive-contract-info.json');
const store = require('../store.cjs');

router.post('/page', (req, res) => {
  res.json({
    code: 0,
    message: null,
    context: pickUpList,
  });
});

// 收件单详情
router.get('/detail', (req, res) => {
  const { id } = req.query;

  // 从共享存储获取最新的收件单详情（包含已更新的会员认证状态）
  const detail = {
    ...store.getReceiveDetail(),
    receiveId: id || store.getReceiveDetail().receiveId,
  };

  detail.productList.forEach((product) => {
    product.baseForm = {
      id: Math.random().toString(36).substring(2),
      dynamicFields: officialPriceProducts.data[0].dynamicFields || [],
    };
  });

  res.json({
    code: 0,
    message: null,
    context: detail,
    traceId: '',
    spanId: '',
  });
});

// 收件合同配置
router.get('/contract-info', (req, res) => {
  res.json({
    code: 0,
    message: null,
    context: receiveContractInfo,
    traceId: '',
    spanId: '',
  });
});

// 收件合同列表
router.get('/contract-list', (req, res) => {
  const receiveContractList = require('./data/receive-contract-list.json');
  res.json({
    code: 0,
    message: null,
    context: receiveContractList,
    traceId: '',
    spanId: '',
  });
});

// 获取批量签URL
router.get('/batch-url', (req, res) => {
  res.json({
    code: 0,
    message: null,
    context: 'https://test-h5.bestSign.cn/path/to/batch/sign',
    traceId: '',
    spanId: '',
  });
});

// 保存收件单
router.post('/save', (req, res) => {
  // 模拟生成的收件单ID
  const receiveId = Math.floor(Math.random() * 10000) + 1000;

  res.json({
    code: 0,
    message: null,
    context: receiveId,
    traceId: '',
    spanId: '',
  });
});

// 作废收件单
router.get('/cancel', (req, res) => {
  res.json({
    code: 0,
    message: null,
    context: null,
    traceId: '',
    spanId: '',
  });
});


router.get('/mini-statistics', (req, res) => {
  res.json({
    code: 0,
    message: null,
    context: {
      waitPayReceiveOrderNum: 8,
      waitStoreNum: 12,
      waitApproveNum: 5,
      waitSettleApproveNum: 3,
    },
  });
});

// 收件单-退货单列表查询
router.get('/receive-refund/list', (req, res) => {
  const { type } = req.query;
  const all = receiveRefundOptions.filter((item) => item.busType === type);

  res.json({
    code: 0,
    message: null,
    context: all,
  });
});

module.exports = router;
