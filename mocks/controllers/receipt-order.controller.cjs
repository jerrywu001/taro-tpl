const express = require('express');
const router = express.Router();

// Import data
const receiptOrderList = require('../routes/data/receipt-order-list.json');
const receiveCapabilityGroup = require('../routes/data/receive-capability-group.json');

/**
 * 收款单列表查询 - 支持分页与筛选
 */
router.post('/page-query', (req, res) => {
  let all = JSON.parse(JSON.stringify(receiptOrderList));

  const { page = 1, size = 50, conditions = [] } = req.body || {};

  if (conditions && conditions.length > 0) {
    conditions.forEach((condition) => {
      const { field, operator = 'like', value } = condition;

      if (value !== undefined && value !== null && value !== '') {
        all = all.filter((item) => {
          const fieldValue = item[field];

          switch (operator) {
            case 'like':
              return String(fieldValue).includes(String(value));
            case 'eq':
              return String(fieldValue) === String(value);
            default:
              return true;
          }
        });
      }
    });
  }

  const total = all.length;
  const start = (Number(page) - 1) * Number(size);
  const end = start + Number(size);
  const data = all.slice(start, end);

  res.json({
    code: 0,
    message: null,
    context: { total, data },
    traceId: '',
    spanId: '',
  });
});

/**
 * 收款单详情查询 - 根据ID获取
 */
router.get('/detail/:id', (req, res) => {
  const { id } = req.params;
  const receiptOrder = receiptOrderList.find((item) => item.id === Number(id));

  if (!receiptOrder) {
    res.json({
      code: 1,
      message: '收款单不存在',
      context: null,
    });
    return;
  }

  res.json({
    code: 0,
    message: null,
    context: receiptOrder,
  });
});

/**
 * 查询商户收款能力-按门店分组
 */
router.get('/receive-capability/group/:supplierId', (req, res) => {
  const { supplierId } = req.params;

  console.log('supplierId', supplierId);

  res.json({
    code: 0,
    message: null,
    context: receiveCapabilityGroup,
  });
});

/**
 * 创建收款单并发起收款
 */
router.post('/create-and-initiate', (req, res) => {
  const { settlementOrderId, rcptMethod, amount, memo } = req.body;

  console.log('创建收款单请求：', req.body);

  // 模拟生成收款单数据
  const receiptOrder = {
    id: Math.floor(Math.random() * 100000),
    receiptNo: `SK${Date.now()}`,
    settlementId: settlementOrderId,
    settlementNo: `JS${settlementOrderId}`,
    settlementType: 'RECEIVE',
    relatedOrderNo: '',
    supplierId: 1001,
    supplierName: '测试供应商',
    receivableAmount: amount,
    actualAmount: amount,
    qrCodeUrl: 'https://lg5-prod-1314932667.cos.ap-nanjing.myqcloud.com/applet/erso-applet/payee/test-qr.png',
    channel: rcptMethod === 'QR_CODE' ? 'FACE_TO_FACE' : rcptMethod === 'EASYPAY' ? 'REMOTE_QR' : 'POS_MACHINE',
    status: 'PENDING',
    receiptTime: null,
    voucherFileUrls: [],
    transactionNo: '',
    remark: memo || '',
    payerName: '张宇航',
    payerPhone: '15522220000',
    tpOrderNo: `TP${Date.now()}`,
    receiver: '',
    itemCount: 1,
    creator: 'admin',
    createTime: new Date().toISOString(),
    updater: 'admin',
    updateTime: new Date().toISOString(),
  };

  res.json({
    code: 0,
    message: null,
    context: receiptOrder,
  });
});

// 存储收款单创建时间
const receiptOrderCreateTimeMap = new Map();

/**
 * 同步收款单支付状态
 */
router.post('/sync-payment-status/:id', (req, res) => {
  const { id } = req.params;
  const { amount = 0 } = req.body || {};
  const receiptId = Number(id);
  const delaySeconds = 15;

  console.log('同步收款状态请求：', id);

  // 如果是第一次查询，记录创建时间
  if (!receiptOrderCreateTimeMap.has(receiptId)) {
    receiptOrderCreateTimeMap.set(receiptId, Date.now());
  }

  // 获取创建时间，计算已过去的时间（秒）
  const createTime = receiptOrderCreateTimeMap.get(receiptId);
  const elapsedSeconds = (Date.now() - createTime) / 1000;

  let status = 'PENDING';
  let actualAmount = amount || 0;
  let receiptTime = null;
  let transactionNo = '';

  console.log(`收款单 ${id} 已创建 ${elapsedSeconds.toFixed(2)} 秒`);

  if (elapsedSeconds < delaySeconds) {
    status = 'PROCESSING';
    console.log(`  -> 处理中（还需等待 ${(delaySeconds - elapsedSeconds).toFixed(2)} 秒）`);
  } else {
    const random = Math.random();

    if (random < 0.9) {
      // 90% 成功
      status = 'SUCCESS';
      receiptTime = new Date().toISOString();
      transactionNo = `TXN${Date.now()}${Math.floor(Math.random() * 1000)}`;
      console.log('  -> 收款成功');

      // 清除记录
      receiptOrderCreateTimeMap.delete(receiptId);
    } else {
      // 10% 失败
      status = 'FAILED';
      console.log('  -> 收款失败');

      // 清除记录
      receiptOrderCreateTimeMap.delete(receiptId);
    }
  }

  // 模拟返回更新后的收款单数据
  const receiptOrder = {
    id: receiptId,
    receiptNo: `SK${Date.now()}`,
    settlementId: 1,
    settlementNo: 'JS1',
    settlementType: 'RECEIVE',
    relatedOrderNo: '',
    supplierId: 1001,
    supplierName: '测试供应商',
    receivableAmount: 12800.00,
    actualAmount,
    qrCodeUrl: 'https://lg5-prod-1314932667.cos.ap-nanjing.myqcloud.com/applet/erso-applet/payee/test-qr.png',
    channel: 'REMOTE_QR',
    status,
    receiptTime,
    voucherFileUrls: status === 'SUCCESS' ? ['https://example.com/voucher.jpg'] : [],
    transactionNo,
    remark: '',
    payerName: '张宇航',
    payerPhone: '15522220000',
    tpOrderNo: `TP${Date.now()}`,
    receiver: status === 'SUCCESS' ? 'admin' : '',
    itemCount: 1,
    creator: 'admin',
    createTime: new Date().toISOString(),
    updater: 'admin',
    updateTime: new Date().toISOString(),
  };

  res.json({
    code: 0,
    message: null,
    context: receiptOrder,
  });
});

module.exports = router;
