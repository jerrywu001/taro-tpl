import { EContractBusinessType, EContractTemplateType, EContractPartyRole } from '../contract';

/**
 * 模版填充状态
 */
export enum EContractFillStatus {
  /** 未填充 */
  NotFill = 'NOT_FILL',
  /** 已填充 */
  HasFill = 'HAS_FILL',
}

/**
 * 模版填充状态标签
 */
export const contractFillStatusLabel = {
  [EContractFillStatus.NotFill]: '未填充',
  [EContractFillStatus.HasFill]: '已填充',
};

/**
 * 模版启停状态
 */
export enum EContractEnableStatus {
  /** 启用 */
  Enable = 'ENABLE',
  /** 停用 */
  Close = 'CLOSE',
}

/**
 * 模版启停状态标签
 */
export const contractEnableStatusLabel = {
  [EContractEnableStatus.Enable]: '启用',
  [EContractEnableStatus.Close]: '停用',
};

/**
 * 签署方类型
 */
export enum EContractActorType {
  /** 企业 */
  Corp = 'CORP',
  /** 个人 */
  Person = 'PERSON',
}

/**
 * 签署方类型标签
 */
export const contractActorTypeLabel = {
  [EContractActorType.Corp]: '企业',
  [EContractActorType.Person]: '个人',
};

/**
 * 签署方所属系统类型
 */
export enum EContractActorSystemType {
  /** 运营 */
  Operation = 'OPERATION',
  /** 租户 */
  Tenant = 'TENANT',
  /** 卖家（个人） */
  SellerPerson = 'SELLER_PERSON',
  /** 买家（个人） */
  BuyerPerson = 'BUYER_PERSON',
  /** 商户 */
  Merchant = 'MERCHANT',
  /** 供应链公司 */
  SupplyCompany = 'SUPPLY_COMPANY',
}

/**
 * 签署方所属系统类型标签
 */
export const contractActorSystemTypeLabel = {
  [EContractActorSystemType.Operation]: '运营',
  [EContractActorSystemType.Tenant]: '租户',
  [EContractActorSystemType.SellerPerson]: '卖家',
  [EContractActorSystemType.BuyerPerson]: '买家',
  [EContractActorSystemType.Merchant]: '商户',
  [EContractActorSystemType.SupplyCompany]: '供应链公司',
};

/**
 * 关键词盖章策略
 */
export enum EKeywordStrategy {
  /** 全部关键词盖章 */
  All = 0,
  /** 第一关键词盖章 */
  First = 1,
  /** 最后关键词盖章 */
  Last = 2,
}

/**
 * 骑缝章配置
 */
export enum EPagingSeal {
  /** 不需要 */
  No = 0,
  /** 需要 */
  Yes = 1,
}

/**
 * 根据收件ID查询合同配置请求参数
 */
export interface IReceiveContractInfoParam {
  /** 收件单ID */
  id: number;
}

/**
 * 未匹配的签署方字段
 */
export interface IContractUnmatchedField {
  /** 控件名(配置的表单名) */
  fieldName: string;
  /** 控件编码(自定义且唯一) */
  fieldCode: string;
  /** 控件值 */
  fieldValue: string;
  /** display 0:不显示 1:显示 */
  display: number;
}

/**
 * 签署方匹配字段
 */
export interface IContractMatchField {
  /** 控件名(配置的表单名) */
  fieldName: string;
  /** 控件编码(自定义且唯一) */
  fieldCode: string;
  /** 系统字段英文名 */
  fieldSystemEn: string;
  /** 系统字段中文名 */
  fieldSystemZh: string;
  /** 发起合同时是否展示 0:否 1:是 */
  display: number;
}

/**
 * 签署方配置
 */
export interface IContractActorConfig {
  /** 模版签署方配置ID */
  id: number;
  /** 合同模版表ID */
  contractTempId: number;
  /** 签署方类型 */
  type: EContractActorType;
  /** 签署方角色类型 */
  partyRole: EContractPartyRole;
  /** 签署方所属系统类型 */
  sysType: EContractActorSystemType;
  /** 签章关键词 */
  keyWord: string;
  /** 签章位置策略 */
  keywordStrategy: EKeywordStrategy;
  /** 是否需要骑缝章 */
  pagingSeal: EPagingSeal;
  /** 签署方配置的合同字段 */
  matchField: IContractMatchField[];
}

/**
 * 合同模版详情
 */
export interface IContractTemplateDetail {
  /** 模版ID */
  id: number;
  /** 模版编号 */
  tempNo: string;
  /** 模版名称 */
  tempName: string;
  /** 模版类型 */
  tempType: EContractTemplateType;
  /** 模版业务类型 */
  businessType: EContractBusinessType;
  /** 模版填充状态 */
  fillStatus: EContractFillStatus;
  /** 模版启停状态 */
  enable: EContractEnableStatus;
  /** 模版URL */
  tempUrl: string;
  /** 未匹配签署方字段信息 */
  unMatchedFieldList: IContractUnmatchedField[];
  /** 模版签署方配置信息 */
  actorConfigList: IContractActorConfig[];
}

/**
 * 合同会员信息
 */
export interface IContractMemberDTO {
  /** 会员主键ID */
  id: number;
  /** 会员昵称 */
  memberName: string;
  /** 会员真实姓名 */
  name: string;
  /** 会员性别 0:男 1:女 */
  sex: number;
  /** 身份证号 */
  idNo: string;
  /** 手机号 */
  phone: string;
  /** 支付手机号 */
  payPhone: string;

  /** 邮箱 */
  email: string;
  /** 头像 */
  avatar: string;
  /** 开户银行 */
  bankName: string;
  /** 开户行编号 */
  bankCode: string;
  /** 开户支行 */
  bankBranch: string;
  /** 开户支行编号 */
  bankBranchCode: string;
  /** 银行账号 */
  bankAccount: string;
  /** 实名状态 */
  authStatus: number;
}

/**
 * 收件合同信息
 */
/**
 * 收件合同信息
 */
export interface IReceiveContractInfo {
  /** 收件单id */
  receiveId: number;
  /** 是否已创建合同 */
  hasCreate: boolean;
  /** 合同ID */
  contractId: number;
  /** 合同模版详情 */
  contractTempDetailVO: IContractTemplateDetail | null;
  /** 收件相关合同模版列表 */
  contractTempDetailVOList: IContractTemplateDetail[];
  /** 会员信息 */
  memberDTO: IContractMemberDTO | null;
  /** 供应链公司名称 */
  supplyCompanyName: string;
  /** 供应链公司负责人手机号 */
  supplyCompanyPhone: string;
  /** 供应链公司负责人脱敏手机号 */
  supplyCompanyPhoneMask: string;
  /** 供应链公司Id */
  supplyCompanyId: string;
  /** 动态表格 */
  dynamicTableConfigList: any[];
  /** 商户名称 */
  merchantName: string;
  /** 商户手机号 */
  merchantPhone: string;
  /** 商户Id */
  merchantId: string;

}

/**
 * 收件合同列表项
 */
export interface IReceiveContractListItem {
  /** 合同id */
  contractId: number;
  /** 合同编号 */
  contractNo: string;
  /** 合同名称 */
  contractSubject: string;
  /** 合同预览地址 */
  filePreviewUrl: string;
  /** 合同签署完成时间 */
  finishTime: string;
}

