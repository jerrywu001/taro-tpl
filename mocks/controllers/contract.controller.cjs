const express = require('express');
const router = express.Router();

const contractCreateResult = require('./data/contract-create.json');
const contractDetail = require('./data/contract-detail.json');
const contractTodoList = require('./data/contract-todo-list.json');

/**
 * 创建合同
 */
router.post('/create', (req, res) => {
  const responseData = JSON.parse(JSON.stringify(contractCreateResult.context));

  if (req.body?.contractSubject) {
    responseData.contractNo = `HT${new Date().getTime()}`;
  }

  res.json({
    code: 0,
    message: null,
    context: responseData,
    traceId: '',
    spanId: '',
  });
});

/**
 * 查询合同详情
 */
router.get('/detail', (req, res) => {
  const { id } = req.query;

  const responseData = JSON.parse(JSON.stringify(contractDetail));

  if (id) {
    responseData.contractId = Number(id);
  }

  res.json({
    code: 0,
    message: null,
    context: responseData,
    traceId: '',
    spanId: '',
  });
});

/**
 * 获取签署方签署链接
 */
router.post('/actor-sign', (req, res) => {
  const { id } = req.body;

  // 模拟生成签署链接
  const signLink = `https://contract.example.com/sign?actorId=${id || '2001'}&token=${Date.now()}`;

  res.json({
    code: 0,
    message: null,
    context: signLink,
    traceId: '',
    spanId: '',
  });
});

/**
 * 撤销合同
 */
router.get('/revoke', (req, res) => {
  const { id, revokeReason } = req.query;

  console.log('撤销合同请求:', { id, revokeReason });

  res.json({
    code: 0,
    message: null,
    context: {},
    traceId: '',
    spanId: '',
    msg: '',
  });
});
/**
 * 待办合同列表查询 - 支持分页与筛选
 */
router.post('/to-do-contract', (req, res) => {
  let all = JSON.parse(JSON.stringify(contractTodoList));

  const { page = 1, size = 50, contractNo } = req.body || {};

  // 支持按合同编号筛选
  if (contractNo) {
    all = all.filter((item) =>
      String(item.contractNo).includes(String(contractNo))
    );
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

module.exports = router;

