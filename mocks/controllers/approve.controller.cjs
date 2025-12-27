const express = require('express');
const router = express.Router();

const approvalList = require('./data/pickup-approval-list.json');
const refundApprovalList = require('./data/pickup-refund-approval-list.json');

router.post('/page', (req, res) => {
  let all = JSON.parse(JSON.stringify(approvalList));

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
});

router.post('/refund-page', (req, res) => {
  let all = JSON.parse(JSON.stringify(refundApprovalList));

  const { page = 1, size = 10, refundNo } = req.body || {};

  if (refundNo) {
    all = all.filter((v) => String(v.refundNo).includes(String(refundNo)));
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
});

router.post('/operate', (req, res) => {
  res.json({
    code: 0,
    message: null,
  });
});

router.post('/operate-receive-id', (req, res) => {
  const { id, type, result, resultDesc } = req.body || {};

  console.log('根据收件单id审批:', JSON.stringify(req.body, null, 2));
  console.log('收件单ID:', id);
  console.log('审批类型:', type);
  console.log('审批结果:', result === 1 ? '通过' : '驳回');
  console.log('审批备注:', resultDesc || '无');

  res.json({
    code: 0,
    message: null,
    context: null,
    traceId: '',
    spanId: '',
  });
});

module.exports = router;
