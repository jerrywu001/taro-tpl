import { EInvoiceStatus, EPaymentStatus } from '.';
import { IMemberAndBank } from '../member';
import { IFileInfo } from './save';
import { ESettlementOrderStatus, ESettlementStatus, ESettlementType, ISettlementOrderGoods } from './settlement';
import { ERefundStatus, ERefundType, EReceivePayment } from './refound';
import { IDynamicComponent } from '@/components/dynamic';

/**
 * 退货单页面展示信息
 */
export interface IOptRefundPageDTO {
  /** 退货主键id */
  id: number;
  /** 收件单号 */
  receiveNo: string;
  /** 退货单号 */
  refundNo: string;
  /** 会员头像 */
  avatar: string;
  /** 会员名称 */
  memberName: string;
  /** 会员手机号 */
  phone: string;
  /** 退货方式 SELF_PICKUP:自提, LOGISTICS:物流 */
  refundType: ERefundType;
  /** 退货总金额 */
  refundTotalAmount: number;
  /** 实际已退总金额(当前退货单) */
  actualRefundTotalAmount: number;
  /** 创建时间 */
  createTime: string;
  /** 创建人 */
  creator: string;
  /** 退货单状态 0:草稿 1:待审核 2:审核通过 3:审核驳回 4:已作废 5:已完成 */
  status: ERefundStatus;
  /** 收款状态 0:未收款 1:部分收款 2:全部收款 */
  receivePayment: EReceivePayment;
}

/**
 * 收件商品信息
 */
export interface IReceiveProduct {
  /** 收件单id */
  receiveId: number;
  /** 子收件单id */
  receiveSubId: number;
  /** 子收件单号 */
  receiveSubNo: string;
  /** 鉴定单号 */
  appraisalNo?: string;
  /** 唯一码 */
  uniqueCode: string;
  /** 收件图片 */
  fileList: IFileInfo[];
  /** 商品标题 */
  productName: string;
  /** 商品类目 */
  categoryName: string;
  /** 商品类目id */
  categoryCheckId?: number;
  /** 商品数量 */
  num: number;
  /** 期望金额 */
  expectedPrice: number;
  /** 结算总金额 */
  settlementTotalPrice: number;
  /** 商品完善状态 0:未完善 1:已完善 */
  improveProductStatus: number;
  /** 品牌名 */
  brandName: string;
  /** 成色 */
  conditionName: string;
  /** 鉴定状态 0:无需鉴定 1:待鉴定 2:已鉴定 */
  appraisalStatus?: number;
  /** 入库状态 0:待入库 1:已入库 */
  storeStatus?: number;
  /** 付款状态 0:待付款 1:已付款 */
  paymentStatus?: number;
  /** 开票状态 0:待开票 1:已开票 2:无需开票 */
  invoiceStatus?: number;
  /** 退货状态 0:无退货 1:待退货 2:已退货 */
  productRefundStatus?: number;
  /** 是否选中 */
  isSelected?: boolean;
  /** 退货审核状态 */
  refundProcessStatus?: number;
  paymentProcessStatus: number;

  baseForm: {
    id: string;
    /** 动态表单字段 */
    dynamicFields?: IDynamicComponent[];
  };
}

export interface ISettlementAuditDetail {
  /** 创建时间 */
  createTime: string;
  /** 创建人 */
  creator: string;
  /** 审核操作人ID */
  auditOperatorId: number;
  /** 审核操作人名称 */
  auditOperatorName: string;
  /** 审核备注 */
  auditComment: string;
  /** 审核时间 */
  auditTime: string;
}

/**
 * 审核详情
 */
export interface IOptApproveDetail {
  /** 创建人 */
  creator: string;
  /** 创建时间 */
  createTime: string;
  /** 审核人 */
  approveName: string;
  /** 审核时间 */
  updateTime: string;
  /** 审核结果 1:通过 2:驳回 */
  status: number;
  /** 审核意见 */
  resultDesc: string;
}

/** 合同详情 */
export interface IContractInfo {
  /** 合同id */
  id: number;
  /** 合同号 */
  contractNo: string;
  /** 合同名称 */
  contractSubject: string;
  /** 发起方名称 */
  initiator: string;
  /** 个人签署方名称 */
  personActorName: string;
  /** 业务类型 */
  businessType: EContractBusinessType;
  /** 状态 */
  status: EContractChildStatus;
}

