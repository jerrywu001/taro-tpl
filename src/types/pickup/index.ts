import { IDynamicComponent } from '@/components/dynamic';
import { EOperateType, IFileInfo } from './save';

/** 实名状态 */
export enum EAuthStatus {
  /** 未实名 */
  UNAUTH = 0,
  // /** 实名中 */
  // AUTHING = 1,
  // /** 已实名 */
  AUTHED = 1,
}
export const authStatusLabel = {
  [EAuthStatus.UNAUTH]: '待实名',
  // [EAuthStatus.AUTHING]: '实名中',
  [EAuthStatus.AUTHED]: '已实名',
};

export const authtatusColor = {
  [EAuthStatus.UNAUTH]: '#FF4948',
  // [EAuthStatus.AUTHING]: '#FF4948',
  [EAuthStatus.AUTHED]: '#00B42A',
};

export const authStatusBgColor = {
  [EAuthStatus.UNAUTH]: '#FFEDED',
  // [EAuthStatus.AUTHING]: '#FFEDED',
  [EAuthStatus.AUTHED]: '#E8FFEA',
};

/** 付款状态 */
export enum EPaymentStatus {
  /** 待付款 */
  Pending = 0,
  /** 部分付款 */
  Part = 1,
  /** 全部付款 */
  All = 2,
}
export const paymentStatusLabel = {
  [EPaymentStatus.Pending]: '待付款',
  [EPaymentStatus.Part]: '部分付款',
  [EPaymentStatus.All]: '已付款',
};

export const paymentStatusType = {
  [EPaymentStatus.Pending]: 'warning',
  [EPaymentStatus.Part]: 'primary',
  [EPaymentStatus.All]: 'success',
};

export const paymentStatusColor = {
  [EPaymentStatus.Pending]: '#165DFF',
  [EPaymentStatus.Part]: '#165DFF',
  [EPaymentStatus.All]: '#00B42A',
};

export const paymentStatusBgColor = {
  [EPaymentStatus.Pending]: '#E8F3FF',
  [EPaymentStatus.Part]: '#E8F3FF',
  [EPaymentStatus.All]: '#E8FFEA',
};

/** 子收件商品付款状态 */
export enum EPaymentChildStatus {
  /** 待付款 */
  Wait = 1,
  /** 已付款 */
  Success = 2,
  /** 未付款 */
  Not = 0,
}
export const paymentChildStatusLabel = {
  [EPaymentChildStatus.Wait]: '待付款',
  [EPaymentChildStatus.Success]: '已付款',
  [EPaymentChildStatus.Not]: '未付款',
};

export const paymentChildStatusType = {
  [EPaymentChildStatus.Wait]: 'warning',
  [EPaymentChildStatus.Success]: 'success',
  [EPaymentChildStatus.Not]: 'danger',
};

/** 合同状态 */
export enum EContractSignStatus {
  /** 未签署 */
  Not = 0,
  /** 待签署 */
  Wait = 1,
  /** 部分签署 */
  Part = 2,
  /** 全部签署 */
  All = 3,
}

export const contractSignStatusLabel = {
  [EContractSignStatus.Not]: '未签署',
  [EContractSignStatus.Wait]: '待签署',
  [EContractSignStatus.Part]: '部分签署',
  [EContractSignStatus.All]: '全部签署',
};
export const contractSignStatusType = {
  [EContractSignStatus.Not]: 'warning',
  [EContractSignStatus.Wait]: 'primary',
  [EContractSignStatus.Part]: 'primary',
  [EContractSignStatus.All]: 'success',
};

export const contractSignstatusColor = {
  [EContractSignStatus.Not]: '#FF7D00',
  [EContractSignStatus.Wait]: '#165DFF',
  [EContractSignStatus.Part]: '#165DFF',
  [EContractSignStatus.All]: '#00B42A',
};

export const contractSignStatusBgColor = {
  [EContractSignStatus.Not]: '#FFF7E8',
  [EContractSignStatus.Wait]: '#E8F3FF',
  [EContractSignStatus.Part]: '#E8F3FF',
  [EContractSignStatus.All]: '#E8FFEA',
};

/** 开票状态 */
export enum EInvoiceStatus {
  /** 待开票 */
  Wait = 0,
  /** 部分开票 */
  Part = 1,
  /** 已开票 */
  Invoiced = 2,
  /** 无需开票 */
  NoNeed = 3,
}

export const invoiceStatusLabel = {
  [EInvoiceStatus.Wait]: '待开票',
  [EInvoiceStatus.Part]: '部分开票',
  [EInvoiceStatus.NoNeed]: '无需开票',
  [EInvoiceStatus.Invoiced]: '已开票',
};

