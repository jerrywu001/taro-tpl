const express = require('express');
const router = express.Router();

const accessoryList = require('./data/accessoryList.json');
const brandList = require('./data/brand.json');
const modelList = require('./data/model.json');
const productConditionList = require('./data/quality.json');
const seriesList = require('./data/series.json');
const categoryList = require('./data/category.json');
const inventoryList = require('./data/inventory.json');
const inventoryPageData = require('./data/inventoryPage.json');

router.get('/accessory', (req, res) => {
  res.json({
    code: 0,
    message: null,
    context: accessoryList,
  });
});

router.get('/brand', (req, res) => {
  res.json({
    code: 0,
    message: null,
    context: brandList,
  });
});

router.get('/model', (req, res) => {
  res.json({
    code: 0,
    message: null,
    context: modelList,
  });
});

router.get('/product-condition', (req, res) => {
  res.json({
    code: 0,
    message: null,
    context: productConditionList,
  });
});

router.get('/series', (req, res) => {
  res.json({
    code: 0,
    message: null,
    context: seriesList,
  });
});

router.get('/category', (req, res) => {
  res.json({
    code: 0,
    message: null,
    context: categoryList,
  });
});

router.post('/inventory-item/list', (req, res) => {
  const { productName } = req.body;
  let filteredData = inventoryList.data;

  // 支持商品名称搜索
  if (productName) {
    filteredData = filteredData.filter(item =>
      item.productName.toLowerCase().includes(productName.toLowerCase())
    );
  }

  res.json({
    code: 0,
    message: null,
    context: filteredData,
  });
});

// 库存分页查询接口
router.post('/inventory-item/page', (req, res) => {
  const {
    page = 1,
    size = 10,
    status,
    categoryId,
    brandId,
    conditionId,
    accessoryId,
    settlePriceStart,
    settlePriceEnd,
    costPriceStart,
    costPriceEnd,
    salePriceStart,
    salePriceEnd,
    inboundTimeStart,
    inboundTimeEnd,
    commonField,
    orders = []
  } = req.body;

  let filteredData = [...inventoryPageData.data];

  // 通用字段搜索（支持唯一码、商品标题、品牌名称）
  if (commonField) {
    const searchTerm = commonField.toLowerCase();
    filteredData = filteredData.filter(item =>
      (item.uniqueCode && item.uniqueCode.toLowerCase().includes(searchTerm)) ||
      (item.spuTitle && item.spuTitle.toLowerCase().includes(searchTerm)) ||
      (item.brandName && item.brandName.toLowerCase().includes(searchTerm))
    );
  }

  // 状态筛选
  if (status) {
    filteredData = filteredData.filter(item => item.status === status);
  }

  // 类目筛选
  if (categoryId) {
    filteredData = filteredData.filter(item =>
      item.categoryId === categoryId || item.leafCategoryId === categoryId
    );
  }

  // 品牌筛选
  if (brandId) {
    filteredData = filteredData.filter(item => item.brandId === brandId);
  }

  // 成色筛选
  if (conditionId) {
    filteredData = filteredData.filter(item => item.conditionId === conditionId);
  }

  // 配件筛选
  if (accessoryId) {
    filteredData = filteredData.filter(item => {
      if (!item.accessoryIdsJson) return false;
      try {
        const accessories = JSON.parse(item.accessoryIdsJson);
        return accessories.includes(accessoryId);
      } catch {
        return false;
      }
    });
  }

  // 结算价筛选
  if (settlePriceStart !== undefined || settlePriceEnd !== undefined) {
    filteredData = filteredData.filter(item => {
      const price = item.settlePrice || 0;
      const matchStart = settlePriceStart === undefined || price >= settlePriceStart;
      const matchEnd = settlePriceEnd === undefined || price <= settlePriceEnd;
      return matchStart && matchEnd;
    });
  }

  // 成本价筛选
  if (costPriceStart !== undefined || costPriceEnd !== undefined) {
    filteredData = filteredData.filter(item => {
      const price = item.costPrice || 0;
      const matchStart = costPriceStart === undefined || price >= costPriceStart;
      const matchEnd = costPriceEnd === undefined || price <= costPriceEnd;
      return matchStart && matchEnd;
    });
  }

  // 销售价筛选
  if (salePriceStart !== undefined || salePriceEnd !== undefined) {
    filteredData = filteredData.filter(item => {
      const price = item.salePrice || 0;
      const matchStart = salePriceStart === undefined || price >= salePriceStart;
      const matchEnd = salePriceEnd === undefined || price <= salePriceEnd;
      return matchStart && matchEnd;
    });
  }

  // 入库时间筛选
  if (inboundTimeStart || inboundTimeEnd) {
    filteredData = filteredData.filter(item => {
      if (!item.inboundTime) return false;
      const itemTime = new Date(item.inboundTime).getTime();
      const matchStart = !inboundTimeStart || itemTime >= new Date(inboundTimeStart).getTime();
      const matchEnd = !inboundTimeEnd || itemTime <= new Date(inboundTimeEnd).getTime();
      return matchStart && matchEnd;
    });
  }

  // 排序处理
  if (orders && orders.length > 0) {
    filteredData.sort((a, b) => {
      for (const order of orders) {
        const { orderBy, order: direction } = order;
        let aValue = 0;
        let bValue = 0;

        // 根据排序字段获取值
        switch (orderBy) {
          case 'salePrice':
            aValue = a.salePrice || 0;
            bValue = b.salePrice || 0;
            break;
          case 'costPrice':
            aValue = a.costPrice || 0;
            bValue = b.costPrice || 0;
            break;
          case 'settlePrice':
            aValue = a.settlePrice || 0;
            bValue = b.settlePrice || 0;
            break;
          case 'inboundTime':
            aValue = a.inboundTime ? new Date(a.inboundTime).getTime() : 0;
            bValue = b.inboundTime ? new Date(b.inboundTime).getTime() : 0;
            break;
          case 'shelfTime':
            aValue = a.shelfTime ? new Date(a.shelfTime).getTime() : 0;
            bValue = b.shelfTime ? new Date(b.shelfTime).getTime() : 0;
            break;
          default:
            continue;
        }

        // 比较值
        if (aValue !== bValue) {
          return direction === 'DESC' ? bValue - aValue : aValue - bValue;
        }
      }
      return 0;
    });
  }

  // 分页处理
  const total = filteredData.length;
  const startIndex = (page - 1) * size;
  const endIndex = startIndex + size;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  res.json({
    code: 0,
    message: null,
    context: {
      data: paginatedData,
      total: total
    },
    traceId: `trace-${Date.now()}`,
    spanId: `span-${Date.now()}`
  });
});

module.exports = router;
