const express = require('express');
const router = express.Router();

const refundList = require('./data/refund-list.json');
const refundReceiveList = require('../routes/data/refund-receive-list.json');
const refundReturnableList = require('./data/refund-returnable-list.json');
const refundDetail = require('./data/refund-detail.json');

router.post('/page', (req, res) => {
  let all = JSON.parse(JSON.stringify(refundList));

  const { page = 1, size = 10, refundNo, receiveNo, memberName, creator, createStartTime, createEndTime } = req.body || {};

  // 退货单号模糊搜索
  if (refundNo) {
    all = all.filter((v) => String(v.receiveNo).includes(String(refundNo)));
  }

  // 收件单号模糊搜索
  if (receiveNo) {
    all = all.filter((v) => String(v.receiveNo).includes(String(receiveNo)));
  }

  // 会员名称模糊搜索
  if (memberName) {
    all = all.filter((v) => String(v.memberName).includes(String(memberName)));
  }

  // 创建人模糊搜索
  if (creator) {
    all = all.filter((v) => String(v.creator).includes(String(creator)));
  }

  // 创建时间范围过滤
  if (createStartTime) {
    all = all.filter((v) => {
      const createDate = new Date(v.createTime).getTime();
      const startDate = new Date(createStartTime).getTime();
      return createDate >= startDate;
    });
  }

  if (createEndTime) {
    all = all.filter((v) => {
      const createDate = new Date(v.createTime).getTime();
      const endDate = new Date(createEndTime + ' 23:59:59').getTime();
      return createDate <= endDate;
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
  });
});

// 保存退货单
router.post('/save', (req, res) => {
  const { id, operateType, receiveId, refundReason, refundType, refundDetailList } = req.body || {};

  // 如果有id，说明是编辑，使用原id；否则生成新id
  const refundId = id || Math.floor(Math.random() * 10000) + 1000;

  console.log('保存退货单请求:', JSON.stringify(req.body, null, 2));
  console.log('操作类型:', operateType === 0 ? '保存草稿' : '提交审核');
  console.log('退款单ID:', id || '新创建');
  console.log('收件单ID:', receiveId);
  console.log('退货方式:', refundType === 'SELF_PICKUP' ? '自提' : '快递');
  console.log('退货原因:', refundReason || '无');
  console.log('退货商品数量:', refundDetailList?.length || 0);

  res.json({
    code: 0,
    message: null,
    context: refundId,
    traceId: '',
    spanId: '',
  });
});

// 查询可进行退货的收件单列表
router.get('/receive-no/list', (req, res) => {
  console.log('查询可退货的收件单列表');

  res.json({
    code: 0,
    message: null,
    context: refundReceiveList,
    traceId: '',
    spanId: '',
  });
});

// 根据收件id查询可退货商品信息
router.get('/returnable-list', (req, res) => {
  const { receiveId } = req.query;

  console.log('查询可退货商品信息, 收件ID:', receiveId);

  res.json({
    code: 0,
    message: null,
    context: refundReturnableList,
    traceId: '',
    spanId: '',
  });
});

// 查询退货单详情
router.get('/detail', (req, res) => {
  const { id } = req.query;

  res.json({
    code: 0,
    message: null,
    context: {
      ...refundDetail,
      id: id || receiveDetail.receiveId,
    },
  });
});

// 作废退货单
router.get('/cancel', (req, res) => {
  const { id } = req.query;

  console.log('作废退货单, 退货单ID:', id);

  res.json({
    code: 0,
    message: null,
    context: {},
    traceId: '',
    spanId: '',
    msg: '',
  });
});

// 编辑退货单
router.post('/edit', (req, res) => {
  const { id, operateType, receiveId, refundReason, refundType, refundDetailList } = req.body || {};

  console.log('编辑退货单请求:', JSON.stringify(req.body, null, 2));
  console.log('退款单ID:', id);
  console.log('操作类型:', operateType === 0 ? '保存草稿' : '提交审核');
  console.log('收件单ID:', receiveId);
  console.log('退货方式:', refundType === 'SELF_PICKUP' ? '自提' : '快递');
  console.log('退货原因:', refundReason || '无');
  console.log('退货商品数量:', refundDetailList?.length || 0);

  res.json({
    code: 0,
    message: null,
    context: id,
    traceId: '',
    spanId: '',
    msg: '',
  });
});

module.exports = router;


