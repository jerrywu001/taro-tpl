import { TagType } from '@nutui/nutui-taro';
import { IPageParam } from '../common';
import { IOptApproveDetail } from './detail';
import { IMemberAndBank } from '../member';

/**
 * 退货单详情请求参数
 */
export interface IRefundDetailParam {
  /** 退货单id */
  id: number;
}

/**
 * 退货单列表查询参数
 */
export interface IRefoundOrderListParam extends IPageParam {
  /** 退货单号 */
  refundNo?: string;
  /** 收件单号 */
  receiveNo?: string;
  /** 会员名称 */
  memberName?: string;
  /** 创建人 */
  creator?: string;
  /** 创建开始时间 yyyy-MM-dd */
  createStartTime?: string;
  /** 创建结束时间 yyyy-MM-dd */
  createEndTime?: string;
  /** 退货列表筛选状态 */
  filterStatus?: ERefundListFilterStatus;
}

/**
 * 退货方式枚举
 */
export enum ERefundType {
  /** 自提 */
  SELF_PICKUP = 'SELF_PICKUP',
  /** 物流 */
  LOGISTICS = 'LOGISTICS',
}

/**
 * 退货方式标签映射
 */
export const refundTypeLabel = {
  [ERefundType.SELF_PICKUP]: '自提',
  [ERefundType.LOGISTICS]: '物流',
};

/**
 * 退货单状态枚举
 */
export enum ERefundStatus {
  /** 草稿 */
  DRAFT = 0,
  /** 待审核 */
  PENDING = 1,
  /** 审核通过 */
  APPROVED = 2,
  /** 审核驳回 */
  REJECTED = 3,
  /** 已作废 */
  CANCELLED = 4,
  /** 已完成 */
  COMPLETED = 5,
}

/**
 * 退货单状态标签映射
 */
export const refundStatusLabel = {
  [ERefundStatus.DRAFT]: '草稿',
  [ERefundStatus.PENDING]: '待审核',
  [ERefundStatus.APPROVED]: '通过',
  [ERefundStatus.REJECTED]: '驳回',
  [ERefundStatus.CANCELLED]: '已作废',
  [ERefundStatus.COMPLETED]: '已退货',
};

export const refundStatusType: Record<string, TagType> = {
  [ERefundStatus.DRAFT]: 'warning',
  [ERefundStatus.PENDING]: 'warning',
  [ERefundStatus.APPROVED]: 'success',
  [ERefundStatus.REJECTED]: 'danger',
  [ERefundStatus.CANCELLED]: 'default',
  [ERefundStatus.COMPLETED]: 'success',
};

export const refundStatusColor = {
  [ERefundStatus.DRAFT]: '#FF9C38',
  [ERefundStatus.PENDING]: '#FF9C38',
  [ERefundStatus.APPROVED]: '#14C539',
  [ERefundStatus.REJECTED]: '#FF4948',
  [ERefundStatus.CANCELLED]: '#999999',
  [ERefundStatus.COMPLETED]: '#14C539',
};

export const refundStatusBgColor = {
  [ERefundStatus.DRAFT]: '#FFF7E8',
  [ERefundStatus.PENDING]: '#E8F3FF',
  [ERefundStatus.APPROVED]: '#E8FFEA',
  [ERefundStatus.REJECTED]: '#E8FFEA',
  [ERefundStatus.CANCELLED]: '#E8FFEA',
  [ERefundStatus.COMPLETED]: '#E8FFEA',
};

/**
 * 收款状态枚举
 */
export enum EReceivePayment {
  /** 未收款 */
  NONE = 0,
  /** 部分收款 */
  PARTIAL = 1,
  /** 全部收款 */
  FULL = 2,
}

/**
 * 收款状态标签映射
 */
export const receivePaymentLabel = {
  [EReceivePayment.NONE]: '未收款',
  [EReceivePayment.PARTIAL]: '部分收款',
  [EReceivePayment.FULL]: '全部收款',
};

export const receivePaymentType: Record<string, TagType> = {
  [EReceivePayment.NONE]: 'default',
  [EReceivePayment.PARTIAL]: 'warning',
  [EReceivePayment.FULL]: 'success',
};

/**
 * 退货列表筛选状态
 */
export enum ERefundListFilterStatus {
  /** 全部 */
  All = '0',
  /** 审核中 */
  Auditing = '1',
  /** 待收款 */
  PendingPayment = '2',
  /** 全部收款 */
  FullPayment = '3',
  /** 已完成 */
  Completed = '4',
}

/**
 * 退货列表筛选状态标签
 */
export const refundListFilterStatusLabel = {
  [ERefundListFilterStatus.All]: '全部',
  [ERefundListFilterStatus.Auditing]: '审核中',
  [ERefundListFilterStatus.PendingPayment]: '待收款',
  [ERefundListFilterStatus.FullPayment]: '全部收款',
  [ERefundListFilterStatus.Completed]: '已完成',
};

/**
 * 退货列表 Tab 配置
 */
export const refundListFilterTabs = [
  {
    title: refundListFilterStatusLabel[ERefundListFilterStatus.All],
    paneKey: ERefundListFilterStatus.All,
  },
  {
    title: refundListFilterStatusLabel[ERefundListFilterStatus.Auditing],
    paneKey: ERefundListFilterStatus.Auditing,
  },
  {
    title: refundListFilterStatusLabel[ERefundListFilterStatus.PendingPayment],
    paneKey: ERefundListFilterStatus.PendingPayment,
  },
  {
    title: refundListFilterStatusLabel[ERefundListFilterStatus.FullPayment],
    paneKey: ERefundListFilterStatus.FullPayment,
  },
  {
    title: refundListFilterStatusLabel[ERefundListFilterStatus.Completed],
    paneKey: ERefundListFilterStatus.Completed,
  },
];

