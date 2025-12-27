import { IPageParam } from '../common';
import { TagType } from '@nutui/nutui-taro';

export interface IContractTodoItem {
  /** 合同ID */
  contractId?: number;
  /** 合同编号 */
  contractNo?: string;
  /** 合同名称 */
  contractSubject?: string;
  /** 业务类型 */
  businessType: EContractBusinessType;
  /** 发起方 */
  initiator?: string;
  /** 签署方 */
  personActorName?: string;

}

export interface IContractTodoParam extends IPageParam {
  /** 合同编号 */
  contractNo?: string;
}

/**
 * 合同发起方式
 */
export enum EContractInitiatorType {
  /** 线上发起 */
  ONLINE = 0,
  /** 线下上传 */
  OFFLINE = 1,
}

/**
 * 合同发起方式标签
 */
export const contractInitiatorTypeLabel = {
  [EContractInitiatorType.ONLINE]: '线上发起',
  [EContractInitiatorType.OFFLINE]: '线下上传',
};

/**
 * 合同模版类型
 */
export enum EContractTemplateType {
  /** 自由合同 */
  FREE = 'FREE',
  /** 二手业务合同 */
  SECOND_HAND = 'SECOND_HAND',
}

/**
 * 合同模版类型标签
 */
export const contractTemplateTypeLabel = {
  [EContractTemplateType.FREE]: '自由合同',
  [EContractTemplateType.SECOND_HAND]: '二手业务合同',
};

/**
 * 合同业务类型
 */
export enum EContractBusinessType {
  /** 自由合同 */
  FREE = 'FREE',
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
  [EContractBusinessType.FREE]: '自由合同',
  [EContractBusinessType.RECEIVE]: '收件合同',
  [EContractBusinessType.THREE_PARTY]: '三方合同',
  [EContractBusinessType.TRADE]: '买卖合同',
  [EContractBusinessType.SALE]: '销售合同',
};

/**
 * 合同签署方字段信息
 */
export interface IContractActorFieldParam {
  /** 字段编码 */
  fieldCode: string;
  /** 字段值 */
  fieldValue: string;
}

/**
 * 合同签署方信息
 */
export interface IContractActorParam {
  /** 签署方模版配置id */
  id?: number;
  /** 签署方身份标识(身份证号/统一社会信用码) */
  identityCode?: string;
  /** 签署方名称 */
  name?: string;
  /** 签署方手机号 */
  phone?: string;
  /** 签署方字段信息 */
  contractFieldList?: IContractActorFieldParam[];
}

/**
 * 自定义合同字段
 */
export interface IContractCustomFieldParam {
  /** 字段编码 */
  fieldCode: string;
  /** 字段值 */
  fieldValue: string;
}

/**
 * 创建合同请求参数
 */
export interface IContractCreateParam {
  /** 业务id */
  busId: number;
  /** 发起类型 */
  initiatorType: EContractInitiatorType;
  /** 模版类型 */
  tempType: EContractTemplateType;
  /** 业务类型 */
  businessType: EContractBusinessType;
  /** 合同模版id（线上发起必填） */
  contractTempId?: number;
  /** 线下发起合同时的文件预览地址 */
  filePreviewUrl?: string;
  /** 合同名称 */
  contractSubject: string;
  /** 合同签约截止时间 yyyy-MM-dd HH:mm:ss */
  signEndTime?: string;
  /** 合同到期时间 yyyy-MM-dd HH:mm:ss */
  expireTime?: string;
  /** 签署方信息 */
  actorList?: IContractActorParam[];
  /** 自定义合同字段信息 */
  contractCustomFieldList?: IContractCustomFieldParam[];
  /** 合同备注 */
  remark?: string;
  dynamicTableConfigList: any[];
}

/**
 * 创建合同返回内容
 */
export interface IContractCreateResult {
  /** 合同ID */
  contractId: number;
  /** 合同编号 */
  contractNo: string;
}

/**
 * 合同状态
 */
export enum EContractStatus {
  /** 未生效 */
  NOT_EFFECTIVE = 1,
  /** 生效中 */
  EFFECTIVE = 2,
  /** 已失效 */
  EXPIRED = 3,
}

/**
 * 合同状态标签
 */
export const contractStatusLabel = {
  [EContractStatus.NOT_EFFECTIVE]: '未生效',
  [EContractStatus.EFFECTIVE]: '生效中',
  [EContractStatus.EXPIRED]: '已失效',
};

/**
 * 合同状态类型映射
 */
export const contractStatusType: Record<number, TagType> = {
  [EContractStatus.NOT_EFFECTIVE]: 'warning',
  [EContractStatus.EFFECTIVE]: 'success',
  [EContractStatus.EXPIRED]: 'danger',
};

/**
 * 签署状态
 */
export enum EContractSignStatus {
  /** 待签署 */
  PENDING = 1,
  /** 已签署 */
  SIGNED = 2,
  /** 已逾期 */
  OVERDUE = 3,
  /** 已拒签 */
  REJECTED = 4,
  /** 已作废 */
  VOID = 5,
  /** 已撤销 */
  REVOKED = 6,
}