/**
 * 收件单详情
 */
export interface IReceiveDetail {
  /** 收件单id */
  receiveId: number;
  /** 收件单号 */
  receiveNo: string;
  /** 商品类目数 */
  categoryNum: number;
  /** 商品数量 */
  num: number;
  /**
   * 期望总金额 -> 收件结算
   *
   * 结算总金额 -> 收件退货结算
   */
  expectedTotalPrice: number;
  /**
   * 收件商品信息
   * @description {@link IReceiveProduct}
   */
  productList: IReceiveProduct[];
  /** 供应商 */
  supplyCompany: string;
  /** 供应商id */
  supplyCompanyId?: number;
  /** 所属店铺 */
  shopName: string;
  /**
   * 会员信息
   * @description {@link IMemberAndBank}
   */
  memberInfo: IMemberAndBank;
  /**
   * 审核详情
   * @description {@link IOptApproveDetail}
   */
  optApproveDetailDTO: IOptApproveDetail;
  /** 收件单状态 0:草稿 1:审核中 2:审核通过 3:审核驳回 4:已作废 5:已完成 */
  receiveStatus: EReceiveStatus;
  /** 付款状态 0:待付款 1:部分付款 2:全部付款 */
  paymentStatus: EPaymentStatus;
  /** 开票状态 0:待开票 1:部分开票 2:全部已开票 3:无需开票 */
  invoiceStatus: EInvoiceStatus;
  /** 合同状态 0:未签署 1:待签署 2:部分签署 3:全部签署 */
  contractStatus: EContractStatus;
  /** 入库状态 0:待入库 1:部分入库 2:全部入库 */
  storeStatus: EStoreStatus;
  /** 退货状态 0:未退货 1:已退货 2:待退货 3:退货中 */
  productRefundStatus: EProductRefundStatus;
  /** 是否显示结算按钮 */
  showSettlementButton?: boolean;
  /** 是否显示退货按钮 */
  showRefundButton?: boolean;
  /** 是否显示开票按钮 */
  showInvoiceButton?: boolean;
  /**
   * 合同信息
   * @description {@link IContractInfo}
   */
  contractInfoList: IContractInfo[];
  /**
   * 退货单信息
   * @description {@link IOptRefundPageDTO}
   */
  refundInfoList?: IOptRefundPageDTO[];
  /** 一键入库按钮 */
  showStoreButton?: boolean;
}

/**
 * 合同业务类型
 */
export enum EContractBusinessType {
  /** 收件合同 */
  RECEIVE = 'RECEIVE',
  /** 三方合同 */
  THREE_PARTY = 'THREE_PARTY',
  /** 买卖合同 */
  TRADE = 'TRADE',
  /** 销售合同 */
  SALE = 'SALE',
}

/**
 * 合同业务类型标签
 */
export const contractBusinessTypeLabel = {
  [EContractBusinessType.RECEIVE]: '收件合同',
  [EContractBusinessType.THREE_PARTY]: '三方合同',
  [EContractBusinessType.TRADE]: '买卖合同',
  [EContractBusinessType.SALE]: '销售合同',
};

/**
 * 合同子状态
 */
export enum EContractChildStatus {
  /** 待签署 */
  PENDING = 1,
  /** 签署中 */
  SIGNING = 2,
  /** 已签署 */
  COMPLETED = 3,
  /** 已撤销 */
  REVOKED = 4,
  /** 已逾期 */
  OVERDUE = 5,
  /** 已终止 */
  TERMINATED = 6,
  /** 作废中 */
  VOIDING = 7,
  /** 已作废 */
  VOID = 8,
  /** 已到期 */
  EXPIRED = 9,
}

/**
 * 合同子状态标签映射
 */
export const contractChildStatusLabel = {
  [EContractChildStatus.PENDING]: '待签署',
  [EContractChildStatus.SIGNING]: '签署中',
  [EContractChildStatus.COMPLETED]: '已签署',
  [EContractChildStatus.REVOKED]: '已撤销',
  [EContractChildStatus.OVERDUE]: '已逾期',
  [EContractChildStatus.TERMINATED]: '已终止',
  [EContractChildStatus.VOIDING]: '作废中',
  [EContractChildStatus.VOID]: '已作废',
  [EContractChildStatus.EXPIRED]: '已到期',
};

