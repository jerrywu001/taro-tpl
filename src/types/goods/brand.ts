import { EStatus } from '../common';

export interface IBrandItem {
  /**  */
  id: string;
  /** 品牌名称 */
  nameZh: string;
  /** 品牌英文名 */
  nameEn?: string;
  /** 品牌显示名 */
  showName: string;
  /** 品牌定位 */
  positioning: EBrandPositioning;
  /** 品牌logo */
  logoUrl: string;
  /** 品牌故事 */
  story: string;
  /** 品牌故事图 */
  storyImageUrl: string;
  /** 品牌原产国 */
  originCountry: string;
  /** 状态 枚举：ENABLED/GRACE/DISABLED */
  status: EStatus;
  /** 关联叶子类目数量 */
  leafCategoryCounts: number;
  /** 创建时间 */
  createTime: string;
  /** 更新时间 */
  updateTime: string;
  /** 创建人 */
  creator: string;
  /** 更新人 */
  updater: string;
  /** 可售叶子类目ID列表 */
  leafCategoryIds?: number[];
}

export enum EBrandPositioning {
  /** 轻奢 */
  LIGHT_LUXURY = 'LIGHT_LUXURY',
  /** 高奢 */
  HIGH_LUXURY = 'HIGH_LUXURY',
  /** 重奢 */
  ULTRA_LUXURY = 'ULTRA_LUXURY',
  /** 潮奢 */
  TREND_LUXURY = 'TREND_LUXURY',
}

export const brandPositioningLabel = {
  [EBrandPositioning.LIGHT_LUXURY]: '轻奢',
  [EBrandPositioning.HIGH_LUXURY]: '高奢',
  [EBrandPositioning.ULTRA_LUXURY]: '重奢',
  [EBrandPositioning.TREND_LUXURY]: '潮奢',
};
