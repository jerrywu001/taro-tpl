import { IPageParam } from '../common';
import { ESettlementType } from './settlement';

export interface IPickUpApprovalListParams extends IPageParam { receiveNo: string }

export interface IPickUpRefundApprovalsParam extends IPageParam { refundNo: string }

export interface IPickUpApproval {
  /** 主键id */
  id: number;
  /** 业务id */
  busId: number;
  /** 收件单号 */
  receiveNo: string;
  /** 	应结金额 */
  settlementAmount: string;
  /** 供应商 */
  supplyCompanyName: string;
  /** 创建时间 */
  createTime: string;
  /** 创建人 */
  creator: string;
  /** 会员名称 */
  memberName: string;
  /** 手机号 */
  phone: string;
  /** 所属店铺 */
  shopName: string;
  /** 是否隐藏 */
  hidden?: boolean;
}

export interface IPickUpApprovalParams {
  /** 主键id */
  id: number;
  /**
   * 结算类型
   * @description {@link ESettlementType}
   */
  type: ESettlementType;
  /** 1:通过 2:驳回 */
  result: 1 | 2;
  /** 审批结果描述 */
  resultDesc?: string;
}

export interface IPickUpRefundApproval {
  /** 主键id */
  id: number;
  /** 业务id */
  busId: number;
  /** 收件单号 */
  receiveNo: string;
  /** 退货单号 */
  refundNo: string;
  /** 退货金额 */
  refundAmount: string;
  /** 创建时间 */
  createTime: string;

  /** 所属店铺 TODOW */
  shopName?: string;
  /** 供应商 TODOW */
  supplyCompanyName?: string;
  /** 创建人 */
  creator: string;
  /** 会员名称 */
  memberName: string;
  /** 手机号 */
  phone: string;
  /** 是否隐藏 */
  hidden?: boolean;
}