/**
 * 收款状态颜色映射
 */
export const receivePaymentColor = {
  [EReceivePayment.NONE]: '#FF4948',
  [EReceivePayment.PARTIAL]: '#FF9C38',
  [EReceivePayment.FULL]: '#14C539',
};

/**
 * 退货单列表项
 */
export interface IRefundOrderItem {
  /** 退货主键id */
  id: number;
  /** 退货单号 */
  receiveNo: string;
  /** 会员头像 */
  avatar: string;
  /** 会员名称 */
  memberName: string;
  /** 会员手机号 */
  phone: string;
  /** 退货方式 */
  refundType: ERefundType;
  /** 退货总金额 */
  refundTotalAmount: number;
  /** 实际已退总金额 */
  actualRefundTotalAmount: number;
  /** 创建时间 */
  createTime: string;
  /** 创建人 */
  creator: string;
  /** 退货单状态 */
  status: ERefundStatus;
  /** 收款状态 */
  receivePayment: EReceivePayment;
  /** 退货单号 */
  refundNo: string;
}

/**
 * 退货商品明细
 */
export interface IRefundProductDetail {
  /** 收件商品id */
  receiveSubId: number;
  /** 退货金额 */
  refundAmount: number;
}

/**
 * 保存退货单参数
 */
export interface ISaveRefundParam {
  /** 操作类型 0:保存草稿 1:提交审核 */
  operateType: number;
  /** 收件单id */
  receiveId: number;
  /** 退货单id */
  id?: number;
  /** 退货原因 */
  refundReason?: string;
  /** 退货方式 */
  refundType: ERefundType;
  /** 退货商品明细 */
  refundDetailList: IRefundProductDetail[];
}

/**
 * 可退货的收件单信息
 */
export interface IRefundReceiveItem {
  /** 收件单id */
  receiveId: number;
  /** 收件单号 */
  receiveNo: string;
  /** 会员名称 */
  memberName: string;
}

/**
 * 鉴定结果枚举
 */
export enum EAppraisalStatus {
  /** 无法鉴定 */
  UNABLE = 0,
  /** 真 */
  AUTHENTIC = 1,
  /** 假 */
  FAKE = 2,
}

/**
 * 鉴定结果标签映射
 */
export const appraisalStatusLabel = {
  [EAppraisalStatus.UNABLE]: '无法鉴定',
  [EAppraisalStatus.AUTHENTIC]: '真',
  [EAppraisalStatus.FAKE]: '假',
};

/**
 * 鉴定结果颜色映射
 */
export const appraisalStatusColor = {
  [EAppraisalStatus.UNABLE]: '#999999',
  [EAppraisalStatus.AUTHENTIC]: '#14C539',
  [EAppraisalStatus.FAKE]: '#FF4948',
};

/**
 * 文件信息
 */
export interface IFileInfo {
  /** 主键 */
  id: number;
  /** 业务id */
  busId: number;
  /** 附件url */
  fileUrl: string;
  /** 来源标识 */
  flag: string;
}

/**
 * 可退货商品详情
 */
export interface IReturnableProductDetail {
  /** 收件商品id */
  receiveSubId: number;
  /** 退货商品id */
  refundSubId: number;
  /**
   * 子收件单号 -> 收件结算
   *
   * 子退货单号 -> 收件退货结算
   */
  receiveSubNo: string;
  /** 商品标题 */
  productName: string;
  /** 品牌名 */
  brandName: string;
  /** 成色 */
  conditionName: string;
  /** 鉴定结果 */
  appraisalStatus: EAppraisalStatus;
  /** 结算金额 */
  settlementAmount: number;
  /** 退货金额 */
  refundAmount: number;
  /** 收件图片 */
  fileList: IFileInfo[];

  refundSettlementProcessStatus: number;

  /** 商品唯一标识 */
  uniqueCode?: string;
  /** 商品类目 */
  categoryName?: string;
  /** 商品类目ID */
  categoryCheckId?: number | string;
}

/**
 * 退货单详情
 */
export interface IRefundDetail {
  /** 收件退货单id */
  id: number;
  /** 收件退货单号 */
  refundNo: string;
  /** 收件单号 */
  receiveNo: string;
  /** 收件单id */
  receiveId: number;
  /** 会员信息 */
  memberInfo: IMemberAndBank;
  /** 退货原因 */
  refundReason: string;
  /** 退货方式 */
  refundType: ERefundType;
  /** 商品类目数 */
  categoryNum: number;
  /** 退货数量 */
  num: number;
  /** 结算总金额 */
  settlementTotalPrice: number;
  /** 应退货总金额 */
  refundTotalPrice: number;
  /** 退货商品明细 */
  refundDetailList: IReturnableProductDetail[];
  /** 退货单状态 0:草稿 1:待审核 2:审核通过 3:审核驳回 4:已作废 */
  status: ERefundStatus;
  /** 审核详情 */
  optApproveDetailDTO: IOptApproveDetail;
  /** 收款状态 */
  receivePayment: EReceivePayment;
  /** 是否展示结算按钮 */
  showSettlementButton: boolean;
  /** 是否展示付款按钮 */
  showPaymentButton: boolean;
  /** 是否展示退货按钮 */
  showRefundButton: boolean;

  /** 供应商 */
  supplyCompany: string;
  /** 供应链公司id */
  supplyCompanyId?: number;
}
