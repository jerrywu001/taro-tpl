import Taro from '@tarojs/taro';
import { ILoginClient } from './login';
import { TagType } from '@nutui/nutui-taro';
import { ESettlementType, settlementTypeLabel } from './pickup/settlement';
import { EPaymentOrderStatus, paymentOrderStatusLabel } from './pickup/payment';
import { EPayeeOrderStatus, payeeOrderStatusLabel } from './payee';
import { EReceiveStatus, receiveStatusLabel } from './pickup/detail';

export interface IPageParam {
  /** 页码 */
  page: number;
  /** 每页条数 */
  size: number;
}

export enum ESmsType {
  /** 登录 */
  Login = 9,
  /** 修改密码 */
  EditPass = 1,
  /** 修改手机号（原手机号） */
  OldEditPhone = 2,
  /** 修改手机号(新手机号) */
  EditPhone = 3,
  /** 找回密码 */
  FindPass = 0,
  /** 修改支付密码 */
  UpdatePayPwd = 11,
  /** 修改支付手机号(原来) */
  UpdatePayPhoneOld = 12,
  /** 修改支付手机号(新) */
  UpdatePayPhoneNew = 13,
  /** 支付发送验证码 */
  SplitBill = 14,
  /** 企业降级 */
  DowngradeCompany = 15,
  /** 集团-企业解绑 */
  UnBindCompany = 16,
  /** 内部转账 */
  InternalTransfer = 18,
}

export enum EStatus {
  /** 启用 */
  ENABLED = 'ENABLED',
  /** 缓冲期 */
  GRACE = 'GRACE',
  /** 停用 */
  DISABLED = 'DISABLED',
}

export const statusLabel = {
  [EStatus.ENABLED]: '启用',
  [EStatus.GRACE]: '缓冲期',
  [EStatus.DISABLED]: '停用',
};

export const statusListLabel = {
  [EStatus.ENABLED]: '已启用',
  [EStatus.GRACE]: '缓冲期',
  [EStatus.DISABLED]: '已停用',
};

export const statusStyle: { [key: string]: TagType } = {
  [EStatus.ENABLED]: 'success',
  [EStatus.GRACE]: 'warning',
  [EStatus.DISABLED]: 'danger',
};

export const GlobalKeys = {
  TokenKey: 'TOKEN_KEY',
  /** 当前登录应用 */
  CurrentClient: 'CurrentClient',
  /** 应用列表 */
  Clients: 'Clients',
  /** 当前店铺 */
  CurrentShop: 'CurrentShop',
  /** 当前员工姓名 */
  StaffName: 'StaffName',
};

export function getClientsFromStorage() {
  const res = Taro.getStorageSync(GlobalKeys.Clients) as string;

  if (res) {
    const clients = JSON.parse(res) as ILoginClient[];

    return clients || [];
  }

  return [];
}

/** 审核状态 */
export enum EAuditStatus {
  /** 全部 */
  ALL = '',
  /** 待审核 */
  PENDING = 0,
  /** 已完成 */
  APPROVED = 1,
  /** 已拒绝 */
  REJECTED = 2,
}

export const auditStatusGroupOptions = [
  {
    title: '处理状态',
    keyname: 'auditStatus',
    options: [
      {
        label: '待审核',
        value: EAuditStatus.PENDING,
      },
      {
        label: '已完成',
        value: EAuditStatus.APPROVED,
      },
      {
        label: '已拒绝',
        value: EAuditStatus.REJECTED,
      },
    ],
  },
];

export const auditStatusLabel = {
  [EAuditStatus.PENDING]: '待审核',
  [EAuditStatus.APPROVED]: '通过',
  [EAuditStatus.REJECTED]: '驳回',
};

export const auditStatusColor = {
  [EAuditStatus.PENDING]: '#1777FF',
  [EAuditStatus.APPROVED]: '#14C539',
  [EAuditStatus.REJECTED]: '#FF4948',
};

export const auditStatusBgColor = {
  [EAuditStatus.PENDING]: '#fff',
  [EAuditStatus.APPROVED]: '#E8FAEC',
  [EAuditStatus.REJECTED]: '#FFEDED',
};

export interface IImageData {
  /** 图片id */
  id: number;
  /** 图片url */
  fileUrl: string;
}

