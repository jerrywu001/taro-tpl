# 自定义 Hooks

## useDebounce - 防抖 Hook

延迟函数执行直到用户停止输入。用于搜索输入和表单验证。

**参考代码**：`src/components/SearchInput.vue`

### 使用示例

```typescript
import { useDebounce } from '@/hooks';

const { run: handleSearch, isExecuting: searching } = useDebounce(doSearch, 500); // 默认：300ms

// 在搜索输入中使用
async function doSearch(value: string) {
  try {
    await queryXXX({ keyword: value });
  } catch (error) {
    const errMsg = (error as Error).message;

    showToast(errMsg || '搜索失败，请稍后重试');
  }
}

// template中实际使用handleSearch和isExecuting
<template>
  <nut-search
    v-model="searchValue"
    :loading="searching"
    @input="handleSearch"
  />
</template>
```

### 返回值

| 返回值 | 类型 | 说明 |
|--------|------|------|
| `run` | 函数 | 防抖函数执行器 |
| `cancel` | 函数 | 取消待执行的操作 |
| `isExecuting` | Ref | 响应式 ref，指示执行状态 |

### 使用场景

- 搜索输入框：等待用户停止输入后再请求
- 表单验证：只在用户停止输入后验证
- 自动保存：用户停止编辑后保存

---

## useThrottle - 节流 Hook

限制函数执行频率。用于按钮点击和表单提交。

### 使用示例

```typescript
import { useThrottle } from '@/hooks';

const { run: handleSubmit, isThrottled: saving } = useThrottle(doSubmit, 1000); // 默认：600ms

// 在提交按钮中使用
aysnc function doSubmit() {
  try {
    await submitXXX();
  } catch (error) {
    const errMsg = (error as Error).message;

    showToast(errMsg || '提交失败，请稍后重试');
  }
}

// template中实际使用handleSubmit和saving
<template>
  <nut-button
    type="primary"
    shape="square"
    :loading="saving"
    @click="handleSubmit"
  >
    提交
  </nut-button>
</template>
```

### 返回值

| 返回值 | 类型 | 说明 |
|--------|------|------|
| `run` | 函数 | 节流函数执行器 |
| `reset` | 函数 | 重置节流状态（允许立即执行） |
| `isThrottled` | Ref | 响应式 ref，指示节流状态 |

### 使用场景

- 按钮点击：防止快速重复点击
- 表单提交：限制提交频率
- 滚动事件：限制滚动事件处理频率

---

## 对比总结

| 特性 | useDebounce | useThrottle |
|------|------------|------------|
| 执行时机 | 操作停止后执行 | 固定时间间隔执行 |
| 适用场景 | 搜索、验证 | 按钮、滚动 |
| 触发次数 | 1 次（最后一次） | 多次（限制频率） |
| 效果 | 延迟执行 | 均匀执行 |

---

## 其他自定义 Hooks

项目还包含以下自定义 Hook：

### useNavHeight（导航栏高度）

用于获取小程序导航栏高度，用于适配自定义导航栏的布局。