/**
 * 签署状态标签
 */
export const contractSignStatusLabel = {
  [EContractSignStatus.PENDING]: '待签署',
  [EContractSignStatus.SIGNED]: '已签署',
  [EContractSignStatus.OVERDUE]: '已逾期',
  [EContractSignStatus.REJECTED]: '已拒签',
  [EContractSignStatus.VOID]: '已作废',
  [EContractSignStatus.REVOKED]: '已撤销',
};

/**
 * 签署方类型
 */
export enum EContractActorType {
  /** 企业 */
  CORP = 'CORP',
  /** 个人 */
  PERSON = 'PERSON',
}

/**
 * 签署方类型标签
 */
export const contractActorTypeLabel = {
  [EContractActorType.CORP]: '企业',
  [EContractActorType.PERSON]: '个人',
};

/**
 * 签署方角色类型
 */
export enum EContractPartyRole {
  /** 甲方 */
  PARTY_A = 'PARTY_A',
  /** 乙方 */
  PARTY_B = 'PARTY_B',
  /** 丙方 */
  PARTY_C = 'PARTY_C',
}

/**
 * 签署方角色类型标签
 */
export const contractPartyRoleLabel = {
  [EContractPartyRole.PARTY_A]: '甲方',
  [EContractPartyRole.PARTY_B]: '乙方',
  [EContractPartyRole.PARTY_C]: '丙方',
};

/**
 * 签署方所属系统类型
 */
export enum EContractSysType {
  /** 运营 */
  OPERATION = 'OPERATION',
  /** 租户 */
  TENANT = 'TENANT',
  /** 卖家(个人) */
  SELLER_PERSON = 'SELLER_PERSON',
  /** 买家(个人) */
  BUYER_PERSON = 'BUYER_PERSON',
  /** 商户 */
  MERCHANT = 'MERCHANT',
  /** 供应链公司 */
  SUPPLY_COMPANY = 'SUPPLY_COMPANY',
}

/**
 * 签署方所属系统类型标签
 */
export const contractSysTypeLabel = {
  [EContractSysType.OPERATION]: '运营',
  [EContractSysType.TENANT]: '租户',
  [EContractSysType.SELLER_PERSON]: '卖家(个人)',
  [EContractSysType.BUYER_PERSON]: '买家(个人)',
  [EContractSysType.MERCHANT]: '商户',
  [EContractSysType.SUPPLY_COMPANY]: '供应链公司',
};

/**
 * 合同字段信息
 */
export interface IContractFieldVO {
  /** 控件名 */
  fieldName: string;
  /** 控件值 */
  fieldValue: string;
}

/**
 * 合同签署方信息
 */
export interface IContractActorVO {
  /** 签署方id */
  id: number;
  /** 签署方名称 */
  name: string;
  /** 签署方手机号 */
  phone: string;
  /** 签署方类型 */
  type: EContractActorType;
  /** 签署方角色类型 */
  partyRole: EContractPartyRole;
  /** 签署方所属系统类型 */
  sysType: EContractSysType;
  /** 签署要求 0:自动签署 1:手动签署(非线下合同使用) */
  autoSign: number;
  /** 签署方字段信息 */
  contractFieldList: IContractFieldVO[];
  /** 签署状态 */
  status: EContractSignStatus;
}

/**
 * 合同详情请求参数
 */
export interface IContractDetailParam {
  /** 合同id */
  id: number;
}

/**
 * 合同详情响应
 */
export interface IContractDetailResponse {
  /** 合同id */
  contractId: number;
  /** 合同编号 */
  contractNo: string;
  /** 合同名称 */
  contractSubject: string;
  /** 合同状态 */
  contractStatus: EContractStatus;
  /** 合同签署开始时间 格式 yyyy-MM-dd HH:mm:ss */
  createTime: string;
  /** 合同签署截止时间 格式 yyyy-MM-dd HH:mm:ss */
  endTime: string;
  /** 合同到期时间 格式 yyyy-MM-dd HH:mm:ss */
  expireTime: string;
  /** 合同签署方 */
  actorVoList: IContractActorVO[];
  /** 合同自定义字段信息 */
  customFieldList: IContractFieldVO[];
  /** 备注 */
  remark: string;
  /** 合同模版id */
  contractTempId: number;
  /** 发起类型 0:线上 1:线下 */
  initiatorType: EContractInitiatorType;
  /** 发起人 */
  initiator: string;
  /** 合同url */
  filePreviewUrl: string;
  /** 合同签署完成时间 格式 yyyy-MM-dd HH:mm:ss */
  finishTime: string;
  /** 收件id */
  busId: string;
}

/**
 * 获取签署方签署链接请求参数
 */
export interface IContractActorSignParam {
  /** 签署方id */
  id: number;
}

/**
 * 撤销合同请求参数
 */
export interface IContractRevokeParam {
  /** 合同id */
  id: number;
  /** 撤销原因 */
  revokeReason: string;
}
