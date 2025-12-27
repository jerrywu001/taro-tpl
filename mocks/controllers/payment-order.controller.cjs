const express = require('express');
const router = express.Router();

// Import data
const paymentOrderList = require('../routes/data/payment-order-list.json');
const paymentOrderDetail = require('../routes/data/payment-order-detail.json');
const payOrders = require('../routes/data/payOrders.json');

/**
 * 根据收件单号查询付款单列表
 */
router.get('/list-by-receipt/:receiptNo', (req, res) => {
  res.json({
    code: 0,
    message: null,
    context: paymentOrderList,
    traceId: '',
    spanId: '',
  });
});

/**
 * 查询付款单详情
 */
router.get('/detail/:id', (req, res) => {
  res.json({
    code: 0,
    message: null,
    context: paymentOrderDetail,
    traceId: '',
    spanId: '',
  });
});

/**
 * 付款单列表 - 支持分页与筛选
 */
router.post('/page-query', (req, res) => {
  let all = JSON.parse(JSON.stringify(payOrders));

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
 * 查询付款状态
 */
router.post('/pay-status/fetch', (req, res) => {
  res.json({
    code: 0,
    message: null,
    context: {
      status: 'SUCCESS',
    },
  });
});

/**
 * 结算单付款
 */
router.post('/do-pay', (req, res) => {
  const { settlementOrderId, actualAmount } = req.body;

  res.json({
    code: 0,
    message: null,
    context: {
      id: 2001,
      settlementId: settlementOrderId,
      settlementNo: 'JS202501230001',
      paymentNo: 'FK202501230001',
      relatedOrderNo: 'TPL202501230001',
      settlementType: 'RECEIVE',
      payAmount: actualAmount,
      actualAmount: actualAmount,
      supplierId: 100001,
      supplierName: '上海奢品供应商有限公司',
      payType: 'ONLINE',
      enterpriseAccount: '6228480028456789012',
      voucherFileUrls: [],
      payTime: new Date().toISOString(),
      remark: '',
      status: 'SUCCESS',
      failReason: '',
      memberSnapshot: '{"name":"张三","idNo":"310101199001011234","phone":"13800138000"}',
      payeeName: '张三',
      payeeIdentity: '310101199001011234',
      payeePhone: '13800138000',
      payeeBankAccount: '6222021001234567890',
      payeeBankCode: 'ICBC',
      payeeBankBranchCode: 'ICBC0001',
      payeeBankName: '中国工商银行',
      payeeBankBranchName: '中国工商银行上海市分行黄浦支行',
      createTime: new Date().toISOString(),
      creator: '系统管理员',
    },
  });
});

module.exports = router;
