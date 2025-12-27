import { IFileInfo } from './save';

/**
 * 收件退货详情请求参数
 */
export interface IRefundDetailParam {
  /** 收件退货单ID */
  id: number;
}

/**
 * 退款商品信息
 */
export interface IRefundProduct {
  /** 商品图片列表 */
  fileList: IFileInfo[];
  /** 商品名称 */
  productName: string;
  /** 成色 */
  productCondition?: string;
  /** 子收件单号 */
  subOrderNo: string;
  /** 结算金额 */
  settlementAmount: number;
  /** 退货金额 */
  refundAmount: number;
}

/**
 * 收件退货详情
 */
export interface IRefundDetail {
  /** 收件退货单号 */
  refundNo: string;
  /** 收款状态 0:未收款 1:已收款 */
  paymentStatus: number;
  /** 签收状态 0:未签收 1:已签收 */
  signStatus: number;
  /** 收件单号 */
  receiveNo: string;
  /** 会员名称 */
  memberName: string;
  /** 退货原因 */
  refundReason: string;
  /** 退货方式 */
  refundMethod: string;
  /** 收件人 */
  recipientName: string;
  /** 手机号码 */
  phone: string;
  /** 详细地址 */
  address: string;
  /** 商品类目数 */
  categoryCount: number;
  /** 商品数量 */
  productCount: number;
  /** 商品结算总金额 */
  totalSettlementAmount: number;
  /** 商品退货总金额 */
  totalRefundAmount: number;
  /** 商品列表 */
  productList: IRefundProduct[];
  /** 创建人 */
  creator: string;
  /** 创建时间 */
  createTime: string;
  /** 审核人 */
  auditor: string;
  /** 审核时间 */
  auditTime: string;
  /** 审核结果 1:通过 2:驳回 */
  auditStatus: number;
}

/**
 * 收款状态枚举
 */
export enum ERefundPaymentStatus {
  /** 未收款 */
  UNPAID = 0,
  /** 已收款 */
  PAID = 1,
}

/**
 * 收款状态标签映射
 */
export const refundPaymentStatusLabel = {
  [ERefundPaymentStatus.UNPAID]: '未收款',
  [ERefundPaymentStatus.PAID]: '已收款',
};

/**
 * 签收状态枚举
 */
export enum ERefundSignStatus {
  /** 未签收 */
  UNSIGNED = 0,
  /** 已签收 */
  SIGNED = 1,
}

/**
 * 签收状态标签映射
 */
export const refundSignStatusLabel = {
  [ERefundSignStatus.UNSIGNED]: '未签收',
  [ERefundSignStatus.SIGNED]: '已签收',
};

