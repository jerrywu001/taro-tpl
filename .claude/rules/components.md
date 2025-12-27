# 公共组件库

项目在 `src/components/` 目录下提供了丰富的可复用组件，**开发前请优先检查是否已有可用组件，避免重复开发**。

## 基础组件

### 1. SearchInput（搜索输入框）
- **位置**：`src/components/SearchInput.vue`
- **功能**：带防抖的搜索输入框
- **特性**：
  - 内置 `useDebounce` hook，默认 500ms 防抖
  - 支持清空按钮
  - 自动 focus 管理
- **使用场景**：列表页面的搜索功能
- **示例**：
  ```vue
  <SearchInput v-model="keyword" @search="handleSearch" placeholder="搜索商品" />
  ```

### 2. DateRange（日期范围选择器）
- **位置**：`src/components/DateRange.vue`
- **功能**：日期范围选择
- **特性**：
  - 支持开始日期和结束日期选择
  - 自动格式化日期
  - 支持清空
- **使用场景**：筛选条件、报表查询
- **示例**：
  ```vue
  <DateRange v-model:startDate="startDate" v-model:endDate="endDate" />
  ```

### 3. CustomInput（自定义输入框）
- **位置**：`src/components/CustomInput.vue`
- **功能**：带标签的自定义输入框
- **特性**：
  - 支持左侧标签
  - 支持必填标记
  - 支持禁用状态
- **使用场景**：表单输入
- **示例**：
  ```vue
  <CustomInput label="姓名" v-model="name" required />
  ```

### 4. ImageList（图片列表）
- **位置**：`src/components/ImageList.vue`
- **功能**：图片列表展示和预览
- **特性**：
  - 支持图片懒加载
  - 支持点击预览大图
  - 支持删除功能
- **使用场景**：商品图片展示、订单详情图片
- **示例**：
  ```vue
  <ImageList :images="imageList" @delete="handleDelete" />
  ```

### 5. SwiperDetail（轮播图详情）
- **位置**：`src/components/SwiperDetail.vue`
- **功能**：轮播图组件
- **特性**：
  - 支持图片轮播
  - 支持指示器
  - 支持自动播放
- **使用场景**：商品详情页、图片展示
- **示例**：
  ```vue
  <SwiperDetail :images="images" :autoplay="true" />
  ```

### 6. PopupSearch（弹出搜索）
- **位置**：`src/components/PopupSearch.vue`
- **功能**：弹出式搜索选择器
- **特性**：
  - 支持搜索
  - 支持单选/多选
  - 支持分页加载
- **使用场景**：选择商品、选择客户等
- **示例**：
  ```vue
  <PopupSearch v-model="visible" :options="list" @confirm="handleConfirm" />
  ```

### 7. CheckboxButton（复选框按钮）
- **位置**：`src/components/CheckboxButton.vue`
- **功能**：按钮样式的复选框
- **特性**：
  - 支持单选/多选
  - 按钮样式
  - 支持禁用
- **使用场景**：筛选条件、选项卡
- **示例**：
  ```vue
  <CheckboxButton v-model="selected" :options="options" />
  ```

### 8. SmsButton（短信验证码按钮）
- **位置**：`src/components/SmsButton.vue`
- **功能**：发送短信验证码按钮
- **特性**：
  - 倒计时功能
  - 防重复点击
  - 自动禁用/启用
- **使用场景**：登录、注册、忘记密码
- **示例**：
  ```vue
  <SmsButton :phone="phone" @send="handleSendSms" />
  ```

### 9. MutipleSelect（多选选择器）
- **位置**：`src/components/MutipleSelect.vue`
- **功能**：多选下拉选择器
- **特性**：
  - 支持搜索
  - 支持全选
  - 支持已选项展示
- **使用场景**：多条件筛选
- **示例**：
  ```vue
  <MutipleSelect v-model="selected" :options="options" />
  ```

### 10. SingleSelect（单选选择器）
- **位置**：`src/components/SingleSelect.vue`
- **功能**：单选下拉选择器
- **特性**：
  - 支持搜索
  - 支持已选项展示
- **使用场景**：多条件筛选
- **示例**：
  ```vue
  <SingleSelect v-model="selected" :options="options" />
  ```

### 11. CustomFields（自定义字段）
- **位置**：`src/components/CustomFields.vue`
- **功能**：自定义字段展示
- **特性**：
  - 动态字段渲染
  - 支持多种字段类型
  - 支持编辑模式
- **使用场景**：详情页面、表单页面
- **示例**：
  ```vue
  <CustomFields :fields="fields" :data="formData" />
  ```

### 12. CustomTag（自定义标签）
- **位置**：`src/components/CustomTag.vue`
- **功能**：可自定义样式的标签组件
- **特性**：
  - 支持自定义文本
  - 支持自定义颜色
  - 支持圆角
- **使用场景**：标签展示、筛选条件
- **示例**：
  ```vue
  <CustomTag type="success">已完成</CustomTag>
  ```

## 动态表单组件（扩展）

