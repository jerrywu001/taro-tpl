import { TagType } from '@nutui/nutui-taro';
import { EBusinessType } from '../settlement';
import { ISettlementPayee } from './detail';
import { ISettlementPaymentRecord } from './payment';
import { IReceiptOrder } from '../settlement/payee';
import { IMemberAndBank, IMemberBankCard } from '../member';

/**
 * 结算单明细信息
 */
export interface ISettlementOrderGoods {
  /** 主键ID */
  id: number;
  /** 关联主结算单ID */
  settlementId: number;
  /** 主结算单号 */
  settlementNo: string;
  /** 子结算单号（用于分批或分明细结算） */
  subSettlementNo: string;
  /** 业务类型 SALE:销售 RETURN:退货 PURCHASE:采购 */
  businessType: EBusinessType;
  /** 关联业务明细ID (对应 子收件单id) */
  businessDetailId: number;
  /** 关联业务子单号 （对应 子收件单编号） */
  subOrderNo: string;
  /** 商品编码 (对应 唯一码) */
  productCode: string;
  /** 商品标题 */
  productName: string;
  /** 商品类别 */
  categoryName: string;
  /** 品牌名称 */
  brandName: string;
  /** 成色（如95新） */
  productCondition: string;
  /**
   * 应结金额（只有 收件结算 需要）
   */
  amountPayable?: number;
  /**
   * 期望金额 -> 收件结算
   *
   * 结算金额 -> 收件退货结算
   */
  originalPrice: number;
  /**
   * 实结金额 -> 收件结算
   *
   * 退货金额 -> 收件退货结算
   */
  amountSettled: number;
  /** 备注（差异说明等） */
  remark: string;
  /** 收件图片 */
  fileUrls?: string[];
}

/**
 * 结算单信息
 */
export interface ISettlementOrder extends ISettlementPayee {
  /** 主键ID */
  id: number;
  /** 结算单号 */
  settlementNo: string;
  /** 结算类型 RECEIVE:收件 RETURN_RECEIVE:收件退货 PURCHASE:采购 DIRECT_RETURN:直营退货 OTHER:其他 */
  settlementType: ESettlementType;
  /**
   * 关联收件单号
   *
   * 收件单号 -> 收件结算
   *
   * 收件退货单号 -> 收件退货结算
   */
  relatedOrderNo: string;
  /**
   * 关联收件单ID
   *
   * 收件id -> 收件结算
   *
   * 收件退货id -> 收件退货结算
   */
  relatedOrderId?: number;
  /** 供应商ID */
  supplierId: number;
  /** 供应商名称 */
  supplierName: string;
  /** 结算商品数量 */
  productCount: number;
  /** 商品类目数量 */
  categoryCount: number;
  /**
   * 期望总金额 -> 收件结算
   *
   * 结算总金额 -> 收件退货结算
   */
  originalPrice: number;
  /**
   * 应结金额 -> 收件结算
   *
   * 应退金额 -> 收件退货结算
   */
  amountPayable: number;
  /**
   * 已结金额 -> 收件结算
   *
   * 实退金额 -> 收件退货结算
   */
  amountPaid: number;
  /** 剩余金额 */
  remainingAmount: number;
  /** 结款状态 UNPAID:未结款 PARTIAL:部分结款 FULL:全部结款 */
  settlementStatus: ESettlementStatus;
  /** 结算单状态 DRAFT:草稿 AUDITING:审核中 APPROVED:已通过 REJECTED:已驳回 VOID:已作废 */
  status: ESettlementOrderStatus;
  /** 备注 */
  remark: string;
  /** 创建时间 */
  createTime: string;
  /** 最后更新时间 */
  updateTime: string;
  /** 创建人 */
  creator: string;
  /** 更新人 */
  updater: string;
  /** 审核操作人ID */
  auditOperatorId: number;
  /** 审核操作人名称 */
  auditOperatorName: string;
  /** 审核备注 */
  auditComment: string;
  /** 审核时间 */
  auditTime: string;
  /** 结算单明细 */
  items?: ISettlementOrderGoods[];
  /** 收款单列表 */
  receiptOrders?: IReceiptOrder[];
  /** 供应商手机号 */
  supplierPhone: string;
  /** 结算凭证文件URL列表 */
  voucherFileUrls?: string[];
  /** 付款记录列表（按时间倒序） */
  paymentRecords?: ISettlementPaymentRecord[];
  /** 退货商品数量（仅RETURN_RECEIVE类型显示） */
  returnProductCount?: number;
  /** 退货总金额（仅RETURN_RECEIVE类型显示） */
  returnAmount?: number;
  /** 头像 */
  avatar?: string;
  /** 付款方式: 线下/线上 OFFLINE/ONLINE */
  payTypes?: string[];
  /** 会员快照 */
  memberSnapshot?: IMemberAndBank;
  /** 收款账户列表 */
  bankCards?: IMemberBankCard[];
}

/**
 * 结算类型枚举
 */
