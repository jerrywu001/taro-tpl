const express = require('express');
const router = express.Router();

const officialPriceBrands = require('./data/official-price-brands.json');
const officialPriceProducts = require('./data/official-price-products.json');
const categoriesByBrand = require('./data/categories-by-brand.json');
const seriesList = require('./data/series-list.json');
const modelList = require('./data/model-list.json');

/**
 * 小程序公价品牌列表（按首字母分组）
 * GET /official-price-product/mini/brands
 */
router.get('/official-price-product/mini/brands', (req, res) => {
  res.json({
    code: 0,
    message: null,
    context: officialPriceBrands,
    traceId: '',
    spanId: '',
  });
});

/**
 * 小程序公价商品搜索（支持名称模糊-ID精确）
 * POST /official-price-product/mini/search
 */
router.post('/official-price-product/mini/search', (req, res) => {
  const {
    page = 1,
    size = 10,
    brandId,
    seriesId,
    modelId,
    keyword,
  } = req.body;

  let filteredData = [...officialPriceProducts.data];

  // 精确匹配 ID
  if (brandId) {
    filteredData = filteredData.filter(() => {
      // 这里简化处理，实际应该根据品牌ID过滤
      return true;
    });
  }

  if (seriesId) {
    filteredData = filteredData.filter(() => {
      // 这里简化处理，实际应该根据系列ID过滤
      return true;
    });
  }

  if (modelId) {
    filteredData = filteredData.filter(() => {
      // 这里简化处理，实际应该根据型号ID过滤
      return true;
    });
  }


  // 关键字搜索（匹配标题/品牌/系列/型号）
  if (keyword) {
    filteredData = filteredData.filter((item) =>
      item.title.includes(keyword) ||
      item.brandName.includes(keyword) ||
      item.brandNameEn.toLowerCase().includes(keyword.toLowerCase()) ||
      item.seriesName.includes(keyword) ||
      item.modelName.includes(keyword) ||
      item.productCode.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  const total = filteredData.length;
  const start = (page - 1) * size;
  const end = start + size;
  const paginatedData = filteredData.slice(start, end);

  res.json({
    code: 0,
    message: null,
    context: {
      data: paginatedData,
      total: total,
    },
    traceId: '',
    spanId: '',
  });
});

/**
 * 查看公价商品详情
 * GET /official-price-product/detail/:id
 */
router.get('/official-price-product/detail/:id', (req, res) => {
  const { id } = req.params;

  // 从搜索列表中查找对应的商品
  const product = officialPriceProducts.data.find((item) => item.id === Number(id));

  if (!product) {
    res.json({
      code: 404,
      message: '商品不存在',
      context: null,
      traceId: '',
      spanId: '',
    });
    return;
  }

  // 构造详情数据（包含更多字段）
  const detailData = {
    id: product.id,
    leafCategoryId: 1003,
    productCode: product.productCode,
    title: product.title,
    status: 1,
    formSchemaHash: 'abc123def456',
    brandId: product.id, // 简化处理，实际应该有独立的brandId
    brandName: product.brandName,
    brandNameEn: product.brandNameEn,
    seriesId: product.id + 100,
    seriesName: product.seriesName,
    modelId: product.id + 1000,
    modelName: product.modelName,
    dynamicFields: product.dynamicFields || [],
  };

  res.json({
    code: 0,
    message: null,
    context: detailData,
    traceId: '',
    spanId: '',
  });
});

/**
 * 根据品牌查询关联叶子类目
 * GET /category/search-by-brand?brandId=xxx
 */
router.get('/category/search-by-brand', (req, res) => {
  // 简化处理，返回所有类目数据
  // 实际应该根据 brandId 过滤
  res.json({
    code: 0,
    message: null,
    context: categoriesByBrand,
    traceId: '',
    spanId: '',
  });
});

/**
 * 查询系列列表
 * GET /series?brandId=xxx&leafCategoryId=xxx
 */
router.get('/series', (req, res) => {
  // 简化处理，返回所有系列数据
  // 实际应该根据 brandId 和 leafCategoryId 过滤
  res.json({
    code: 0,
    message: null,
    context: seriesList,
    traceId: '',
    spanId: '',
  });
});

/**
 * 查询型号列表
 * GET /model?brandId=xxx&seriesId=xxx&leafCategoryId=xxx
 */
router.get('/model', (req, res) => {
  // 简化处理，返回所有型号数据
  // 实际应该根据 brandId、seriesId 和 leafCategoryId 过滤
  res.json({
    code: 0,
    message: null,
    context: modelList,
    traceId: '',
    spanId: '',
  });
});

module.exports = router;
