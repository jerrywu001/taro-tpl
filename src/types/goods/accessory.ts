import { EStatus } from '../common';

export interface IAccessoryItem {
  /**  */
  id: string;
  /** 配件类型 */
  type: EAccessoryType;
  /** 配件名称 */
  name: string;
  /** 关联叶子类目ID */
  leafCategoryId: number;
  /** 关联叶子类目名称 s*/
  leafCategoryName: string;
  /** 叶子类目节点数量 */
  leafCategoryCounts: number;
  /** 关联品牌数量 */
  brandCounts: number;
  /** 状态 枚举：ENABLED/GRACE/DISABLED */
  status: EStatus;
  /** 创建时间 */
  createTime: string;
  /** 更新时间 */
  updateTime: string;
  /** 创建人 */
  creator: string;
  /** 更新人 */
  updater: string;
  /** 可售叶子类目ID列表	 */
  leafCategoryIds: number[];

  [key: string]: any;
}

export enum EAccessoryType {
  /** 原装 */
  OEM = 'OEM',
  /** 非原装 */
  AFTERMARKET = 'AFTERMARKET',
}

export const accessoryTypeLabel = {
  [EAccessoryType.OEM]: '原装',
  [EAccessoryType.AFTERMARKET]: '非原装',
};
