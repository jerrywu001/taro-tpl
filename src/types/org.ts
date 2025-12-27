import { TagType } from '@nutui/nutui-taro';

/**
 * 组织类型枚举
 */
export enum EOrgType {
  /** 全部 */
  ALL = '',
  /** 企业 */
  COMPANY = 'COMPANY',
  /** 部门 */
  DEPARTMENT = 'DEPARTMENT',
  /** 店铺 */
  SHOP = 'SHOP',
  /** 供应商 */
  SUPPLY_COMPANY = 'SUPPLY_COMPANY',
  /** 仓库 */
  WAREHOUSE = 'WAREHOUSE',
}

/**
 * 组织类型标签映射
 */
export const orgTypeLabel = {
  [EOrgType.COMPANY]: '企业',
  [EOrgType.DEPARTMENT]: '部门',
  [EOrgType.SHOP]: '店铺',
  [EOrgType.SUPPLY_COMPANY]: '供应商',
  [EOrgType.WAREHOUSE]: '仓库',
};

/**
 * 组织类型标签颜色映射
 */
export const orgTypeColor: Record<string, TagType> = {
  [EOrgType.COMPANY]: 'primary',
  [EOrgType.DEPARTMENT]: 'default',
  [EOrgType.SHOP]: 'success',
  [EOrgType.SUPPLY_COMPANY]: 'warning',
  [EOrgType.WAREHOUSE]: 'danger',
};

/**
 * 组织状态枚举
 */
export enum EOrgStatus {
  /** 停用 */
  DISABLED = 0,
  /** 启用 */
  ENABLED = 1,
}

/**
 * 组织状态标签映射
 */
export const orgStatusLabel = {
  [EOrgStatus.DISABLED]: '停用',
  [EOrgStatus.ENABLED]: '启用',
};

/**
 * 组织状态标签颜色映射
 */
export const orgStatusColor: Record<number, TagType> = {
  [EOrgStatus.DISABLED]: 'danger',
  [EOrgStatus.ENABLED]: 'success',
};

/**
 * 主仓枚举
 */
export enum EMainWarehouse {
  /** 否 */
  NO = 0,
  /** 是 */
  YES = 1,
}

/**
 * 主仓标签映射
 */
export const mainWarehouseLabel = {
  [EMainWarehouse.NO]: '否',
  [EMainWarehouse.YES]: '是',
};

/**
 * 组织信息
 */
export interface IOrgInfo {
  /** 组织id */
  id: number;
  /** 全路径 */
  allPath: string;
  /** 父级id */
  parentId: number;
  /** 上级组织名称 */
  orgParentName: string;
  /** 层级 */
  level: number;
  /** 编码 */
  code: string;
  /** 类型：COMPANY、DEPARTMENT、SHOP、SUPPLY_COMPANY、WAREHOUSE */
  type: string;
  /** 组织名称 */
  orgName: string;
  /** 负责人id */
  staffId: number;
  /** 负责人名称 */
  staffName: string;
  /** 备注 */
  remark: string;
  /** 状态 0:停用 1:启用 */
  status: EOrgStatus;
  /** 排序 */
  sort: number;
  /**
   * 是否为主仓 0:否 1:是
   * @description {@link EMainWarehouse}
   */
  mainWareHouse: EMainWarehouse;
}