### 13. MasterBankSelect（总行下拉选择）
- **位置**：`src/components/dynamic/widgets/DynamicMasterBankSelect.vue`
- **功能**：总行银行下拉选择器
- **特性**：
  - 自动调用 `queryMasterBanks()` 接口获取总行列表
  - 支持搜索功能（默认启用）
  - 支持清空选择
  - 支持只读模式
  - 使用 NutUI Picker 弹窗交互
- **数据映射**：
  - `label` ← `bankName`（银行名称）
  - `value` ← `bankCode`（银行代码）
- **使用场景**：会员管理、收款账户、付款信息等需要选择开户银行的场景

### 14. DatePicker（日期选择器）
- **位置**：`src/components/dynamic/widgets/DynamicDatePicker.vue`
- **功能**：日期选择器
- **特性**：
  - 支持日期选择
  - 支持清空选择
  - 支持只读模式
  - 使用 NutUI DatePicker 弹窗交互
- **使用场景**：表单中需要选择日期的场景

### 15. BranchBankSelect（支行下拉选择）
- **位置**：`src/components/dynamic/widgets/DynamicBranchBankSelect.vue`
- **功能**：支行银行下拉选择器（依赖总行）
- **特性**：
  - 自动调用 `queryBranchBanks()` 接口获取支行列表
  - **依赖总行代码**：必须传入 `bankCode` prop
  - 支持搜索功能（默认启用，接口搜索）
  - 支持清空选择
  - 支持只读模式
  - 使用 NutUI Picker 弹窗交互
- **数据映射**：
  - `label` ← `cnapsName`（支行名称）
  - `value` ← `cnapsCode`（大额行号）
- **使用场景**：会员管理、收款账户等需要选择开户支行的场景（总行与支行级联）

## 动态表单容器

项目包含一个强大的动态表单组件系统，位于 `src/components/dynamic/`。这些组件可以用最少的代码实现高度可配置的表单。

### 可用组件

1. **DynamicInput** - 带验证的文本输入
2. **DynamicNumber** - 带约束的数字输入
3. **DynamicTextarea** - 多行文本输入
4. **DynamicEnumRadio** - 枚举值单选
5. **DynamicEnumCheckbox** - 枚举值多选
6. **DynamicSelectSingle** - 单选下拉框
7. **DynamicSelectMulti** - 多选下拉框
8. **DynamicImageUpload** - 带预览的图片上传
9. **DynamicBrandModelSeriesPicker** - 品牌/型号/系列级联选择器
10. **DynamicAccessoryOrConditionSelect** - 配件和成色选择器

### 使用方式

```vue
<template>
  <dynamic-container :config="formConfig" v-model="formData" />
</template>

<script setup lang="ts">
import { DynamicContainer } from '@/components/dynamic';

const formConfig = {
  fields: [
    { type: 'input', key: 'name', label: '名称', required: true },
    { type: 'number', key: 'price', label: '价格', min: 0 },
    // ... 更多字段
  ]
};
</script>
```

### 组件映射

- 定义在 `src/components/dynamic/component-map.ts`
- 自动将组件类型解析为具体实现

## 组件使用原则

1. **优先复用** - 开发前必须检查 `src/components/` 是否已有可用组件
2. **一致性** - 使用统一的公共组件保持 UI 一致性
3. **扩展性** - 如需扩展功能，优先通过 props 或 slots 扩展现有组件
4. **文档化** - 新增公共组件必须添加完整的使用说明

## 组件索引

| 组件名 | 文件路径 | 主要用途 | 是否支持双向绑定 |
|--------|---------|---------|----------------|
| SearchInput | `src/components/SearchInput.vue` | 搜索输入 | ✅ |
| DateRange | `src/components/DateRange.vue` | 日期范围 | ✅ |
| CustomInput | `src/components/CustomInput.vue` | 表单输入 | ✅ |
| ImageList | `src/components/ImageList.vue` | 图片展示 | ❌ |
| SwiperDetail | `src/components/SwiperDetail.vue` | 轮播图 | ❌ |
| PopupSearch | `src/components/PopupSearch.vue` | 弹出搜索 | ✅ |
| CheckboxButton | `src/components/CheckboxButton.vue` | 选项按钮 | ✅ |
| SmsButton | `src/components/SmsButton.vue` | 短信验证 | ❌ |
| SingleSelect | `src/components/SingleSelect.vue` | 单选下拉 | ✅ |
| MutipleSelect | `src/components/MutipleSelect.vue` | 多选下拉 | ✅ |
| CustomFields | `src/components/CustomFields.vue` | 自定义字段 | ❌ |
| CustomTag | `src/components/CustomTag.vue` | 自定义标签 | ❌ |
| MasterBankSelect | `src/components/dynamic/widgets/DynamicMasterBankSelect.vue` | 总行下拉（动态） | ✅ |
| BranchBankSelect | `src/components/dynamic/widgets/DynamicBranchBankSelect.vue` | 支行下拉（动态） | ✅ |
| DatePicker | `src/components/dynamic/widgets/DynamicDatePicker.vue` | 日期选择（动态） | ✅ |