export const invoiceStatusType = {
  [EInvoiceStatus.Wait]: 'primary',
  [EInvoiceStatus.Part]: 'primary',
  [EInvoiceStatus.NoNeed]: 'success',
  [EInvoiceStatus.Invoiced]: 'success',
};

export const invoiceStatusColor = {
  [EInvoiceStatus.Wait]: '#165DFF',
  [EInvoiceStatus.Part]: '#165DFF',
  [EInvoiceStatus.NoNeed]: '#00B42A',
  [EInvoiceStatus.Invoiced]: '#00B42A',
};

export const invoiceStatusBgColor = {
  [EInvoiceStatus.Wait]: '#E8F3FF',
  [EInvoiceStatus.Part]: '#E8F3FF',
  [EInvoiceStatus.NoNeed]: '#E8FFEA',
  [EInvoiceStatus.Invoiced]: '#E8FFEA',
};

/** 开票子状态 */
export enum EInvoiceChildStatus {
  /** 待开票 */
  Wait = 0,
  /** 已开票 */
  Invoiced = 1,
  /** 开票中 */
  Invoicing = 2,
}

export const invoiceChildStatusLabel = {
  [EInvoiceChildStatus.Wait]: '待开票',
  [EInvoiceChildStatus.Invoiced]: '已开票',
  [EInvoiceChildStatus.Invoicing]: '开票中',
};

export const invoiceChildStatusType = {
  [EInvoiceChildStatus.Wait]: 'primary',
  [EInvoiceChildStatus.Invoiced]: 'success',
  [EInvoiceChildStatus.Invoicing]: 'warning',
};

/** 收件列表筛选状态 */
export enum EReceiveFilterStatus {
  /** 全部 */
  All = '0',
  /** 待签署 */
  WaitSign = '1',
  /** 待付款 */
  WaitPayment = '2',
  /** 待开票 */
  WaitInvoice = '3',
  /** 已完成 */
  Completed = '4',
}

export const receiveFilterStatusLabel = {
  [EReceiveFilterStatus.All]: '全部',
  [EReceiveFilterStatus.WaitSign]: '待签署',
  [EReceiveFilterStatus.WaitPayment]: '待付款',
  [EReceiveFilterStatus.WaitInvoice]: '待开票',
  [EReceiveFilterStatus.Completed]: '已完成',
};

/** 收件列表 Tab 项配置 */
export const receiveFilterTabs = [
  {
    title: receiveFilterStatusLabel[EReceiveFilterStatus.All],
    paneKey: EReceiveFilterStatus.All,
  },
  {
    title: receiveFilterStatusLabel[EReceiveFilterStatus.WaitSign],
    paneKey: EReceiveFilterStatus.WaitSign,
  },
  {
    title: receiveFilterStatusLabel[EReceiveFilterStatus.WaitPayment],
    paneKey: EReceiveFilterStatus.WaitPayment,
  },
  {
    title: receiveFilterStatusLabel[EReceiveFilterStatus.WaitInvoice],
    paneKey: EReceiveFilterStatus.WaitInvoice,
  },
  {
    title: receiveFilterStatusLabel[EReceiveFilterStatus.Completed],
    paneKey: EReceiveFilterStatus.Completed,
  },
];

export interface IPickupGoods {
  /** 商品名称 */
  productName: string;
  /** 类目id ——> leafCategoryId */
  categoryCheckId?: number | null;
  /** 类目名称 */
  categoryName?: string;
  /** 数量 */
  num?: number | null;
  /** 期望价格 */
  expectedPrice?: number | null;
  /** 图片列表 */
  fileList: IFileInfo[];
  productCode?: string;

  receiveSubId?: number;
  /** 结算价格 */
  settlementPrice?: number | null;
  /** 一级类目id */
  categoryTopId?: number;
  /** 是否需要鉴定 */
  needAppraisal?: number;

  /** 动态表单字段 */
  baseForm?: {
    id?: string | null;
    dynamicFields?: IDynamicComponent[];
  };

  status?: number;
  formSchemaHash?: string;
  brandId?: number;
  brandName?: string;
  brandNameEn?: string;
  modelId?: number;
  modelName?: string;
  seriesId?: number;
  seriesName?: string;

  /** 唯一标识：仅前端交互使用 */
  uuid?: string;
}

export interface IPickupCreateParam {
  /** 收件单id: 编辑需要 */
  id?: number;
  /** 操作类型 */
  operateType: EOperateType;
  /** 供应商id */
  supplyCompanyId?: number;
  /** 供应商名称 */
  supplyCompanyName?: string;
  /** 会员id */
  memberId?: number;
  /** 商品列表 */
  productList: IPickupGoods[];
}
