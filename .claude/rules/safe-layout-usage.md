# SafeLayout 组件使用规范

## 组件简介

SafeLayout 是项目的全局布局容器组件，**所有页面都必须使用** SafeLayout 作为根元素。

它提供以下功能：
- 统一的页面容器和安全区域适配
- 自定义导航栏支持（可选）
- 子导航区域（搜索栏、筛选条件）
- 底部固定按钮区域
- 底部标签栏集成（可选）
- 空状态占位符显示
- 全局加载指示器集成
- 网络连接状态监听

## Props 说明

| 属性 | 类型 | 默认值 | 说明 |
|-----|------|--------|------|
| `bg-type` | `'graybg'` \| `'whitebg'` \| `'mine-bg'` \| `'index-bg'` | `'graybg'` | 背景类型 |
| `no-padding` | `boolean` | `false` | 是否不显示左右内边距（列表页通常需要此属性） |
| `empty-placeholder` | `string` | `''` | 空状态占位文本 |
| `custom-nav` | `boolean` | `false` | 是否自定义导航栏 |
| `custom-nav-bg` | `string` | `''` | 自定义导航栏背景颜色 |
| `show-back-button` | `boolean` | `true` | 是否显示返回按钮（当 `custom-nav=true` 时生效） |
| `back-button-type` | `'default'` \| `'white'` | `'default'` | 返回按钮颜色（default为黑色，white为白色） |
| `show-footer` | `boolean` | `true` | 是否显示底部内容区域 |
| `show-footer-tabbar` | `boolean` | `false` | 是否显示底部标签栏导航 |
| `content-bg` | `string` | `''` | 内容区域背景颜色 |
| `custom-class` | `string` | `''` | 自定义CSS类名 |

## 插槽说明

| 插槽名 | 说明 | 常见用途 |
|--------|------|----------|
| `#nav-left` | 导航栏左侧区域 | 自定义左侧内容（当 `show-back-button=false` 时显示） |
| `#nav-tabs` | 导航栏标签区域 | 放置导航标签或其他控件 |
| `#nav-title` | 导航栏标题区域 | 放置自定义标题 |
| `#sub-nav` | 子导航区域 | 搜索栏、筛选条件、日期范围选择器 |
| `#footer` | 底部按钮区域 | 提交按钮、操作按钮等固定底部元素 |
| `#default` | 主内容区域 | 页面主要内容 |

## 背景类型速查表

| 值 | 说明 | 使用场景 |
|----|------|---------|
| `graybg` | 浅灰色背景（#f5f5f5） | **默认列表页** |
| `whitebg` | 白色背景 | 详情页、表单页、单独内容页 |
| `mine-bg` | 自定义"我的"页面背景 | 用户中心页面 |
| `index-bg` | 首页背景 | 首页特殊背景 |

## 导航栏说明

### 默认导航栏（不需要 custom-nav）
- 自动显示返回按钮
- 自动处理状态栏和安全区域
- 自动计算高度

### 自定义导航栏（custom-nav=true）
使用自定义导航栏时需要手动通过插槽填充导航栏内容：

```vue
<template>
  <safe-layout custom-nav custom-nav-bg="#ffffff" show-back-button>
    <template #nav-title>
      <view class="custom-title">自定义标题</view>
    </template>

    <template #nav-left>
      <!-- 当 show-back-button=false 时显示此内容 -->
      <view class="custom-left">自定义左侧</view>
    </template>

    <!-- 主内容 -->
    <view>页面内容</view>
  </safe-layout>
</template>
```

## 典型使用场景

### 基础列表页面

```vue
<template>
  <safe-layout
    bg-type="graybg"
    no-padding
    :empty-placeholder="emptyPlaceholder"
  >
    <!-- 搜索栏和筛选 -->
    <template #sub-nav>
      <search-input
        v-model="keyword"
        placeholder="搜索关键词"
        @search="fetchList"
      />
      <view class="filter-area">
        <!-- 筛选条件 -->
      </view>
    </template>

    <!-- 列表内容 -->
    <scroll-view
      class="list-container"
      :scroll-y="true"
      :lower-threshold="lowerThreshold"
      @scrolltolower="loadMore"
    >
      <view class="list-item" v-for="item in dataList" :key="item.id">
        <!-- 列表项内容 -->
      </view>
    </scroll-view>
  </safe-layout>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { DefaultPageSize, lowerThreshold } from '@/utils';

const keyword = ref('');
const dataList = ref([]);
const loading = ref(false);
const total = ref(0);

const emptyPlaceholder = computed(() => {
  if (loading.value) return '';
  if (total.value === 0) return '暂无数据';
  return '';
});

async function fetchList() {
  loading.value = true;
  try {
    // 调用API获取列表
  } finally {
    loading.value = false;
  }
}

function loadMore() {
  // 加载更多
}
</script>

<style lang="scss">
.list-container {
  height: 100%;
}

.list-item {
  padding: 16rpx;
  border-bottom: 1rpx solid #f0f0f0;
}
</style>
```

### 详情页面

