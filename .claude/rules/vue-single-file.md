---
paths: src/**/*.vue
---

# Vue 3 单文件组件标准

每个路由对应页面必须有 index.config.ts配置文件，用于配置页面的标题、导航栏、底部按钮等。

## 组合式 API 原则

- 使用 Vue 3 组合式 API（**不使用**选项式 API）
- 解构导入类型：`import { IType1, IType2 } from '@/types/xxx'`
- 使用 `ref()` 管理响应式数据
- 使用 `computed()` 创建计算属性
- 错误处理：使用 `try/catch` 配合 `Taro.showToast` 显示错误

## 分页和加载

- 使用 `loading` 和 `loadingMore` 状态
- 默认每页数量：`DefaultPageSize`（50）
- 下拉加载阈值：`lowerThreshold`（120）

## 搜索

- 使用 `useDebounce` hook 实现搜索输入防抖

## 分页列表标准模式

```typescript
const loading = ref(false);
const loadingMore = ref(false);
const dataList = ref<IDataItem[]>([]);
const page = ref(1);
const hasMore = ref(true);

async function loadData() {
  loading.value = true;
  try {
    const result = await queryDataList({ page: page.value, size: DefaultPageSize });
    dataList.value = page.value === 1 ? result.data : [...dataList.value, ...result.data];
    hasMore.value = result.data.length >= DefaultPageSize;
  } catch (error) {
    Taro.showToast({ title: error.message, icon: 'none' });
  } finally {
    loading.value = false;
    loadingMore.value = false;
  }
}
```

## 带防抖的搜索模式

```typescript
// 具体参考 common-hooks.md 中的 useDebounce 示例
```

## 带节流的提交模式

```typescript
// 具体参考 common-hooks.md 中的 useThrottle 示例
```

## 使用公共组件模式

```vue
<template>
  <view class="page">
    <!-- 搜索组件（自带防抖） -->
    <SearchInput v-model="keyword" @search="handleSearch" placeholder="搜索商品" />

    <!-- 日期范围选择 -->
    <DateRange v-model:startDate="startDate" v-model:endDate="endDate" />

    <!-- 图片列表 -->
    <ImageList :images="productImages" @delete="handleDeleteImage" />

    <!-- 短信验证码按钮 -->
    <SmsButton :phone="phone" @send="handleSendSms" />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SearchInput from '@/components/SearchInput.vue';
import DateRange from '@/components/DateRange.vue';
import ImageList from '@/components/ImageList.vue';
import SmsButton from '@/components/SmsButton.vue';

const keyword = ref('');
const startDate = ref('');
const endDate = ref('');
const productImages = ref<string[]>([]);
const phone = ref('');

// SearchInput 自带防抖，无需手动处理
function handleSearch(value: string) {
  console.log('搜索关键词：', value);
  // 执行搜索逻辑
}

function handleDeleteImage(index: number) {
  productImages.value.splice(index, 1);
}

function handleSendSms() {
  // 发送短信验证码
}
</script>
```

## 脚本设置规范

```typescript
<script lang="ts" setup>
// 1. 导入 Vue 相关
import { ref, computed, reactive } from 'vue';

// 2. 导入 Taro 和框架相关
import Taro, { useLoad } from '@tarojs/taro';

// 3. 导入公共组件
import SafeLayout from '@/layout/SafeLayout.vue';
import SearchInput from '@/components/SearchInput.vue';

// 4. 导入业务类型
import { IXXXListParam, IXXXItem } from '@/types/xxx';

// 5. 导入 API
import { queryXXXList } from '@/api/xxx';

// 6. 导入工具和常量
import { DefaultPageSize, showLoading, hideLoading, showToast } from '@/utils';
import { useDebounce, useThrottle } from '@/hooks';

// 7. 导入样式
import '@/styles/common-list.scss';
</script>
```

## 模板规范

### 禁用 ESLint 警告（如需）

```vue
<!-- eslint-disable vue/v-on-event-hyphenation -->
<template>
  <!-- 内容 -->
</template>
```

### 使用小程序标签

```vue
<template>
  <!-- ✅ 正确：使用小程序标签 -->
  <view class="container">
    <text class="title">标题</text>
    <image :src="imageUrl" />
  </view>

  <!-- ❌ 错误：不使用 HTML 标签 -->
  <!-- <div class="container">
    <span class="title">标题</span>
    <img :src="imageUrl" />
  </div> -->
</template>
```

## 样式规范

```vue
<style lang="scss">
/* ✅ 正确：不使用 scoped，使用全局样式 */
.my-component {
  color: #333;

  &__header {
    font-size: 16px;
  }

  &__content {
    padding: 10px;
  }
}
</style>

<!-- ❌ 错误：不使用 scoped -->
<!-- <style lang="scss" scoped>
  /* ... */
</style> -->
```

## 关键规范要点

- ✅ 不使用选项式 API
- ✅ 响应式数据使用 `ref()` 或 `reactive()`
- ✅ 计算属性使用 `computed()`
- ✅ 使用 `try/catch` 处理错误
- ✅ 不使用 `<style scoped>`
- ✅ 使用小程序标签（view、text、image）
- ✅ 使用 BEM 命名规范
- ✅ 优先复用公共组件
