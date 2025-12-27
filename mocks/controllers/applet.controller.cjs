const express = require('express');
const router = express.Router();

const apps = require('./data/apps.json');

const shops = [
  {
    shopId: 1003,
    shopName: '上海静安旗舰店',
  },
  {
    shopId: 1002,
    shopName: '吉嘉名品汇浦东新区店',
  },
  {
    shopId: 1004,
    shopName: '京东新区店',
  },
  {
    shopId: 1005,
    shopName: '天猫新区店',
  },
];

router.post('/login', (req, res) => {
  res.json({
    code: 0,
    message: null,
    context: {
      token: '1234567890',
      tenantName: '上海吉舰嘉科技服务有限公司',
      shopName: '吉嘉名品汇浦东新区店',
      shopId: 1002,
      staffName: '闻晨佳',
      msg: '请联系管理员通过下面链接在电脑浏览器打开并创建店铺！',
      redirectUri: 'https://cn.bing.com/',
    },
  });
});

router.post('/todo-auth-login', (req, res) => {
  res.json({
    code: 0,
    message: null,
    context: {
      token: '1234567890',
      tenantName: '上海吉舰嘉科技服务有限公司',
      shopName: '吉嘉名品汇浦东新区店',
      shopId: 1002,
      staffName: '闻晨佳',
      msg: '请联系管理员通过下面链接在电脑浏览器打开并创建店铺！',
      redirectUri: 'https://cn.bing.com/',
    },
  });
});

router.post('/get-login-clients', (req, res) => {
  res.json({
    code: 0,
    message: null,
    context: apps,
  });
});

router.post('/switch-shop', (req, res) => {
  res.json({
    code: 0,
    message: null,
    context: null,
  });
});

router.get('/my-shops', (req, res) => {
  res.json({
    code: 0,
    message: null,
    context: shops,
  });
});

router.get('/mine', (req, res) => {
  const id = req.query.shopId;
  const item = shops.find((item) => item.shopId === Number(id));

  res.json({
    code: 0,
    message: null,
    context: item ? {
      phone: '13800000000',
      tenantName: '上海吉舰嘉科技服务有限公司',
      shopName: item?.shopName,
      shopId: item?.shopId,
      staffName: '闻晨佳',
      postName: '销售顾问',
    } : {},
  });
});

module.exports = router;