/**
 * 合同子状态颜色映射
 */
export const contractChildStatusColor = {
  [EContractChildStatus.PENDING]: '#FF7D00',
  [EContractChildStatus.SIGNING]: '#165DFF',
  [EContractChildStatus.COMPLETED]: '#00B42A',
  [EContractChildStatus.REVOKED]: '#86909C',
  [EContractChildStatus.OVERDUE]: '#F53F3F',
  [EContractChildStatus.TERMINATED]: '#86909C',
  [EContractChildStatus.VOIDING]: '#FF7D00',
  [EContractChildStatus.VOID]: '#86909C',
  [EContractChildStatus.EXPIRED]: '#86909C',
};

/**
 * 合同子状态背景色映射
 */
export const contractChildStatusBgColor = {
  [EContractChildStatus.PENDING]: '#FFF7E8',
  [EContractChildStatus.SIGNING]: '#E8F3FF',
  [EContractChildStatus.COMPLETED]: '#E8FFEA',
  [EContractChildStatus.REVOKED]: '#F2F3F5',
  [EContractChildStatus.OVERDUE]: '#FFECE8',
  [EContractChildStatus.TERMINATED]: '#F2F3F5',
  [EContractChildStatus.VOIDING]: '#FFF7E8',
  [EContractChildStatus.VOID]: '#F2F3F5',
  [EContractChildStatus.EXPIRED]: '#F2F3F5',
};

/**
 * 收件单详情请求参数
 */
export interface IReceiveDetailParam {
  /** 收件id */
  id: number;
}

/**
 * 收件单状态
 */
export enum EReceiveStatus {
  /** 全部 */
  ALL = '',
  /** 草稿 */
  Draft = 0,
  /** 审核中 */
  Auditing = 1,
  /** 审核通过 */
  Approved = 2,
  /** 审核驳回 */
  Rejected = 3,
  /** 已作废 */
  Canceled = 4,
  /** 已完成 */
  Completed = 5,
}

/**
 * 收件单状态标签映射
 */
export const receiveStatusLabel = {
  [EReceiveStatus.Draft]: '草稿',
  [EReceiveStatus.Auditing]: '审核中',
  [EReceiveStatus.Approved]: '通过',
  [EReceiveStatus.Rejected]: '驳回',
  [EReceiveStatus.Canceled]: '已作废',
  [EReceiveStatus.Completed]: '已完成',
};

/**
 * 收件单状态类型映射
 */
export const receiveStatusType = {
  [EReceiveStatus.Draft]: 'warning',
  [EReceiveStatus.Auditing]: 'warning',
  [EReceiveStatus.Approved]: 'success',
  [EReceiveStatus.Rejected]: 'danger',
  [EReceiveStatus.Canceled]: 'default',
  [EReceiveStatus.Completed]: 'success',
};

/**
 * 收件单状态颜色映射
 */
export const receiveStatusColor = {
  [EReceiveStatus.Draft]: '#FF7D00',
  [EReceiveStatus.Auditing]: '#FF7D00',
  [EReceiveStatus.Approved]: '#165DFF',
  [EReceiveStatus.Rejected]: '#FF4948',
  [EReceiveStatus.Canceled]: '#1D2129',
  [EReceiveStatus.Completed]: '#14C539',
};

export const receiveStatusBgColor = {
  [EReceiveStatus.Draft]: '#FFF7E8',
  [EReceiveStatus.Auditing]: '#FFF7E8',
  [EReceiveStatus.Approved]: '#E8F3FF',
  [EReceiveStatus.Rejected]: '#FFECE8',
  [EReceiveStatus.Canceled]: '#F2F3F5',
  [EReceiveStatus.Completed]: '#E8FFEA',
};

/**
 * 合同状态
 */
export enum EContractStatus {
  /** 未签署 */
  Unsigned = 0,
  /** 待签署 */
  Pending = 1,
  /** 部分签署 */
  Partial = 2,
  /** 全部签署 */
  Completed = 3,
}

/**
 * 合同状态标签映射
 */
