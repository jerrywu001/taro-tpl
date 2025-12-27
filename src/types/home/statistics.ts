/**
 * 小程序首页统计数据
 */
export interface IMiniHomeStatistics {
  /** 待付款收件订单 */
  waitPayReceiveOrderNum: number;
  /** 待入库上架数量 */
  waitStoreNum: number;
  /** 待收件审批数 */
  waitApproveNum: number;
  /** 待结算审批数 */
  waitSettleApproveNum: number;
  /** 待付款订单数 */
  paymentTodoCount: number;
  /** 待收款订单数 */
  receiptTodoCount: number;
  /** 未结款订单数 */
  settlementUnpaidCount: number;
  /** 已完成订单数 */
  settlementCompletedCount: number;
  /** 已结款订单数 */
  settlementPaidCount: number;

  /** 待退货审批数 */
  waitReturnApproveNum: number;

  /** 合同待办订单数 */
  contractTodoCount: number;

  /** 付款失败订单数 */
  paymentFailedCount: number;

  /** 待收款订单数 */
  returnReceiveWaitPayCount: number;
}

export interface IMessageTabs {
  main: 'approval' | 'todo';
  sub: 'pickup' | 'refund' | 'settlement' | 'payment' | 'receipt' | 'contract';
}
