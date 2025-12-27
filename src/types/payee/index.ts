import { TagType } from '@nutui/nutui-taro';
import { IPageParam } from '../common';
import { ESettlementType } from '../pickup/settlement';
import { ERcptMethod } from '../settlement/payee';
import { EPayType } from '../pickup/payment';

/**
 * 支付方式枚举
 */
export enum EPaymentMethod {
  /** 微信支付 */
  WECHAT = 'WECHAT',
  /** 支付宝支付 */
  ALIPAY = 'ALIPAY',
  /** 银行卡支付 */
  BANK_CARD = 'BANK_CARD',
  /** 现金支付 */
  CASH = 'CASH',
  /** 其他 */
  OTHER = 'OTHER',
}

/**
 * 支付方式标签映射
 */
export const paymentMethodLabel = {
  [EPaymentMethod.WECHAT]: '微信支付',
  [EPaymentMethod.ALIPAY]: '支付宝支付',
  [EPaymentMethod.BANK_CARD]: '银行卡支付',
  [EPaymentMethod.CASH]: '现金支付',
  [EPaymentMethod.OTHER]: '其他',
};

/**
 * 收款记录信息（支持分笔收款）
 */
export interface IReceiptPaymentRecord {
  /** 记录ID */
  id: number;
  /** 收款单ID */
  receiptId: number;
  /** 收款单号 */
  receiptNo: string;
  /** 支付序号（第几笔） */
  paymentSeq: number;
  /** 本笔收款金额 */
  paymentAmount: number;
  /**
   * 支付方式
   * @description {@link EPaymentMethod}
   */
  paymentMethod: EPaymentMethod;
  /**
   * 收款方式
   * @description {@link ERcptMethod}
   */
  rcptMethod: ERcptMethod;
  /**
   * 支付状态
   * @description {@link EPayeeOrderStatus}
   */
  paymentStatus: EPayeeOrderStatus;
  /** 实际支付完成时间 */
  paymentTime: string;
  /** 支付流水号 */
  transactionNo: string;
  /** 第三方订单号 */
  tpOrderNo: string;
  /** 支付凭证文件URL列表 */
  voucherFileUrls: string[];
  /** 备注 */
  remark: string;
  /** 创建人 */
  creator: string;
  /** 创建时间 */
  createTime: string;
}

/**
 * 收款状态枚举
 */
export enum EPayeeOrderStatus {
  /** 全部 */
  ALL = '',
  /** 待收款 */
  PENDING = 'PENDING',
  /** 收款中 */
  PROCESSING = 'PROCESSING',
  /** 成功 */
  SUCCESS = 'SUCCESS',
  /** 失败 */
  FAILED = 'FAILED',
}

/**
 * 收款状态标签映射
 */
export const payeeOrderStatusLabel = {
  [EPayeeOrderStatus.PENDING]: '待收款',
  [EPayeeOrderStatus.PROCESSING]: '收款中',
  [EPayeeOrderStatus.SUCCESS]: '收款成功',
  [EPayeeOrderStatus.FAILED]: '收款失败',
};

export const payeeOrderStatusType: Record<string, TagType> = {
  [EPayeeOrderStatus.PENDING]: 'warning',
  [EPayeeOrderStatus.PROCESSING]: 'primary',
  [EPayeeOrderStatus.SUCCESS]: 'success',
  [EPayeeOrderStatus.FAILED]: 'danger',
};

/**
 * 收款渠道枚举
 */
export enum EPayeeChannel {
  /** 面对面收款 */
  FACE_TO_FACE = 'FACE_TO_FACE',
  /** 远程二维码 */
  REMOTE_QR = 'REMOTE_QR',
  /** POS机 */
  POS_MACHINE = 'POS_MACHINE',
  /** 第三方 */
  THIRD_PARTY = 'THIRD_PARTY',
  /** 其他 */
  OTHER = 'OTHER',
}

/**
 * 收款渠道标签映射
 */
export const payeeChannelLabel = {
  [EPayeeChannel.FACE_TO_FACE]: '面对面收款',
  [EPayeeChannel.REMOTE_QR]: '远程二维码',
  [EPayeeChannel.POS_MACHINE]: 'POS机',
  [EPayeeChannel.THIRD_PARTY]: '第三方',
  [EPayeeChannel.OTHER]: '其他',
};

/**
 * 收款单列表查询参数
 */
export interface IPayeeOrderListParam extends IPageParam {
  /** 收款单号（模糊搜索） */
  receiptNo?: string;
  /**
   * 结算单类型
   * @description {@link ESettlementType}
   */
  settlementType?: ESettlementType;
  /** 结算单号（模糊搜索） */
  settlementNo?: string;
  /** 供应商Id */
  supplierId?: string;
  /**
   * 状态
   * @description {@link EPayeeOrderStatus}
   */
  status?: EPayeeOrderStatus;
}

/**
 * 收款单信息
 */
export interface IPayeeOrder {
  /** 收款单ID */
  id: number;
  /** 收款单号 */
  receiptNo: string;
  /** 结算单ID */
  settlementId: number;
  /** 结算单号 */
  settlementNo: string;
  /**
   * 结算单类型
   * @description {@link ESettlementType}
   */
  settlementType: ESettlementType;
  /** 关联业务单号（退货单号等） */
  relatedOrderNo: string;
  /** 供应商id */
  supplierId: string;
  /** 供应商名称 */
  supplierName: string;
  /** 应收金额 */
  receivableAmount: number;
  /** 实收金额 */
  actualAmount: number;
  /**
   * 收款渠道
   * @description {@link EPayeeChannel}
   */
  channel: EPayeeChannel;
  /**
   * 收款状态
   * @description {@link EPayeeOrderStatus}
   */
  status: EPayeeOrderStatus;
  /** 收款时间 */
  receiptTime: string;
  /** 收款凭证 */
  voucherFileUrls: string[];
  /** 资金流水号 */
  transactionNo: string;
  /** 备注 */
  remark: string;
  /** 付款方姓名（退货会员） */
  payerName: string;
  /** 付款方手机号 */
  payerPhone: string;
  /** 支付方式 */
  payType?: EPayType;
  /** 支付订单号 */
  tpOrderNo: string;
  /** 收款二维码地址 */
  qrCodeUrl: string;
  /** 收款人（实际收款操作人） */
  receiver: string;
  /** 退货商品数量（关联结算单商品总数） */
  itemCount: number;
  /** 创建人 */
  creator: string;
  /** 创建时间 */
  createTime: string;
  /** 更新人 */
  updater: string;
  /** 更新时间 */
  updateTime: string;
  /**
   * 收款记录列表(支持分笔收款)
   * @description {@link IReceiptPaymentRecord}
   */
  paymentRecords: IReceiptPaymentRecord[];
}
