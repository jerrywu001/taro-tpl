const express = require('express');
const router = express.Router();

/**
 * 获取客服列表
 */
router.get('/support-agent/list', (req, res) => {
  res.json({
    code: 0,
    message: null,
    context: [
      {
        name: '专属客服-雅文',
        phone: '15380760850',
        avatar: 'https://img12.360buyimg.com/imagetools/jfs/t1/143702/31/16654/116794/5fc6f541Edebf8a57/4138097748889987.png',
        qrCode: 'https://luxmall-dev-cos.upfreework.cn/prod/_/invoice/2025/12/18/_/__be2d3e15/1x1.png',
      },
      {
        name: '专属客服-晴晴',
        phone: '18130066741',
        avatar: 'https://img12.360buyimg.com/imagetools/jfs/t1/196430/38/8105/14329/60ec2ef9E7739f36f/c5df8b40a33c3834.png',
        qrCode: 'https://luxmall-dev-cos.upfreework.cn/prod/_/invoice/2025/12/18/_/__be2d3e15/1x1.png',
      },
      {
        name: '平台投诉-慧慧',
        phone: '13913918577',
        avatar: 'https://img14.360buyimg.com/imagetools/jfs/t1/167902/2/8762/791358/603742d7E9b4275e3/e09d8f9a8bf4c0ef.png',
        qrCode: 'https://luxmall-dev-cos.upfreework.cn/prod/_/invoice/2025/12/18/_/__be2d3e15/1x1.png',
      },
    ]
  });
});

module.exports = router;
