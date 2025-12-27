import { EPaymentOrderStatus, EPayType } from '../pickup/payment';
import { ESettlementType, ESettlementOrderStatus, ESettlementStatus } from '../pickup/settlement';
import { IPageParam } from '../common';
import { IMemberAndBank, IMemberBankCard } from '../member';

/** 业务类型 */
export enum EBusinessType {
  /** 销售 */
  SALE = 'SALE',
  /** 退货 */
  RETURN = 'RETURN',
  /** 采购 */
  PURCHASE = 'PURCHASE',
}

export const businessTypeLabel = {
  [EBusinessType.SALE]: '销售',
  [EBusinessType.RETURN]: '退货',
  [EBusinessType.PURCHASE]: '采购',
};

/**
 * 结算单分页查询参数
 */
export interface ISettlementOrderPageQueryParam extends IPageParam {
  /** 结算单号 */
  settlementNo?: string;
  /**
   * 结算单状态
   * @description {@link ESettlementOrderStatus}
   */
  status?: ESettlementOrderStatus | '';
  /**
   * 结算状态
   * @description {@link ESettlementStatus}
   */
  settlementStatus?: ESettlementStatus | '';
}

/**
 * 结算单付款参数
 */
export interface ISettlementPayParam {
  /** 结算单ID */
  settlementOrderId: number;
  /** 付款金额 */
  actualAmount: number;
  /** 验证码 */
  verifyCode?: string;

  /** 凭证图片地址 */
  voucherFileUrls?: string[];
  /**
   * 支付方式
   * @description {@link EPayType}
   */
  payType?: EPayType;
}

/**
 * 付款待办结算单查询参数
 */
export interface IPaymentTodoQueryParam {
  /** 收件单号 */
  receiptNo: string;
  /** 页码 */
  page: number;
  /** 每页条数 */
  size: number;
  /** 排序 */
  relatedOrderNo: string;
}

/**
 * 支付状态查询参数
 */
export interface IPaymentStatusQueryParam {
  /** 付款单ID */
  orderId: number;
}

/**
 * 支付状态查询响应
 */
export interface IPaymentStatusResponse {
  /**
   * 状态
   * @description {@link EPaymentOrderStatus}
   */
  status: EPaymentOrderStatus;
  /** 失败原因 */
  failReason: string;
}

/**
 * 付款单信息
 */
export interface IPaymentOrder {
  /** 主键ID */
  id: number;
  /** 关联结算单ID */
  settlementId: number;
  /** 结算单号 */
  settlementNo: string;
  /** 付款单号 */
  paymentNo: string;
  /** 关联业务单号 */
  relatedOrderNo: string;
  /**
   * 结算单类型
   * @description {@link ESettlementType}
   */
  settlementType: ESettlementType;
  /** 应付金额 */
  payAmount: number;
  /** 实付金额 */
  actualAmount: number;
  /** 供应商ID */
  supplierId: number;
  /** 供应商名称 */
  supplierName: string;
  /**
   * 支付方式
   * @description {@link EPayType}
   */
  payType: EPayType;
  /** 企业支付账号 */
  enterpriseAccount: string;
  /** 上传凭证文件地址 */
  voucherFileUrls: string[];
  /** 付款时间 */
  payTime: string;
  /** 备注 */
  remark: string;
  /**
   * 状态
   * @description {@link EPaymentOrderStatus}
   */
  status: EPaymentOrderStatus;
  /** 失败原因 */
  failReason: string;
  /**
   * 收款人信息
   * @description {@link IMemberAndBank}
    */
  memberSnapshot: IMemberAndBank;
  /**
   * 会员收款账户
   * @description {@link IMemberBankCard}
   */
  bankCards: IMemberBankCard[];
  /** 创建时间 */
  createTime: string;
  /** 创建人 */
  creator: string;
}
