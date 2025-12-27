const express = require('express');
const router = express.Router();

const product = require('./data/improve-product.json');
const list = require('./data/improve-product-list.json');
const receiveProductList = require('./data/receive-product-list.json');

router.get('/improve-product-detail', (req, res) => {
  res.json({
    code: 0,
    message: null,
    context: product,
  });
});

router.post('/improve-product-save', (req, res) => {
  res.json({
    code: 0,
    message: null,
    context: null,
  });
});

router.post('/improve-store', (req, res) => {
  res.json({
    code: 0,
    message: null,
    context: null,
  });
});

router.post('/improve-page', (req, res) => {
  let all = JSON.parse(JSON.stringify(list));

  try {
    const { page = 1, size = 10, receiveNo } = req.body || {};

    if (receiveNo) {
      all = all.filter((v) => String(v.receiveNo).includes(String(receiveNo)));
    }

    const total = all.length;
    const start = (Number(page) - 1) * Number(size);
    const end = start + Number(size);
    const data = all.slice(start, end);

    res.json({
      code: 0,
      message: null,
      context: { total, data },
    });
  } catch (error) {
    console.log(error);
    res.json({
      code: 0,
      message: null,
      context: { total, data },
    });
  }
});

router.post('/list', (req, res) => {
  let all = JSON.parse(JSON.stringify(receiveProductList));

  try {
    const { receiveId = [], scope } = req.body || {};

    if (receiveId && receiveId.length > 0) {
      all = all.filter((v) => receiveId.includes(v.receiveId));
    }

    if (scope === 1) {
      all = all.filter((v) => v.improveProductStatus === 1);
    }

    res.json({
      code: 0,
      message: null,
      context: all,
    });
  } catch (error) {
    console.log(error);
    res.json({
      code: 0,
      message: null,
      context: [],
    });
  }
});

router.post('/improve-store-all', (req, res) => {
  try {
    const { receiveSubId = [] } = req.body || {};

    console.log('一键入库商品, 子收件ID列表:', receiveSubId);

    // 模拟入库成功
    res.json({
      code: 0,
      message: '入库成功',
      context: {},
      traceId: '',
      spanId: '',
    });
  } catch (error) {
    console.log(error);
    res.json({
      code: 1,
      message: '入库失败',
      context: {},
    });
  }
});

/**
 * 申请开票
 */
router.post('/invoice', (req, res) => {
  try {
    const { receiveSubId = [] } = req.body || {};

    console.log('申请开票, 子收件ID列表:', receiveSubId);

    if (!receiveSubId || receiveSubId.length === 0) {
      return res.json({
        code: 1,
        message: '请选择要申请开票的商品',
        context: {},
        traceId: '',
        spanId: '',
      });
    }

    // 模拟申请开票成功
    res.json({
      code: 0,
      message: '申请开票成功',
      context: {},
      traceId: '',
      spanId: '',
    });
  } catch (error) {
    console.log(error);
    res.json({
      code: 1,
      message: '申请开票失败',
      context: {},
      traceId: '',
      spanId: '',
    });
  }
});

module.exports = router;