export const contractStatusLabel = {
  [EContractStatus.Unsigned]: '未签署',
  [EContractStatus.Pending]: '待签署',
  [EContractStatus.Partial]: '部分签署',
  [EContractStatus.Completed]: '全部签署',
};

/**
 * 合同状态颜色映射
 */
export const contractStatusColor = {
  [EContractStatus.Unsigned]: '#FF7D00',
  [EContractStatus.Pending]: '#165DFF',
  [EContractStatus.Partial]: '#165DFF',
  [EContractStatus.Completed]: '#00B42A',
};

/**
 * 合同状态背景色映射
 */
export const contractStatusBgColor = {
  [EContractStatus.Unsigned]: '#FFF7E8',
  [EContractStatus.Pending]: '#E8F3FF',
  [EContractStatus.Partial]: '#E8F3FF',
  [EContractStatus.Completed]: '#E8FFEA',
};

/**
 * 商品完善状态
 */
export enum EImproveProductStatus {
  /** 未完善 */
  Unimproved = 0,
  /** 已完善 */
  Improved = 1,
}

/**
 * 商品完善状态标签映射
 */
export const improveProductStatusLabel = {
  [EImproveProductStatus.Unimproved]: '未完善',
  [EImproveProductStatus.Improved]: '已完善',
};

/**
 * 会员性别
 */
export enum EMemberSex {
  /** 男 */
  Male = 0,
  /** 女 */
  Female = 1,
}

/**
 * 会员性别标签映射
 */
export const memberSexLabel = {
  [EMemberSex.Male]: '男',
  [EMemberSex.Female]: '女',
};

/**
 * 入库状态
 */
export enum EStoreStatus {
  /** 待入库 */
  Pending = 0,
  /** 部分入库 */
  Partial = 1,
  /** 全部入库 */
  Completed = 2,
}

/**
 * 入库状态标签映射
 */
export const storeStatusLabel = {
  [EStoreStatus.Pending]: '待入库',
  [EStoreStatus.Partial]: '部分入库',
  [EStoreStatus.Completed]: '全部入库',
};

/**
 * 入库状态标签映射
 */
export const storeStatusType = {
  [EStoreStatus.Pending]: 'warning',
  [EStoreStatus.Partial]: 'primary',
  [EStoreStatus.Completed]: 'success',
};

/**
 * 入库状态颜色映射
 */
export const storeStatusColor = {
  [EStoreStatus.Pending]: '#165DFF',
  [EStoreStatus.Partial]: '#165DFF',
  [EStoreStatus.Completed]: '#00B42A',
};

/**
 * 入库状态背景色映射
 */
export const storeStatusBgColor = {
  [EStoreStatus.Pending]: '#E8F3FF',
  [EStoreStatus.Partial]: '#E8F3FF',
  [EStoreStatus.Completed]: '#E8FFEA',
};

/**
 * 入库状态
 */
export enum EStoreChiildStatus {
  /** 未入库 */
  Not = 0,
  /** 已入库 */
  Yes = 1,
}

/**
 * 入库状态标签映射
 */
export const storeChildStatusLabel = {
  [EStoreChiildStatus.Not]: '未入库',
  [EStoreChiildStatus.Yes]: '已入库',
};

/**
 * 入库状态标签映射
 */
export const storeChildStatusType = {
  [EStoreChiildStatus.Not]: 'warning',
  [EStoreChiildStatus.Yes]: 'success',
};

export enum EProductRefundStatus {
  /** 未退货 */
  NotReturned = 0,
  /** 已退货 */
  Returned = 1,
  /** 待退货 */
  Wait = 2,
  /** 退货中 */
  Processing = 3,
}

export const productRefundStatusLabel = {
  [EProductRefundStatus.NotReturned]: '未退货',
  [EProductRefundStatus.Returned]: '已退货',
  [EProductRefundStatus.Wait]: '待退货',
  [EProductRefundStatus.Processing]: '退货中',
};

export const productRefundStatusType = {
  [EProductRefundStatus.NotReturned]: 'default',
  [EProductRefundStatus.Returned]: 'success',
  [EProductRefundStatus.Wait]: 'primary',
  [EProductRefundStatus.Processing]: 'processing',
};

/**
 * 审核结果状态
 */