```vue
<template>
  <safe-layout bg-type="whitebg">
    <!-- 主内容 -->
    <view class="detail-container">
      <view class="detail-header">
        <text class="title">{{ detail.title }}</text>
        <text class="price">{{ detail.price }}</text>
      </view>
      <view class="detail-content">
        <!-- 详情内容 -->
      </view>
    </view>

    <!-- 底部操作按钮 -->
    <template #footer>
      <view class="footer-buttons">
        <nut-button type="primary" @click="handleEdit">编辑</nut-button>
        <nut-button type="danger" @click="handleDelete">删除</nut-button>
      </view>
    </template>
  </safe-layout>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const detail = ref({
  title: '商品标题',
  price: '¥99.99'
});

function handleEdit() {
  // 编辑逻辑
}

function handleDelete() {
  // 删除逻辑
}
</script>

<style lang="scss">
.detail-container {
  padding: 16rpx;
}

.footer-buttons {
  display: flex;
  gap: 16rpx;
}
</style>
```

### 表单页面

```vue
<template>
  <safe-layout bg-type="whitebg" no-padding>
    <!-- 子导航区域 -->
    <template #sub-nav>
      <date-range
        v-model:start-date="startDate"
        v-model:end-date="endDate"
      />
    </template>

    <!-- 表单内容 -->
    <view class="form-container">
      <view class="form-item">
        <text class="label">姓名</text>
        <nut-input v-model="form.name" />
      </view>
      <view class="form-item">
        <text class="label">邮箱</text>
        <nut-input v-model="form.email" />
      </view>
    </view>

    <!-- 底部提交按钮 -->
    <template #footer>
      <nut-button
        type="primary"
        shape="square"
        :loading="isSubmitting"
        @click="handleSubmit"
      >
        提交
      </nut-button>
    </template>
  </safe-layout>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { showToast } from '@/utils';

const form = ref({
  name: '',
  email: ''
});
const isSubmitting = ref(false);
const startDate = ref('');
const endDate = ref('');

async function handleSubmit() {
  isSubmitting.value = true;
  try {
    // 提交表单
    showToast('提交成功');
  } catch (error) {
    showToast((error as Error).message, 'none');
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<style lang="scss">
.form-container {
  padding: 16rpx;
}

.form-item {
  margin-bottom: 24rpx;

  .label {
    display: block;
    font-size: 28rpx;
    font-weight: 500;
    margin-bottom: 8rpx;
  }
}
</style>
```

### 用户中心页面

```vue
<template>
  <safe-layout bg-type="mine-bg" show-footer-tabbar>
    <!-- 用户信息 -->
    <view class="mine-header">
      <image class="avatar" :src="userInfo.avatar" />
      <view class="user-info">
        <text class="nickname">{{ userInfo.nickname }}</text>
        <text class="phone">{{ userInfo.phone }}</text>
      </view>
    </view>

    <!-- 用户中心菜单 -->
    <view class="mine-menu">
      <view class="menu-item" @click="goToOrders">
        <text>我的订单</text>
        <view class="arrow" />
      </view>
      <view class="menu-item" @click="goToCollect">
        <text>我的收藏</text>
        <view class="arrow" />
      </view>
      <view class="menu-item" @click="goToSettings">
        <text>设置</text>
        <view class="arrow" />
      </view>
    </view>
  </safe-layout>
</template>

<script lang="ts" setup>
import Taro from '@tarojs/taro';
import { ref } from 'vue';

const userInfo = ref({
  avatar: 'https://example.com/avatar.jpg',
  nickname: '用户昵称',
  phone: '138****8000'
});

function goToOrders() {
  Taro.navigateTo({ url: '/pages/user/orders/index' });
}

function goToCollect() {
  Taro.navigateTo({ url: '/pages/user/collect/index' });
}

function goToSettings() {
  Taro.navigateTo({ url: '/pages/user/settings/index' });
}
</script>

<style lang="scss">
.mine-header {
  display: flex;
  align-items: center;
  padding: 24rpx;
  gap: 16rpx;

  .avatar {
    width: 80rpx;
    height: 80rpx;
    border-radius: 50%;
  }

  .user-info {
    flex: 1;

    .nickname {
      display: block;
      font-size: 32rpx;
      font-weight: 500;
    }

    .phone {
      display: block;
      font-size: 24rpx;
      color: #999;
      margin-top: 8rpx;
    }
  }
}

.mine-menu {
  .menu-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16rpx 24rpx;
    border-bottom: 1rpx solid #f0f0f0;

    .arrow {
      width: 6rpx;
      height: 12rpx;
      border-top: 2rpx solid #999;
      border-right: 2rpx solid #999;
      transform: rotate(45deg);
    }
  }
}
</style>
```

### 自定义导航栏页面

