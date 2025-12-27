---
paths: mocks/**/*.cjs
---

# Mock 服务器架构

## 文件结构

```
mocks/
├── index.cjs                    # 主服务器（端口 3003）
├── routes/
│   └── xxx.cjs                  # 路由文件（使用公共路径前缀）
├── controllers/
│   ├── xxx.controller.cjs       # 控制器逻辑
│   └── data/
│       └── xxx.json             # 数据文件
```

## 标准规范

1. **路由**：在路由文件中使用 `router.use('/common-path', controller)`
2. **主应用**：使用 `app.use('/api/module', require('./routes/xxx.cjs'))` 挂载路由
3. **控制器**：移除公共路径前缀，保留具体的端点路径
4. **分页**：支持 `page` 和 `size` 参数
5. **搜索**：支持关键词过滤
6. **响应格式**：`{ code: 0, message: null, context: { total, data } }`

## Mock API 模块

Mock 服务器提供以下 API 模块（在 `mocks/index.cjs` 中挂载）：

1. **`/api/luxmall-staff`** - 员工端和小程序 APIs
   - 登录、认证
   - 用户信息（我的）
   - 店铺管理
   - 客户端管理

2. **`/api/luxmall-product`** - 商品管理
   - 商品/库存管理
   - 品牌、型号、系列
   - 配件、品质评级

3. **`/api/luxmall-settlement`** - 结算管理
   - 结算单
   - 付款处理
   - 结算审批

4. **`/api/luxmall-invoice`** - 发票管理
   - 发票详情
   - 发票处理

5. **`/api/luxmall-operation`** - 运营管理

6. **`/api/luxmall-org`** - 组织管理
   - 会员管理

7. **`/api/luxmall-infra`** - 基础设施服务
   - 文件上传
   - 短信发送

## 路由文件示例

参考文件：`mocks/routes/settlement.cjs`

```javascript
const express = require('express');
const router = express.Router();
const payOrders = require('./data/payOrders.json');

/**
 * 列表查询 - 支持分页与筛选
 */
router.post('/payment-order/page-query', (req, res) => {
  let all = JSON.parse(JSON.stringify(payOrders));

  const { page = 1, size = 50, conditions = [] } = req.body || {};

  // 支持 conditions 数组筛选
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

module.exports = router;
```

## JSON 数据文件规范

```json
[
  {
    "id": 1,
    "paymentNo": "FK202501230001",
    "settlementNo": "JS202501230001",
    "payAmount": 12800,
    "actualAmount": 12800,
    "status": "SUCCESS",
    "createTime": "2025-01-23 14:20:00"
  }
]
```

关键要求：
- ✅ 只包含 `context` 部分（数组或对象）
- ✅ 不添加注释
- ✅ 生成约 20 条真实测试数据
- ✅ 完全匹配接口定义

## Mock 关键要求

- ✅ 支持 `conditions` 数组格式筛选
- ✅ 支持 `page`、`size` 分页参数
- ✅ 返回格式：`{ code: 0, message: null, context: { total, data } }`
- ✅ 支持 `like`（模糊）和 `eq`（精确）查询
