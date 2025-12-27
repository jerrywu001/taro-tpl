const express = require('express');
const router = express.Router();

const detail = require('../routes/data/settlement-detail.json');
const settlementApprovalList = require('./data/settlement-approval-list.json');
const settlementOrderList = require('../routes/data/settlement-order-list.json');
const settlementOrderPageQuery = require('./data/settlement-order-page-query.json');

const settlementDetail = JSON.parse(JSON.stringify(detail));

/**
 * 分页查询结算单列表
 */
router.post('/page-query', (req, res) => {
  let all = JSON.parse(JSON.stringify(settlementOrderPageQuery));

  const { page = 1, size = 10, conditions = [] } = req.body || {};

  // 处理筛选条件
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
              return fieldValue === value;
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

router.post('/auditing/page-query', (req, res) => {
  let all = JSON.parse(JSON.stringify(settlementApprovalList));

  const { page = 1, size = 10, conditions = [] } = req.body || {};

  // 处理筛选条件
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
 * 查询收款待办结算单列表
 */
router.post('/receipt-todo/page-query', (req, res) => {
  const receiptTodoList = require('./data/receipt-todo-list.json');
  let all = JSON.parse(JSON.stringify(receiptTodoList.data));

  const { page = 1, size = 50, conditions = [] } = req.body || {};

  // 处理筛选条件
  if (conditions && conditions.length > 0) {
    conditions.forEach((condition) => {
      const { field, operator = 'like', value } = condition;

      if (value !== undefined && value !== null && value !== '') {
        all = all.filter((item) => {
          const fieldValue = item[field];

          switch (operator) {
            case 'like':
              return String(fieldValue).includes(String(value));
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
 * 查询结算单详情
 */
router.get('/detail/:id', async (req, res) => {
  const { actualAmount = '', settlementType = '', doPayee = '' } = req.query || {};

  if (settlementType === 'RETURN_RECEIVE' && doPayee === 'true') {
    settlementDetail.settlementType = settlementType;
    settlementDetail.remainingAmount = Number(settlementDetail.remainingAmount) - Number(actualAmount);
    settlementDetail.settlementStatus = settlementDetail.remainingAmount > Number(actualAmount) ? 'PARTIAL' : 'FULL';
  }

  await new Promise((resolve) => setTimeout(resolve, 500));

  res.json({
    code: 0,
    message: null,
    context: settlementDetail,
  });
});

router.post('/void', (req, res) => {
  settlementDetail.status = 'VOID';

  res.json({
    code: 0,
    message: null,
  });
});

router.post('/submit', (req, res) => {
  const { id } = req.body || {};

  settlementDetail.status = 'AUDITING';

  res.json({
    code: 0,
    message: null,
    context: {
      id: id || 10000002,
    },
  });
});

router.post('/edit', (req, res) => {
  const { id } = req.body || {};

  settlementDetail.status = 'DRAFT';

  res.json({
    code: 0,
    message: null,
    context: {
      id: id || 10000002,
    },
  });
});

router.post('/audit', (req, res) => {
  const { approve, comment } = req.body || {};

  settlementDetail.status = approve ? 'APPROVED' : 'REJECTED';

  if (!approve) {
    settlementDetail.auditComment = comment || '';
  }

  res.json({
    code: 0,
    message: null,
  });
});

/**
 * 根据收件单号查询结算单列表
 */
router.get('/list-by-receipt/:receiptNo', (req, res) => {
  res.json({
    code: 0,
    message: null,
    context: settlementOrderList,
    traceId: '',
    spanId: '',
  });
});

/**
 * 查询付款待办结算单列表
 */
router.post('/payment-todo/page-query', (req, res) => {
  // 从结算单列表中筛选：状态为已通过(APPROVED) 且 结款状态为未结款(UNPAID)或部分结款(PARTIAL)
  const data = JSON.parse(JSON.stringify(settlementOrderList)).filter(
    (item) => item.status === 'APPROVED' && (item.settlementStatus === 'UNPAID' || item.settlementStatus === 'PARTIAL'),
  );

  res.json({
    code: 0,
    message: null,
    context: {
      data,
      total: data.length,
    },
  });
});

module.exports = router;
