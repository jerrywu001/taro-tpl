import { EStatus } from '../common';

export interface IModelItem {
  /**  */
  id: string;
  /** 型号名称 */
  name: string;
  /** 归属品牌ID */
  brandId: number;
  /** 归属品牌名称 */
  brandName: string;
  /** 归属系列 */
  seriesId?: number;
  /** 归属系列名称	 */
  seriesName: string;
  /** 状态 枚举：ENABLED/GRACE/DISABLED */
  status: EStatus;
  /** 叶子类目节点数量 */
  leafCategoryCounts: number;
  /** 关联品牌数量 */
  brandCounts: number;
  /** 创建时间 */
  createTime: string;
  /** 更新时间 */
  updateTime: string;
  /** 创建人 */
  creator: string;
  /** 更新人 */
  updater: string;
}
