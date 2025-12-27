import { IPageParam } from '../common';
import { ESettlementType, ESettlementStatus, ESettlementOrderStatus } from '../pickup/settlement';
import { ISettlementPaymentRecord } from '../pickup/payment';

/**
 * 收款待办结算单查询参数
 */
export interface IReceiptTodoQueryParam extends IPageParam {
  /** 单据编号 */
  relatedOrderNo?: string;
}

/**
 * 收款待办结算单信息
 */
export interface IReceiptTodoOrder {
  /** 主键ID */
  id: number;
  /** 结算单号 */
  settlementNo: string;
  /**
   * 结算类型｜RECEIVE：收件 RETURN_RECEIVE：收件退货 PURCHASE：采购 DIRECT_RETURN：直营退货 OTHER：其他
   * @description {@link ESettlementType}
   */
  settlementType: ESettlementType;
  /** 关联业务单号 */
  relatedOrderNo: string;
  /** 关联业务单ID（收件单ID、退货单ID等） */
  relatedOrderId: number;
  /** 供应商ID */
  supplierId: number;
  /** 供应商 */
  supplierName: string;
  /** 供应商手机号 */
  supplierPhone: string;
  /** 结算商品数量 */
  productCount: number;
  /** 商品类目数量 */
  categoryCount: number;
  /** 期望总金额 */
  originalPrice: number;
  /** 应结金额 */
  amountPayable: number;
  /** 已结金额 */
  amountPaid: number;
  /** 剩余金额 */
  remainingAmount: number;
  /**
   * 结款状态｜UNPAID：未结款 PARTIAL：部分结款 FULL：全部结款
   * @description {@link ESettlementStatus}
   */
  settlementStatus: ESettlementStatus;
  /**
   * 结算单状态｜DRAFT：草稿 AUDITING：审核中 APPROVED：已通过 REJECTED：已驳回 VOID：已作废
   * @description {@link ESettlementOrderStatus}
   */
  status: ESettlementOrderStatus;
  /** 审核人ID */
  auditOperatorId: number;
  /** 审核人姓名 */
  auditOperatorName: string;
  /** 审核意见 */
  auditComment: string;
  /** 审核时间 */
  auditTime: string;
  /** 备注 */
  remark: string;
  /** 收款信息json */
  memberSnapshot: string;
  /** 收款人名 */
  payeeName: string;
  /** 收款人身份 */
  payeeIdentity: string;
  /** 收款人手机号 */
  payeePhone: string;
  /** 收款人银行账号 */
  payeeBankAccount: string;
  /** 收款人银行开户行编码 */
  payeeBankCode: string;
  /** 收款人银行开户支行编码 */
  payeeBankBranchCode: string;
  /** 收款人银行开户行名称 */
  payeeBankName: string;
  /** 收款人银行开户支行名称 */
  payeeBankBranchName: string;
  /** 创建时间 */
  createTime: string;
  /** 最后更新时间 */
  updateTime: string;
  /** 创建人 */
  creator: string;
  /** 更新人 */
  updater: string;
  /** 结算凭证文件URL列表 */
  voucherFileUrls: string[];
  /**
   * 付款记录列表（按时间倒序）
   * @description {@link ISettlementPaymentRecord}
   */
  paymentRecords: ISettlementPaymentRecord[];
  /** 退货商品数量（仅RETURN_RECEIVE类型显示） */
  returnProductCount: number;
  /** 退货总金额（仅RETURN_RECEIVE类型显示） */
  returnAmount: number;

  hidden?: boolean;
}
