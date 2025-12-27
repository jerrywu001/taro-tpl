const express = require('express');
const router = express.Router();
const memberRealnameData = require('./data/memberRealname.json');

/**
 * 查询会员实名信息
 */
router.get('/info', (req, res) => {
  const data = memberRealnameData[0];

  res.json({
    code: 0,
    message: null,
    context: {
      ...data,
    },
    traceId: '',
    spanId: '',
  });
});

/**
 * 提交会员实名信息
 */
router.post('/submit', (req, res) => {
  res.json({
    code: 0,
    message: null,
  });
});

/**
 * 身份证识别（OCR）
 */
router.post('/recognize', (req, res) => {
  const { cardType } = req.body || {};

  // 模拟身份证识别结果
  let result = {
    name: '张三',
    idNo: '110101199001011234',
    address: '北京市朝阳区建国路1号',
    validityPeriod: '2020-01-15 至 2030-01-15',
    cardType: cardType,
  };

  // 如果识别国徽面，不返回姓名和身份证号
  if (cardType === 'emblem') {
    result = {
      name: '',
      idNo: '',
      address: '北京市朝阳区建国路1号',
      validityPeriod: '2020-01-15 至 2030-01-15',
      cardType: cardType,
    };
  }

  res.json({
    code: 0,
    message: null,
    context: result,
    traceId: '',
    spanId: '',
  });
});

module.exports = router;
