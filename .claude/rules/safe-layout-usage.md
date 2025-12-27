# SafeLayout 组件使用规范

## 组件简介

页面必须使用SafeLayout作为根容器。

SafeLayout 是项目的全局布局组件，提供统一的页面容器、导航栏、导航栏下方子导航区、底部按钮区等的管理。所有页面都应该使用 SafeLayout 作为根容器。

## Props 说明

| 属性 | 类型 | 默认值 | 说明 |
|-----|------|--------|------|
| `bg-type` | `'graybg'` \| `'whitebg'` \| `'mine-bg'` \| | 背景类型 |
| `no-padding` | `boolean` | `false` | 是否不显示左右内边距 |
| `empty-placeholder` | `string` | `''` | 空状态占位文本 |
| `custom-nav` | `boolean` | `false` | 是否自定义导航栏 |
| `show-back-button` | `boolean` | `true` | 是否显示返回按钮 |
| `show-footer-tabbar` | `boolean` | `false` | 是否显示底部 TabBar |

## 插槽说明

| 插槽名 | 说明 | 常见用途 |
|--------|------|----------|
| `#sub-nav` | 子导航区域 | 放置搜索栏、筛选条件 |
| `#footer` | 底部按钮区域 | 放置固定底部按钮 |
| `default` | 主内容区域 | 放置页面主要内容 |

## 背景类型速查表

| 值 | 说明 | 使用场景 |
|----|------|---------|
| `graybg` | 浅灰色背景 | **默认列表页** |
| `whitebg` | 白色背景 | 详情页、表单页 |
| `mine-bg` | 自定义"我的"页面背景 | 用户中心页面 |

## 典型使用

### 基础列表页面

```vue
<template>
  <safe-layout
    bg-type="graybg"
    no-padding
    :empty-placeholder="emptyPlaceholder"
  >
    <template #sub-nav>
      <!-- 搜索栏 -->
      <search-input
        v-model="keyword"
        bg-color="#f5f5f5"
        class="datalist-search"
        placeholder="搜索关键词"
        full-width
        allow-clear
        @change="fetchList"
      />
    </template>

    <!-- 主内容区域 -->
    <div v-if="!loading && total > 0" class="dlc-container">
      <scroll-view
        class="dlc-scroll"
        :scroll-y="true"
        :lower-threshold="120"
        @scrolltolower="loadMore"
      >
        <view class="dlc-list">
          <view v-for="item in dataList" :key="item.id" class="dlc-item">
            <!-- 列表项内容 -->
          </view>
        </view>
      </scroll-view>
    </div>
  </safe-layout>
</template>
```

### 详情页面

```vue
<template>
  <safe-layout bg-type="whitebg">
    <!-- 主内容 -->
    <view class="detail-container">
      <!-- 详情内容 -->
    </view>

    <!-- 底部按钮 -->
    <template #footer>
      <view class="footer-btns">
        <button @click="handleEdit">编辑</button>
        <button @click="handleDelete">删除</button>
      </view>
    </template>
  </safe-layout>
</template>
```

### 表单页面

```vue
<template>
  <safe-layout bg-type="whitebg" no-padding>
    <template #sub-nav>
      <!-- 筛选条件等 -->
      <date-range v-model:startDate="startDate" v-model:endDate="endDate" />
    </template>

    <!-- 表单内容 -->
    <view class="form-container">
      <!-- 表单字段 -->
    </view>

    <!-- 底部提交按钮 -->
    <template #footer>
      <button @click="handleSubmit" :disabled="isSubmitting">
        提交
      </button>
    </template>
  </safe-layout>
</template>
```

### 登录/认证页面

```vue
<template>
  <safe-layout bg-type="authscale" custom-nav show-back-button>
    <!-- 认证内容 -->
    <view class="auth-container">
      <!-- 登录表单 -->
    </view>
  </safe-layout>
</template>
```

### 用户中心页面

```vue
<template>
  <safe-layout bg-type="minebg" show-footer-tabbar>
    <!-- 用户中心内容 -->
    <view class="mine-container">
      <!-- 用户信息 -->
    </view>
  </safe-layout>
</template>
```

## 常见组合

### 列表 + 搜索 + 筛选

```vue
<safe-layout bg-type="graybg" no-padding :empty-placeholder="emptyPlaceholder">
  <template #sub-nav>
    <search-input v-model="keyword" @change="fetchList" />
    <view class="filter-area">
      <!-- 筛选条件 -->
    </view>
  </template>

  <!-- 列表内容 -->
</safe-layout>
```

### 详情 + 操作按钮

```vue
<safe-layout bg-type="whitebg">
  <!-- 详情内容 -->

  <template #footer>
    <view class="action-buttons">
      <button @click="handleEdit">编辑</button>
      <button @click="handleShare">分享</button>
    </view>
  </template>
</safe-layout>
```

### 表单 + 验证 + 提交

```vue
<safe-layout bg-type="whitebg" no-padding>
  <!-- 表单字段 -->

  <template #footer>
    <button
      @click="handleSubmit"
      :disabled="!formValid || isSubmitting"
      :loading="isSubmitting"
    >
      {{ isSubmitting ? '提交中...' : '提交' }}
    </button>
  </template>
</safe-layout>
```

## 与空状态的交互

SafeLayout 会根据 `empty-placeholder` 属性自动处理空状态显示：

```typescript
// 计算属性：空状态占位文本
const emptyPlaceholder = computed(() => {
  // 数据加载中不显示空状态
  if (loading.value) return '';

  // 数据为空时显示
  if (total.value === 0) return '暂无数据';

  // 有数据时不显示
  return '';
});
```

## 注意事项

1. **ListItem 容器**：列表项必须使用 `dlc-container`、`dlc-item` 等类名
2. **无 Padding 列表**：列表页通常需要 `no-padding`，以让列表项铺满屏幕
3. **背景类型**：务必选择合适的 `bg-type`，以保证视觉效果一致
4. **底部按钮区**：使用 `#footer` 插槽放置固定按钮
5. **子导航区**：使用 `#sub-nav` 插槽放置搜索、筛选等
6. **滚动区域**：列表内容需要使用 `scroll-view`，以支持下拉加载

## 样式联动

SafeLayout 提供的背景会影响：
- 主容器的背景色
- 文本的默认色
- 内边距和边距

使用对应的 `bg-type` 后，内部内容无需重复设置背景色。
