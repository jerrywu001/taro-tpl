# 工具函数

## 位置

所有工具函数定义在 `src/utils/index.ts` 中。

## 常用工具函数速查表

| 函数名 | 功能 | 示例 |
|--------|------|------|
| `formatMoneyString()` | 格式化货币，添加千分位 | `formatMoneyString(10000)` → `'10,000'` |
| `desensitizePhone()` | 手机号脱敏 | `desensitizePhone('13800138000')` → `'138****8000'` |
| `showToast()` | 显示提示信息 | `showToast('操作成功')` |
| `showLoading()` | 显示加载指示器 | `showLoading('加载中...')` |
| `hideLoading()` | 隐藏加载指示器 | `hideLoading()` |
| `formatCountValue()` | 格式化大数字，使用万/亿单位 | `formatCountValue(12000)` → `'1.2万'` |
| `formatDateStrToZhcn()` | 格式化日期为中文样式 | `formatDateStrToZhcn('2025-01-23')` → `'2025年1月23日'` |

## 详细说明

### formatMoneyString() - 货币格式化

**用途**：为货币值添加千分位分隔符

**示例**：
```typescript
formatMoneyString(1000);      // '1,000'
formatMoneyString(1000000);   // '1,000,000'
formatMoneyString(999);       // '999'
```

### desensitizePhone() - 手机号脱敏

**用途**：对手机号进行脱敏处理（隐藏中间位数）

**示例**：
```typescript
desensitizePhone('13800138000');  // '138****8000'
desensitizePhone('15912345678');  // '159****5678'
```

### showToast() - 显示提示信息

**用途**：显示一条消息提示，是 Taro 提示的包装器

**示例**：
```typescript
// 基础用法
showToast('操作成功');

// 自定义参数
showToast('保存失败', 'error');

// 长时间显示
showToast('请稍候', 'loading', 2000);
```

### showLoading() - 显示加载指示器

**用途**：显示全局加载指示器，防止用户交互

**示例**：
```typescript
// 显示加载
showLoading('加载中...');

// 显示无标题的加载指示器
showLoading(undefined, true);

// 之后隐藏
hideLoading();
```

**参数**：
- 第一个参数：加载文本
- 第二个参数：是否禁用用户交互

### hideLoading() - 隐藏加载指示器

**用途**：隐藏之前显示的加载指示器

**示例**：
```typescript
async function fetchData() {
  showLoading('加载中...');
  try {
    const data = await queryData();
    showToast('加载成功');
  } catch (error) {
    showToast(error.message, 'error');
  } finally {
    hideLoading();
  }
}
```

### formatCountValue() - 大数字格式化

**用途**：将大数字格式化为更易读的形式（万/亿）

**示例**：
```typescript
formatCountValue(100);        // '100'
formatCountValue(10000);      // '1万'
formatCountValue(50000);      // '5万'
formatCountValue(100000000);  // '1亿'
```

### formatDateStrToZhcn() - 日期中文格式化

**用途**：将日期字符串格式化为中文样式

**示例**：
```typescript
formatDateStrToZhcn('2025-01-23');    // '2025年1月23日'
formatDateStrToZhcn('2025-01-01');    // '2025年1月1日'
formatDateStrToZhcn('2024-12-31');    // '2024年12月31日'
```

## 常用工具常量

### DefaultPageSize - 默认分页大小

```typescript
const DefaultPageSize = 50;  // 每页显示 50 条数据
```

### lowerThreshold - 下拉加载阈值

```typescript
const lowerThreshold = 120;  // 距离底部 120px 时触发加载更多
```

## 在列表页面中的应用

```typescript
<script lang="ts" setup>
import {
  DefaultPageSize,
  showLoading,
  hideLoading,
  showToast,
  formatMoneyString,
  desensitizePhone,
  lowerThreshold
} from '@/utils';

const params = ref<IListParam>({
  page: 1,
  size: DefaultPageSize,  // 使用默认页大小
});

async function fetchList() {
  showLoading(undefined, true);  // 显示加载

  try {
    const result = await queryList(params.value);
    dataList.value = result.data;

    // 格式化货币显示
    dataList.value.forEach(item => {
      item.displayPrice = formatMoneyString(item.price);
      item.displayPhone = desensitizePhone(item.phone);
    });

    showToast('加载成功');
  } catch (error) {
    showToast(error.message, 'error');
  } finally {
    hideLoading();  // 隐藏加载
  }
}
</script>

<template>
  <scroll-view
    :lower-threshold="lowerThreshold"  // 使用加载阈值
    @scrolltolower="loadMore"
  >
    <!-- 列表内容 -->
  </scroll-view>
</template>
```

## 重要说明

- 所有工具函数都已导出，可以直接在组件中使用
- `showToast` 和 `showLoading` 是 Taro 方法的包装器，提供统一的样式和行为
- 大多数工具函数是纯函数，无副作用，可以直接在模板或脚本中使用
- 日期格式化函数假设输入格式为 `YYYY-MM-DD`
