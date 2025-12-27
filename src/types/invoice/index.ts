/**
 * 发票类型枚举
 */
export enum EInvoiceType {
  /** 普通发票 */
  NORMAL = 'NORMAL',
  /** 增值税专用发票 */
  VAT = 'VAT',
}

export const invoiceTypeLabel = {
  [EInvoiceType.NORMAL]: '普通发票',
  [EInvoiceType.VAT]: '增值税专用发票',
};

/**
 * 发票内容枚举
 */
export enum EInvoiceContent {
  /** 商品明细 */
  DETAIL = 'DETAIL',
  /** 商品类别 */
  CATEGORY = 'CATEGORY',
}

export const invoiceContentLabel = {
  [EInvoiceContent.DETAIL]: '商品明细',
  [EInvoiceContent.CATEGORY]: '商品类别',
};

/**
 * 抬头类型枚举
 */
export enum ETitleType {
  /** 个人/非企业 */
  PERSONAL = 'PERSONAL',
  /** 企业 */
  ENTERPRISE = 'ENTERPRISE',
}

export const titleTypeLabel = {
  [ETitleType.PERSONAL]: '个人/非企业',
  [ETitleType.ENTERPRISE]: '企业',
};

/**
 * 发票流程状态枚举
 */
export enum EInvoiceStatus {
  /** 发票申请 */
  APPLY = 'APPLY',
  /** 发票审批 */
  APPROVE = 'APPROVE',
  /** 完票上传 */
  UPLOAD = 'UPLOAD',
}

export const invoiceStatusLabel = {
  [EInvoiceStatus.APPLY]: '发票申请',
  [EInvoiceStatus.APPROVE]: '发票审批',
  [EInvoiceStatus.UPLOAD]: '完票上传',
};

/**
 * 发票详情基本信息
 */
export interface IInvoiceBasicInfo {
  /** 申请时间 */
  applyTime: string;
  /** 审批时间 */
  approveTime: string;
}

/**
 * 发票详情信息
 */
export interface IInvoiceDetail {
  /** 发票类型 */
  invoiceType: EInvoiceType;
  /**
   * 发票内容
   * @description {@link EInvoiceContent}
   */
  invoiceContent: EInvoiceContent;
  /**
   * 抬头类型
   * @description {@link ETitleType}
   */
  titleType: ETitleType;
  /** 抬头名称 */
  titleName: string;
  /** 开票金额 */
  invoiceAmount: number;
  /** 开票时间 */
  invoiceTime: string;
}

/**
 * 发票申请详情响应
 */
export interface IInvoiceApplyDetail {
  /**
   * 基本信息
   * @description {@link IInvoiceBasicInfo}
   */
  basicInfo: IInvoiceBasicInfo;
  /**
   * 详情信息
   * @description {@link IInvoiceDetail}
   */
  detail: IInvoiceDetail;
  /**
   * 当前状态
   * @description {@link EInvoiceStatus}
   */
  currentStatus: EInvoiceStatus;
}