export enum EApproveStatus {
  /** 通过 */
  Approved = 1,
  /** 驳回 */
  Rejected = 2,
}

/**
 * 审核结果状态标签映射
 */
export const approveStatusLabel = {
  [EApproveStatus.Approved]: '通过',
  [EApproveStatus.Rejected]: '驳回',
};

export interface ISettlementCategory {
  /** 商品数量 */
  productCount: number;
  /** 商品分类数量 */
  categoryCount: number;
  /**
   * 期望总金额 -> 收件结算
   *
   * 结算总金额 -> 收件退货结算
   */
  expectedTotalPrice: number;
}

export interface ISettlementBasic {
  /** 状态 */
  status?: ESettlementOrderStatus;
  /** 结算单号 */
  settlementNo?: string;
  /** 结算状态 */
  settlementStatus?: ESettlementStatus;
  /** 结算单类型 */
  settlementType?: ESettlementType;
  /** 收件单ID */
  receiveId?: number;
  /** 收件单号 */
  receiveNo?: string;
  /**
   * 关联收件单ID
   *
   * 收件id -> 收件结算
   *
   * 收件退货id -> 收件退货结算
   */
  relatedOrderId?: number;
  /** 供应商 */
  supplyCompany?: string;
  /** 结算商品数量 */
  productCount?: number;
  /**
   * 应结金额 -> 收件结算
   *
   * 应退金额 -> 收件退货结算
   */
  amountPayable?: number;
  /**
   * 已付金额(¥) -> 收件结算
   *
   * 实退金额(¥) -> 收件退货结算
   */
  amountPaid?: number;

  /** 退款单ID */
  refundId?: number;
  /** 退款单号 */
  refundNo?: string;
  /** 退款总金额(¥) */
  refundTotalPrice?: number;
}

/**
 * 结算商品
 * @description 格式化后的前端视图层结构，不是接口原始的结构
 */
export interface ISettlementGoods extends Partial<ISettlementOrderGoods> {
  /** 商品图片列表 */
  fileList?: IFileInfo[];
  /** 是否选中 */
  isSelected?: boolean;
}

export interface ISettlementPayee {
  /** 收款人名 */
  payeeName?: string;
  /** 收款人身份 */
  payeeIdentity: string;
  /** 收款人手机号 */
  payeePhone?: string;
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
}

/**
 * 鉴定状态
 */
export enum EAppraisalStatus {
  /** 无需鉴定 */
  NoNeed = 0,
  /** 待鉴定 */
  Pending = 1,
  /** 已鉴定 */
  Completed = 2,
}

/**
 * 鉴定状态标签映射
 */
export const appraisalStatusLabel = {
  [EAppraisalStatus.NoNeed]: '无需鉴定',
  [EAppraisalStatus.Pending]: '待鉴定',
  [EAppraisalStatus.Completed]: '已鉴定',
};

/**
 * 鉴定状态颜色映射
 */
export const appraisalStatusColor = {
  [EAppraisalStatus.NoNeed]: '#F53F3F',
  [EAppraisalStatus.Pending]: '#165DFF',
  [EAppraisalStatus.Completed]: '#00B42A',
};

/**
 * 鉴定状态背景色映射
 */
export const appraisalStatusBgColor = {
  [EAppraisalStatus.NoNeed]: '#FFECE8',
  [EAppraisalStatus.Pending]: '#E8F3FF',
  [EAppraisalStatus.Completed]: '#E8FFEA',
};

/**
 * 商品入库状态
 */
export enum EProductStoreStatus {
  /** 待入库 */
  Pending = 0,
  /** 已入库 */
  Completed = 1,
}

/**
 * 商品入库状态标签映射
 */
export const productStoreStatusLabel = {
  [EProductStoreStatus.Pending]: '待入库',
  [EProductStoreStatus.Completed]: '已入库',
};

/**
 * 商品入库状态颜色映射
 */
export const productStoreStatusColor = {
  [EProductStoreStatus.Pending]: '#165DFF',
  [EProductStoreStatus.Completed]: '#00B42A',
};

/**
 * 商品入库状态背景色映射
 */
export const productStoreStatusBgColor = {
  [EProductStoreStatus.Pending]: '#E8F3FF',
  [EProductStoreStatus.Completed]: '#E8FFEA',
};

