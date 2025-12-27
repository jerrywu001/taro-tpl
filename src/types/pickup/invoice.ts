/**
 * 单据类型枚举
 */
export enum EBillType {
  /** 线下收件单 */
  OfflineReceive = 'OFFLINE_RECEIVE',
  /** 线下销售单 */
  OfflineSale = 'OFFLINE_SALE',
}

/**
 * 单据类型标签映射
 */
export const billTypeLabel = {
  [EBillType.OfflineReceive]: '线下收件单',
  [EBillType.OfflineSale]: '线下销售单',
};

/**
 * 发票类型枚举
 */
export enum EInvoiceType {
  /** 专票 */
  Special = 0,
  /** 普票 */
  Normal = 1,
}

/**
 * 发票类型标签映射
 */
export const invoiceTypeLabel = {
  [EInvoiceType.Special]: '专票',
  [EInvoiceType.Normal]: '普票',
};

/**
 * 发票单状态枚举
 */
export enum EInvoiceOrderStatus {
  /** 待申请 */
  Pending = 0,
  /** 审核中 */
  Auditing = 1,
  /** 驳回 */
  Rejected = 2,
  /** 待开票 */
  WaitInvoice = 3,
  /** 已开票 */
  Invoiced = 4,
}

/**
 * 发票单状态标签映射
 */
export const invoiceOrderStatusLabel = {
  [EInvoiceOrderStatus.Pending]: '待申请',
  [EInvoiceOrderStatus.Auditing]: '审核中',
  [EInvoiceOrderStatus.Rejected]: '驳回',
  [EInvoiceOrderStatus.WaitInvoice]: '待开票',
  [EInvoiceOrderStatus.Invoiced]: '已开票',
};

/**
 * 发票单状态颜色映射
 */
export const invoiceOrderStatusColor = {
  [EInvoiceOrderStatus.Pending]: '#165DFF',
  [EInvoiceOrderStatus.Auditing]: '#FF7D00',
  [EInvoiceOrderStatus.Rejected]: '#FF4948',
  [EInvoiceOrderStatus.WaitInvoice]: '#165DFF',
  [EInvoiceOrderStatus.Invoiced]: '#00B42A',
};

/**
 * 发票单状态背景色映射
 */
export const invoiceOrderStatusBgColor = {
  [EInvoiceOrderStatus.Pending]: '#E8F3FF',
  [EInvoiceOrderStatus.Auditing]: '#FFF7E8',
  [EInvoiceOrderStatus.Rejected]: '#FFECE8',
  [EInvoiceOrderStatus.WaitInvoice]: '#E8F3FF',
  [EInvoiceOrderStatus.Invoiced]: '#E8FFEA',
};

/**
 * 收件单开票信息
 */
export interface IReceiveInvoice {
  /** 开票单号 */
  no: string;
  /** 单据编号 */
  billNo: string;
  /** 单据类型(OFFLINE_RECEIVE:线下收件单，OFFLINE_SALE:线下销售单) */
  billType: string;
  /** 发票类型(0:专票，1:普票) */
  invoiceType: number;
  /** 商品标题 */
  productName: string;
  /** 开票金额 */
  invoiceAmount: number;
  /** 发票状态(0:待申请，1:审核中，2:驳回，3:待开票，4:已开票) */
  invoiceStatus: number;
}

/**
 * 查询收件单开票信息列表请求参数
 */
export interface IReceiveInvoiceListParam {
  /** 收件单id */
  receiveId: number;
}

