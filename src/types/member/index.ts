import { TagType } from '@nutui/nutui-taro';
import { IPageParam } from '../common';

/**
 * 会员&bank信息
 */
export interface IMemberAndBank {
  /** 会员主键id */
  id: number;
  /** 会员名称 */
  memberName: string;
  /** 收款人名称 */
  name?: string;
  /** 手机号 */
  phone: string;
  /** 收款人手机号 */
  payPhone?: string;
  /** 真实手机号 */
  realPhone?: string;
  /** 头像 */
  avatar: string;
  /** 会员性别 0:男 1:女 */
  sex: number;
  /** 身份证号 */
  idNo: string;
  /** 邮箱 */
  email: string;
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

  /** 实名状态: 0-未实名, 1-已实名 */
  authStatus: 0 | 1;
  /** bank cards */
  bankCards?: IMemberBankCard[];
}

export interface ISystemMember {
  /** 会员主键id */
  id: number;
  /** 会员名称 */
  memberName: string;
  /** 会员编号 */
  code: string;
  /** 手机号 */
  phone: string;
  /** 头像 */
  avatar: string;
  /** 会员性别 0:男 1:女 */
  sex: number;
  /** 出生日期 */
  birthDate?: string;
  /** 身份证号 */
  idNo?: string;
}

export interface IMemberQueryParam extends IPageParam {
  /** 会员名称或手机号 */
  key?: string;
  /** 是否卖货 0:否 1:是 */
  seller?: 0 | 1;
}

/**
 * 会员基础信息
 */
export interface IMemberBase {
  id?: number;
  /** 会员名称 */
  memberName: string;
  /** 手机号 */
  phone: string;
  /** 邮箱 */
  email?: string;
  /** 头像 */
  avatar?: string | string[];
  /** 性别 0:男 1:女 */
  sex: 0 | 1;
  /** 店铺ID */
  shopId?: number;
  /** 生日 */
  birthDate?: string;
  /** 状态 0:停用 1:启用 */
  status: 0 | 1;
  /** 是否卖货 0:否 1:是 */
  seller: 0 | 1;
  /** 备注 */
  remark?: string;
}

/**
 * 会员收款信息
 */
export interface IMemberReceipt {
  /** 个人姓名 */
  name: string;
  /** 身份证号 */
  idNo: string;
  /** 支付手机号 */
  phone: string;
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

  /** 前端渲染用 开户银行 （不要提交该字段） */
  masterBank?: {
    bankCode: string;
    bankName: string;
  };
  /** 前端渲染用 开户支行 （不要提交该字段） */
  branchBank?: {
    bankCode?: string;
    bankBranchCode: string;
    bankBranch: string;
  };
}

/**
 * 会员详情
 */
export interface IMemberDetail {
  /** 基础信息 */
  base: IMemberBase & {
    /** 会员编号 */
    code?: string;
    /** 店铺名称 */
    shopName?: string;
  };
  /**
   * 认证信息
   * @description {@link EMemberCertStatus}
   */
  certification: IMemberCert;
  /**
   * 银行账号列表
   * @description {@link IMemberBankCard}
   */
  bankCards?: IMemberBankCard[];
}

export interface IMemberCert {
  /** 真实姓名 */
  realName: string;
  /** 身份证号 */
  idNo: string;
  /** 身份证地址 */
  idCardAddress: string;
  /** 身份证有效期 */
  idCardValidDate: string;
  /** 真实手机号 */
  realPhone: string;
  /** 身份证正面图片 */
  idCardFrontImage: string;
  /** 身份证反面图片 */
  idCardBackImage: string;
  /**
   * 认证状态
   * @description {@link EMemberCertStatus}
   */
  certificationStatus: EMemberCertStatus;
  /** 认证时间 */
  certificationTime: string;
}

export enum EMemberCertStatus {
  /** 未认证 */
  NOT_CERTIFIED = 'NOT_CERTIFIED',
  /** 已认证 */
  CERTIFIED = 'CERTIFIED',
  /** 认证失败 */
  CERTIFICATION_FAILED = 'CERTIFICATION_FAILED',
}

export const memberCertStyle: { [key: string]: TagType } = {
  [EMemberCertStatus.NOT_CERTIFIED]: 'warning',
  [EMemberCertStatus.CERTIFIED]: 'success',
  [EMemberCertStatus.CERTIFICATION_FAILED]: 'danger',
};

export const memberCertLabel = {
  [EMemberCertStatus.NOT_CERTIFIED]: '待实名',
  [EMemberCertStatus.CERTIFIED]: '已实名',
  [EMemberCertStatus.CERTIFICATION_FAILED]: '实名失败',
};

export interface IMemberBankCard {
  /** 银行卡ID */
  id: number;
  /** 持卡人姓名 */
  name: string;
  /** 身份证号 */
  idNo: string;
  /** 手机号 */
  phone: string;
  /** 开户银行 */
  bankName: string;
  /** 开户行编号 */
  bankCode: string;
  /** 开户行编号 */
  bankBranch: string;
  /** 开户支行编号 */
  bankBranchCode: string;
  /** 银行账号 */
  bankAccount: string;

  /** 状态(0:停用, 1:启用) */
  status?: 0 | 1;
  /** 分配金额（结算/付款单使用） */
  amount?: number;
}

export type IMemberBankCardAddParam = Omit<IMemberBankCard, 'id' | 'status'> & { memberId: number };

/**
 * 新增会员参数
 */
export interface IMemberAddParam {
  /**
   * 基础信息
   * @description {@link IMemberBase}
   */
  base: IMemberBase;
}

/**
 * 编辑会员参数
 */
export interface IMemberUpdateParam {
  /** 会员ID */
  id: number;
  /**
   * 基础信息
   * @description {@link IMemberBase}
   */
  base: IMemberBase;
}

/**
 * 会员实名认证参数
 */
export interface IMemberCertParam {
  /** 会员ID */
  memberId: number;
  /** 真实姓名 */
  realName: string;
  /** 身份证号 */
  idNo: string;
  /** 身份证地址 */
  idCardAddress: string;
  /** 身份证有效期 */
  idCardValidDate: string;
  /** 真实手机号 */
  realPhone?: string;
  /** 身份证正面图片 */
  idCardFrontImage: string;
  /** 身份证反面图片 */
  idCardBackImage: string;
}
