import { EStatus } from '../common';

export interface IQualityItem {
  /**  */
  id: string;
  /** 成色值 */
  name: string;
  /** 成色说明 */
  description: string;
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
  /** 评分 */
  score: number;
}
