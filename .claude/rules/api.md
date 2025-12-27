---
paths: src/api/**/*.ts
---

# API 实现标准

## 参考文件
- `src/api/login.ts` - 基础实现参考
- `src/api/payment/index.ts` - 标准模板参考

## HTTP 请求流程

所有 API 请求使用 `src/api/request/Fetch.ts` 中的 `Http` 类：
- 方法：`Http.get()`、`Http.post()`、`Http.put()`、`Http.delete()`
- 响应格式：`{ code, message, context }`
- 成功条件：`code === EResponseCode.Succeed`
- 错误处理：通过 `getHttpErrorMessage()`

## 函数命名规范

| 操作类型 | 函数命名 | 示例 |
|----------|----------|------|
| 查询/获取 | `queryXXX` | `queryPayOrders`、`queryMineInfo` |
| 创建 | `addXXX` | `addOrder`、`addProduct` |
| 编辑 | `editXXX` | `editOrder`、`editProduct` |
| 删除 | `deleteXXX` | `deleteOrder` |
| 切换 | `toggleXXX` | `toggleStatus` |
| 动作 | `doXXX` | `doLogin`、`doSubmit` |

## 标准实现模式

```typescript
/**
 * 查询XXX列表
 * @param params 查询参数
 * @returns 列表数据
 */
export async function queryXXXList(params: IXXXListParam) {
  let total = 0;
  let data = [] as IXXXItem[];

  // 使用 toConditional 转换参数
  params = toConditional(params);

  try {
    const { code, context, message } = await Http.post<{
      total: number;
      data: IXXXItem[];
    }>(`${baseUrl}/page-query`, { ...params });

    if (code !== EResponseCode.Succeed) {
      throw new Error(message || '服务器异常，请稍后再试~');
    }

    total = context?.total || 0;
    data = context?.data || [];
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }

  return {
    total,
    data,
  };
}
```

## 关键要求

- ✅ 使用 `async/await`
- ✅ 在函数开始时初始化返回数据
- ✅ 使用 `try/catch` 配合 `getHttpErrorMessage`
- ✅ 检查 `code === EResponseCode.Succeed`
- ✅ 从 `context` 解构所需数据
- ✅ 返回处理后的数据，而不是原始响应
- ✅ 列表查询使用 `toConditional` 转换参数
