import { IPageParam } from '../common';
import { ESettlementType } from '../pickup/settlement';

/**
 * 结算单审批列表查询参数
 */
export interface ISettlementApprovalListParams extends IPageParam {
  /** 单据编号 */
  relatedOrderNo?: string;
}

/**
 * 结算单审批列表响应
 */
export interface ISettlementApprovalRes {
  /** 总数 */
  total: number;
  /**
   * 数据列表
   * @description {@link IApprovalSettlementOrder}
   */
  data: IApprovalSettlementOrder[];
}

/**
 * 结算单信息
 */
export interface IApprovalSettlementOrder {
  /** 主键ID */
  id: number;
  /** 结算单号 */
  settlementNo: string;
  /**
   * 结算类型
   * @description {@link ESettlementType}
   */
  settlementType: ESettlementType;
  /** 单据编号 */
  relatedOrderNo: string;
  /** 关联业务单ID（收件单ID、退货单ID等） */
  relatedOrderId: number;
  /** 供应商名称 */
  supplierName: string;
  /** 应结金额 */
  amountPayable: number;
  /** 创建时间 */
  createTime: string;
  /** 店铺名称 TODOW */
  shopName?: string;
  /** 供应商名称 TODOW */
  supplyCompanyName?: string;
  /** 手机号 TODOW */
  phone?: string;
  /** 创建人 */
  creator: string;
  /** 是否隐藏 */
  hidden?: boolean;
}

/**
 * 结算单审批参数
 */
export interface ISettlementApprovalParams {
  /** 结算单ID */
  settlementId: number;
  /** 是否通过 */
  approve: boolean;
  /** 审批意见（驳回时必填） */
  comment?: string;
  /** 操作人姓名 */
  operatorName?: string;
  /** 操作人ID */
  operatorId?: number;
}
