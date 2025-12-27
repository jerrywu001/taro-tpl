import { TagType } from '@nutui/nutui-taro';
import { IPageParam } from '../common';
import { ESettlementType } from './settlement';

import { IPaymentOrder } from '../settlement';

/**
 * 付款方式枚举
 */
export enum EPayType {
  /** 线上 */
  ONLINE = 'ONLINE',
  /** 线下 */
  OFFLINE = 'OFFLINE',
}

/**
 * 付款方式标签映射
 */
export const payTypeLabel = {
  [EPayType.ONLINE]: '线上',
  [EPayType.OFFLINE]: '线下',
};

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
  /** 部分成功 */
  PARTIAL_SUCCESS = 'PARTIAL_SUCCESS',
  /** 失败 */
  FAILED = 'FAILED',
}

/**
 * 付款状态标签映射
 */
export const paymentOrderStatusLabel = {
  [EPaymentOrderStatus.PAYING]: '支付中',
  [EPaymentOrderStatus.SUCCESS]: '付款成功',
  [EPaymentOrderStatus.PARTIAL_SUCCESS]: '部分失败',
  [EPaymentOrderStatus.FAILED]: '付款失败',
};

export const paymentOrderStatusType: Record<string, TagType> = {
  [EPaymentOrderStatus.PAYING]: 'primary',
  [EPaymentOrderStatus.SUCCESS]: 'success',
  [EPaymentOrderStatus.PARTIAL_SUCCESS]: 'danger',
  [EPaymentOrderStatus.FAILED]: 'danger',
};

export const paymentOrderStatusColor = {
  [EPaymentOrderStatus.PAYING]: '#FF7D00',
  [EPaymentOrderStatus.SUCCESS]: '#00B42A',
  [EPaymentOrderStatus.PARTIAL_SUCCESS]: '#F53F3F',
  [EPaymentOrderStatus.FAILED]: '#F53F3F',
};

export const paymentOrderStatusBgColor = {
  [EPaymentOrderStatus.PAYING]: '#FFF7E8',
  [EPaymentOrderStatus.SUCCESS]: '#E8FFEA',
  [EPaymentOrderStatus.PARTIAL_SUCCESS]: '#FFECE8',
  [EPaymentOrderStatus.FAILED]: '#FFECE8',
};

/**
 * 付款记录状态枚举
 */
export enum EPaymentRecordStatus {
  /** 成功 */
  SUCCESS = 'SUCCESS',
  /** 失败 */
  FAILED = 'FAILED',
}

/**
 * 付款记录状态标签映射
 */
export const paymentRecordStatusLabel = {
  [EPaymentRecordStatus.SUCCESS]: '成功',
  [EPaymentRecordStatus.FAILED]: '失败',
};

/**
 * 支付渠道枚举
 */
export enum EPayChannel {
  /** 微信 */
  WECHAT = 'WECHAT',
  /** 支付宝 */
  ALIPAY = 'ALIPAY',
  /** 银行 */
  BANK = 'BANK',
}

/**
 * 支付渠道标签映射
 */
export const payChannelLabel = {
  [EPayChannel.WECHAT]: '微信',
  [EPayChannel.ALIPAY]: '支付宝',
  [EPayChannel.BANK]: '银行',
};

/**
 * 付款记录信息
 */
export interface ISettlementPaymentRecord {
  /** 主键ID */
  id: number;
  /** 结算单ID */
  settlementId: number;
  /** 结算单号 */
  settlementNo: string;
  /** 付款单ID */
  paymentOrderId: number;
  /** 支付金额 */
  payAmount: number;
  /** 支付方式 ONLINE:线上 OFFLINE:线下 */
  payType: EPayType;
  /** 支付渠道 WECHAT:微信 ALIPAY:支付宝 BANK:银行 */
  payChannel: EPayChannel;
  /** 企业支付账号 */
  enterpriseAccount: string;
  /** 付款人手机号 */
  payerPhone: string;
  /** 支付凭证号 */
  voucherCode: string;
  /** 交易流水号 */
  transactionNo: string;
  /** 记录状态 SUCCESS:成功 FAILED:失败 */
  status: EPaymentRecordStatus;
  /** 凭证文件地址 */
  voucherFileUrl: string;
  /** 支付时间 */
  payTime: string;
  /** 备注 */
  remark: string;
  /** 创建时间 */
  createTime: string;
  /** 创建人 */
  creator: string;
}

/**
 * 付款单详情
 */
export interface IPaymentOrderDetail extends IPaymentOrder {
  /** 付款记录列表（按时间倒序） */
  paymentRecords: ISettlementPaymentRecord[];
}

/**
 * 付款单列表查询参数
 */
export interface IPaymentOrderListParam extends IPageParam {
  /** 付款单号（模糊搜索） */
  paymentNo?: string;
  /** 结算单类型 */
  settlementType?: ESettlementType;
  /** 结算单号（模糊搜索） */
  settlementNo?: string;
  /** 供应商Id */
  supplierId?: string;
  /** 状态 */
  status?: EPaymentOrderStatus;
}