```vue
<template>
  <safe-layout
    custom-nav
    custom-nav-bg="#ffffff"
    bg-type="whitebg"
    show-back-button
  >
    <template #nav-title>
      <view class="nav-title">自定义标题</view>
    </template>

    <!-- 主内容 -->
    <view class="content">
      <text>页面内容</text>
    </view>
  </safe-layout>
</template>

<script lang="ts" setup>
// 组件逻辑
</script>

<style lang="scss">
.nav-title {
  font-size: 32rpx;
  font-weight: 500;
  color: #333;
}

.content {
  padding: 16rpx;
}
</style>
```

## 常见组合模式

### 列表 + 搜索 + 筛选

```vue
<safe-layout bg-type="graybg" no-padding :empty-placeholder="emptyPlaceholder">
  <template #sub-nav>
    <!-- 搜索栏 -->
    <search-input v-model="keyword" @search="fetchList" />

    <!-- 筛选条件 -->
    <view class="filter-area">
      <check-box-button v-model="selectedCategory" :options="categories" />
      <single-select v-model="selectedSort" :options="sortOptions" />
    </view>
  </template>

  <!-- 列表内容 -->
  <scroll-view @scrolltolower="loadMore">
    <!-- 列表项 -->
  </scroll-view>
</safe-layout>
```

### 详情 + 操作按钮

```vue
<safe-layout bg-type="whitebg">
  <!-- 详情内容 -->
  <view class="detail-section">
    <!-- 详情信息 -->
  </view>

  <!-- 操作按钮 -->
  <template #footer>
    <view class="action-buttons">
      <nut-button type="primary" @click="handleEdit">编辑</nut-button>
      <nut-button type="default" @click="handleShare">分享</nut-button>
      <nut-button type="danger" @click="handleDelete">删除</nut-button>
    </view>
  </template>
</safe-layout>
```

### 表单 + 验证 + 提交

```vue
<safe-layout bg-type="whitebg" no-padding>
  <!-- 表单内容 -->
  <view class="form-section">
    <view class="form-item">
      <text class="label">{{ field.label }}</text>
      <nut-input v-model="form[field.key]" />
    </view>
  </view>

  <!-- 提交按钮 -->
  <template #footer>
    <nut-button
      type="primary"
      shape="square"
      :disabled="!isFormValid"
      :loading="isSubmitting"
      @click="handleSubmit"
    >
      {{ isSubmitting ? '提交中...' : '提交' }}
    </nut-button>
  </template>
</safe-layout>
```

## 空状态处理

SafeLayout 会根据 `empty-placeholder` 属性自动显示空状态占位符。建议使用计算属性动态控制：

```typescript
const emptyPlaceholder = computed(() => {
  // 加载中不显示空状态
  if (loading.value) return '';

  // 数据为空时显示提示
  if (dataList.value.length === 0) {
    return '暂无数据';
  }

  // 有数据时不显示
  return '';
});
```

空状态会显示一个占位符图片和文本，自动居中显示。

## 全局加载指示器

SafeLayout 集成了全局加载指示器，通过 `showLoading()` 和 `hideLoading()` 控制：

```typescript
import { showLoading, hideLoading, showToast } from '@/utils';

async function fetchData() {
  showLoading('加载中...');
  try {
    const data = await queryData();
    showToast('加载成功');
  } catch (error) {
    showToast((error as Error).message, 'none');
  } finally {
    hideLoading();
  }
}
```

## 网络监听

SafeLayout 会自动监听网络连接状态，网络断开时会自动显示提示：

```
网络连接异常
```

无需额外配置。

## 关键注意事项

1. **必须使用 SafeLayout**：所有页面都应该以 SafeLayout 作为根容器
2. **bg-type 一定要指定**：选择合适的背景类型以确保视觉效果
3. **no-padding 用于列表**：列表页通常需要此属性让内容铺满屏幕
4. **使用 view 标签**：不要使用 HTML 的 `<div>` 等标签
5. **footer 插槽管理**：底部按钮应该放在 `#footer` 插槽中，而不是放在主内容区域
6. **scroll-view 用于列表**：列表内容需要用 `scroll-view` 包装，以支持下拉加载
7. **empty-placeholder 动态控制**：使用计算属性根据加载状态和数据状态动态控制
8. **自定义导航栏**：仅在需要完全自定义导航栏时设置 `custom-nav=true`
9. **返回按钮颜色**：在背景较深的页面可以使用 `back-button-type="white"` 使返回按钮更易见
10. **TabBar 集成**：`show-footer-tabbar=true` 会自动显示底部标签栏，用于用户中心等页面

## 推荐结构

标准的 SafeLayout 使用结构：

```vue
<template>
  <safe-layout bg-type="graybg" no-padding :empty-placeholder="emptyPlaceholder">
    <!-- 子导航区：搜索、筛选等 -->
    <template #sub-nav>
      <search-input v-model="keyword" @search="fetchList" />
    </template>

    <!-- 主内容区：列表、详情等 -->
    <scroll-view @scrolltolower="loadMore">
      <!-- 内容 -->
    </scroll-view>

    <!-- 底部按钮区：提交、操作等 -->
    <template #footer>
      <nut-button @click="handleAction">操作</nut-button>
    </template>
  </safe-layout>
</template>
```
