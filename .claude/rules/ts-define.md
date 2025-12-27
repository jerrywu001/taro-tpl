---
paths: src/types/**/*.ts
---

# TypeScript 和命名规范

## 接口命名

- **使用 `I` 前缀**（如 `ILoginParam`、`IUserDetail`）
- **不使用** vO/DTO 后缀
- 使用清晰的后缀：`Request`、`Response`、`Detail`、`Param`、`List`
- 始终 `export` 接口
- 避免使用 `IPageResult<T>` 和 `ICommonResult<T>`

## 请求/响应模式

- 请求参数：`IXXXParam`（如果分页应继承 `IPageParam`）
- 响应：类型中只包含 `context` 部分
- 为所有接口和字段添加完整的 JSDoc 注释
- 使用 `/** 文档注释 */` 风格，顶层不使用 `//` 注释

## 枚举

- **使用 `E` 前缀**（如 `EStatus`、`EAuditStatus`）
- 创建对应的标签映射：`xxxLabel`、`xxxColor`、`xxxBgColor`
- 始终 `export` 枚举和映射

## 类型定义规范

参考文件：`src/types/pickup/payment.ts`、`.cursorrules`

### 命名规范

| 类型 | 前缀 | 示例 |
|------|------|------|
| 接口 | `I` | `IPaymentOrder`、`IUserInfo` |
| 枚举 | `E` | `EPaymentStatus`、`EOrderType` |
| 类型别名 | 无 | `TagType` |

### 接口定义规范

```typescript
/**
 * 付款单信息
 */
export interface IPaymentOrder {
  /** 主键ID */
  id: number;
  /** 付款单号 */
  paymentNo: string;
  /** 支付金额 */
  payAmount: number;
  /** 状态 PAYING:支付中 SUCCESS:成功 FAILED:失败 */
  status: string;
  /** 创建时间 */
  createTime: string;
}
```

### 查询参数接口

```typescript
/**
 * 付款单列表查询参数
 */
export interface IPaymentOrderListParam extends IPageParam {
  /** 付款单号（模糊搜索） */
  paymentNo?: string;
  /** 结算单类型 */
  settlementType?: ESettlementType;
  /** 状态 */
  status?: EPaymentOrderStatus;
}
```

### 枚举和映射

```typescript
/**
 * 付款状态枚举
 */
export enum EPaymentOrderStatus {
  /** 全部 */
  ALL = '',
  /** 支付中 */
  PAYING = 'PAYING',
  /** 成功 */
  SUCCESS = 'SUCCESS',
  /** 失败 */
  FAILED = 'FAILED',
}

/**
 * 付款状态标签映射
 */
export const paymentOrderStatusLabel = {
  [EPaymentOrderStatus.PAYING]: '支付中',
  [EPaymentOrderStatus.SUCCESS]: '付款成功',
  [EPaymentOrderStatus.FAILED]: '付款失败',
};

export const paymentOrderStatusType: Record<string, TagType> = {
  [EPaymentOrderStatus.PAYING]: 'primary',
  [EPaymentOrderStatus.SUCCESS]: 'success',
  [EPaymentOrderStatus.FAILED]: 'danger',
};

export const paymentOrderStatusColor = {
  [EPaymentOrderStatus.PAYING]: '#FF7D00',
  [EPaymentOrderStatus.SUCCESS]: '#00B42A',
  [EPaymentOrderStatus.FAILED]: '#F53F3F',
};
```

## 类型定义关键要求

- ✅ **生成前先检查是否已有同名且内容一样的定义**
- ✅ 所有接口和字段必须有 JSDoc 注释
- ✅ 注释中不要出现 `@extends`、`@implements`、`@example`
- ✅ 单行注释只在函数内部使用，顶层必须用 `/** */`
- ✅ 请求参数必须 `extends IPageParam`
- ✅ 所有类型必须 `export`
- ✅ 响应类型只包含 `context` 部分
- ✅ 避免使用 `IPageResult<T>` 和 `ICommonResult<T>`

## 重要常量

来自 `src/types/common.ts`：
- `GlobalKeys` - token、客户端、店铺信息的存储键
- `EAuditStatus` - 审批工作流状态
- `ESmsType` - 短信验证码类型
- `IPageParam` - 标准分页接口