export interface ICondition {
  field: string;
  value: any;
  /**
   * 运算符，默认为eq（等于）
   */
  operator?: 'eq' | 'like' | 'gt' | 'lt' | 'gte' | 'lte' | 'in' | 'between';
}
export function toConditional(d: Record<string, any>) {
  const operatorTypes = d.operatorTypes || {};
  const item = JSON.parse(JSON.stringify(d)) as Record<string, any>;
  const obj = JSON.parse(JSON.stringify(item)) as Record<string, any>;
  const conditions = [] as Array<ICondition>;

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (['page', 'size', 'orders'].includes(key) || key === 'operatorTypes') continue;

      const value = obj[key];

      const d = {
        field: key,
        value,
      } as ICondition;

      if (Array.isArray(value)) {
        d.operator = 'between';
      } else {
        d.operator = operatorTypes[key] || undefined;
      }

      conditions.push(d);
    }
  }

  return {
    conditions,
    page: obj.page as number,
    size: obj.size as number,
    orders: obj?.orders?.length ? obj.orders : undefined,
  };
}

export type IOptionItem = {
  label: string;
  value?: string | number;
  disabled?: boolean;
};

export const settlementTypeColumns = [
  [
    {
      text: '全部类型',
      value: '',
    },
    {
      text: settlementTypeLabel[ESettlementType.RECEIVE],
      value: ESettlementType.RECEIVE,
    },
    {
      text: settlementTypeLabel[ESettlementType.RETURN_RECEIVE],
      value: ESettlementType.RETURN_RECEIVE,
    },
  ],
];

export const settlementTypeOptions = settlementTypeColumns[0].map((opt) => ({
  label: opt.text,
  value: opt.value,
}));

export const paymentStatusColumns = [
  {
    text: '全部',
    value: '',
  },
  {
    text: paymentOrderStatusLabel[EPaymentOrderStatus.PAYING],
    value: EPaymentOrderStatus.PAYING,
  },
  {
    text: paymentOrderStatusLabel[EPaymentOrderStatus.SUCCESS],
    value: EPaymentOrderStatus.SUCCESS,
  },
  {
    text: paymentOrderStatusLabel[EPaymentOrderStatus.FAILED],
    value: EPaymentOrderStatus.FAILED,
  },
];

export const payeeStatusColumns = [
  {
    text: '全部',
    value: '',
  },
  {
    text: payeeOrderStatusLabel[EPayeeOrderStatus.PENDING],
    value: EPayeeOrderStatus.PENDING,
  },
  {
    text: payeeOrderStatusLabel[EPayeeOrderStatus.PROCESSING],
    value: EPayeeOrderStatus.PROCESSING,
  },
  {
    text: payeeOrderStatusLabel[EPayeeOrderStatus.SUCCESS],
    value: EPayeeOrderStatus.SUCCESS,
  },
  {
    text: payeeOrderStatusLabel[EPayeeOrderStatus.FAILED],
    value: EPayeeOrderStatus.FAILED,
  },
];

export const receiveStatusColumns = [
  {
    text: '全部',
    value: '',
  },
  {
    text: receiveStatusLabel[EReceiveStatus.Draft],
    value: EReceiveStatus.Draft,
  },
  {
    text: receiveStatusLabel[EReceiveStatus.Auditing],
    value: EReceiveStatus.Auditing,
  },
  {
    text: receiveStatusLabel[EReceiveStatus.Approved],
    value: EReceiveStatus.Approved,
  },
  {
    text: receiveStatusLabel[EReceiveStatus.Rejected],
    value: EReceiveStatus.Rejected,
  },
  {
    text: receiveStatusLabel[EReceiveStatus.Canceled],
    value: EReceiveStatus.Canceled,
  },
  {
    text: receiveStatusLabel[EReceiveStatus.Completed],
    value: EReceiveStatus.Completed,
  },
];

export const paymentStatusOptions = paymentStatusColumns.map((opt) => ({
  label: opt.text,
  value: opt.value,
}));

export const payeeStatusOptions = payeeStatusColumns.map((opt) => ({
  label: opt.text,
  value: opt.value,
}));

export const receiveStatusOptions = receiveStatusColumns.map((opt) => ({
  label: opt.text,
  value: opt.value,
}));

export function getPaymentStatusLabel(status?: EPaymentOrderStatus) {
  if (!status) return '';
  return paymentOrderStatusLabel[status];
}

export function getSettlementTypeLabel(type?: ESettlementType) {
  if (!type) return '';
  return settlementTypeLabel[type];
}

export function getPayeeStatusLabel(status?: EPayeeOrderStatus) {
  if (!status) return '';
  return payeeOrderStatusLabel[status];
}

export function getReceiveStatusLabel(status?: EReceiveStatus) {
  if (status === undefined || status === null) return '';
  return receiveStatusLabel[status];
}

export interface IMasterBank {
  bankName: string;
  bankCode: string;
}

export interface ICnapsCode {
  /** 支行名称 */
  cnapsCode: string;
  /** 支行名称 */
  cnapsName: string;
}

export interface IReceiveRefundOption {
  busId: number;
  busNo: string;
  /**
   * 结算类型
   * @description {@link ESettlementType}
   */
  busType: ESettlementType;
}