export enum ESettlementType {
  /** 收件 */
  RECEIVE = 'RECEIVE',
  /** 收件退货 */
  RETURN_RECEIVE = 'RETURN_RECEIVE',
  /** 采购 */
  PURCHASE = 'PURCHASE',
  /** 直营退货 */
  DIRECT_RETURN = 'DIRECT_RETURN',
  /** 其他 */
  OTHER = 'OTHER',
}

/**
 * 结算类型标签映射
 */
export const settlementTypeLabel = {
  [ESettlementType.RECEIVE]: '收件',
  [ESettlementType.RETURN_RECEIVE]: '收件退货',
  [ESettlementType.PURCHASE]: '采购',
  [ESettlementType.DIRECT_RETURN]: '直营退货',
  [ESettlementType.OTHER]: '其他',
};

/**
 * 结款状态枚举
 */
export enum ESettlementStatus {
  /** 未结款 */
  UNPAID = 'UNPAID',
  /** 部分结款 */
  PARTIAL = 'PARTIAL',
  /** 全部结款 */
  FULL = 'FULL',
}

/**
 * 结款状态标签映射
 */
export const settlementStatusLabel = {
  [ESettlementStatus.UNPAID]: '未结款',
  [ESettlementStatus.PARTIAL]: '部分结款',
  [ESettlementStatus.FULL]: '全部结款',
};

/**
 * 结款状态子枚举
 */
export enum ESettlementChildStatus {
  /** 付款中 */
  UNPAID = 'UNPAID',
  /** 付款成功 */
  FULL = 'FULL',
  /** 部分结款 */
  PARTIAL = 'PARTIAL',
}

/**
 * 结款状态子标签映射
 */
export const settlementChildStatusLabel = {
  [ESettlementChildStatus.UNPAID]: '未结款',
  [ESettlementChildStatus.FULL]: '付款成功',
  [ESettlementChildStatus.PARTIAL]: '部分结款',
};

export const settlementChildStatuscolor = {
  [ESettlementChildStatus.UNPAID]: '#165DFF',
  [ESettlementChildStatus.FULL]: '#00B42A',
  [ESettlementChildStatus.PARTIAL]: '#FF4948',
};

export const settlementChildBgStatuscolor = {
  [ESettlementChildStatus.UNPAID]: '#E8F3FF',
  [ESettlementChildStatus.FULL]: '#E8FFEA',
  [ESettlementChildStatus.PARTIAL]: '#FFECE8',
};

/**
 * 结算单状态枚举
 */
export enum ESettlementOrderStatus {
  /** 草稿 */
  DRAFT = 'DRAFT',
  /** 审核中 */
  AUDITING = 'AUDITING',
  /** 已通过 */
  APPROVED = 'APPROVED',
  /** 已驳回 */
  REJECTED = 'REJECTED',
  /** 已作废 */
  VOID = 'VOID',

  /** 已完成 (收件退货结算页面才会用到) */
  COMPLETED = 'COMPLETED',
}

/**
 * 结算单状态标签映射
 */
export const settlementOrderStatusLabel = {
  [ESettlementOrderStatus.DRAFT]: '草稿',
  [ESettlementOrderStatus.AUDITING]: '审核中',
  [ESettlementOrderStatus.APPROVED]: '已通过',
  [ESettlementOrderStatus.REJECTED]: '已驳回',
  [ESettlementOrderStatus.VOID]: '已作废',
};

export const settlementOrderStatusType: Record<string, TagType> = {
  [ESettlementOrderStatus.DRAFT]: 'default',
  [ESettlementOrderStatus.AUDITING]: 'warning',
  [ESettlementOrderStatus.APPROVED]: 'success',
  [ESettlementOrderStatus.REJECTED]: 'danger',
  [ESettlementOrderStatus.VOID]: 'default',
};

export interface ISettlementOrderSaveParam {
  /** 主键ID */
  id?: number;
  /** 结算单类型 */
  settlementType: ESettlementType;
  /** 关联订单ID（收件单号） */
  relatedOrderId: number;
  /** 关联业务单号（收件单号） */
  relatedOrderNo: string;
  /** 供应商ID */
  supplierId: number;
  /** 供应商 */
  supplierName: string;
  /** 结算商品数量 */
  productCount: number;
  /**
   * 应结金额 -> 收件结算
   *
   * 应退金额 -> 收件退货结算
   */
  amountPayable: number;
  /** 备注 */
  remark?: string;
  /** 结算单明细 */
  items: ISettlementOrderGoods[];
  /** 会员快照 */
  memberSnapshot?: IMemberAndBank;
  /** 收款账户列表 */
  bankCardPayments?: Array<IMemberBankCardPayment>;
}

export interface IMemberBankCardPayment {
  /** 收款账户ID */
  bankCardId: number;
  /** 分配金额（结算/付款单使用） */
  amount: number;
}

export interface ISettlementOrderCancelParam {
  /** 结算单Id */
  settlementId: number;
  /** 作废备注 */
  comment?: string;
}
