const express = require('express');
const router = express.Router();

const orgList = require('./data/orgList.json');

/**
 * 根据组织类型查询全部组织（当前clientId下）
 * POST /org-info/list
 */
router.post('/list', (req, res) => {
  let all = JSON.parse(JSON.stringify(orgList));

  const { type } = req.body || {};

  // 按组织类型筛选
  if (type && type !== '') {
    all = all.filter((item) => item.type === type);
  }

  res.json({
    code: 0,
    message: null,
    context: all,
    traceId: '',
    spanId: '',
  });
});

/**
 * 根据用户查询组织列表（兼容旧接口）
 * POST /org-list/by-user
 */
router.post('/org-list/by-user', (req, res) => {
  res.json({
    code: 0,
    message: null,
    context: orgList,
  });
});

module.exports = router;
