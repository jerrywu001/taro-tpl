import { IDynamicComponent } from '@/components/dynamic';

/**
 * 公价品牌信息
 */
export interface IOfficialPriceBrand {
  /** 品牌ID */
  id: number;
  /** 品牌展示名，示例：AUDEMARS PIGUET/爱彼 */
  name: string;
  /** 品牌英文名 */
  nameEn: string;
  /** 品牌中文名 */
  nameZh: string;
  /** 品牌Logo */
  logo: string;
  /** 首字母，A~Z 或 # */
  firstLetter: string;
}

/**
 * 按首字母分组的品牌
 */
export interface IOfficialPriceBrandGroup {
  /** 分组标题（首字母 A~Z 或 #） */
  title: string;
  /**
   * 品牌列表
   * @description {@link IOfficialPriceBrand}
   */
  list: IOfficialPriceBrand[];
}

/**
 * 类目路径节点
 */
export interface ICategoryPathNodeVO {
  /** 类目ID */
  id: number;
  /** 类目名称 */
  name: string;
}

/**
 * 类目搜索项
 */
export interface ICategorySearchItemVO {
  /** 命中类目ID */
  id: number;
  /** 命中类目名称 */
  name: string;
  /** 完整路径文本（用于右侧展示） */
  pathText: string;
  /** 排序 */
  sortOrder: number;
  /**
   * 完整路径链（用于前端需要 id+name 的 List 展示）
   * @description {@link ICategoryPathNodeVO}
   */
  path: ICategoryPathNodeVO[];
}

/**
 * 系列 DTO
 */
export interface ISeriesDTO {
  /** 主键ID */
  id: number;
  /** 系列名称 */
  name: string;
  /** 系列别名 */
  alias?: string;
  /** 系列描述 */
  description?: string;
  /** 系列Logo URL */
  logoUrl?: string;
  /** 归属品牌ID */
  brandId: number;
  /** 归属品牌名称 */
  brandName?: string;
  /** 启用状态 (ENABLED / DISABLED) */
  status?: string;
  /** 关联叶子类目数量 */
  leafCategoryCounts?: number;
  /** 关联品牌数量 */
  brandCounts?: number;
  /** 创建时间 */
  createTime?: string;
  /** 最后更新时间 */
  updateTime?: string;
  /** 创建人 */
  creator?: string;
  /** 最后操作者 */
  updater?: string;
}

/**
 * 型号 DTO
 */
export interface IModelDTO {
  /** 主键ID */
  id: number;
  /** 型号名称 */
  name: string;
  /** 归属品牌ID */
  brandId: number;
  /** 归属品牌名称 */
  brandName?: string;
  /** 归属系列ID */
  seriesId: number;
  /** 归属系列名称 */
  seriesName?: string;
  /** 启用状态 (ENABLED / DISABLED) */
  status?: string;
  /** 关联叶子类目数量 */
  leafCategoryCounts?: number;
  /** 关联品牌数量 */
  brandCounts?: number;
  /** 创建时间 */
  createTime?: string;
  /** 最后更新时间 */
  updateTime?: string;
  /** 创建人 */
  creator?: string;
  /** 最后操作者 */
  updater?: string;
}

/**
 * 公价商品搜索请求参数
 */
export interface IOfficialPriceProductCommonSearchReq {
  /** 页码，从 1 开始 */
  page: number;
  /** 每页条数，最大值为 1000 */
  size: number;
  /** 品牌ID，存在则精确匹配 */
  brandId?: number;
  /** 系列ID，存在则精确匹配 */
  seriesIds?: number[];
  /** 型号ID，存在则精确匹配 */
  modelIds?: number[];
  /** 叶子类目ID，存在则精确匹配 */
  leafCategoryIds?: number[];
  /** 品牌名称，模糊匹配 */
  brandName?: string;
  /** 系列名称，模糊匹配 */
  seriesName?: string;
  /** 型号名称，模糊匹配 */
  modelName?: string;
  /** 关键字，模糊匹配标题/品牌/系列/型号 */
  keyword?: string;
}

/**
 * 选项DTO
 */
export interface IOptionDTO { // TODOW: 废弃
  /** 选项标签（展示名） */
  label: string;
  /** 选项值（前端提交时使用） */
  value: string;
  /** 状态标识，0=普通，1=默认选中/推荐 */
  status: number;
}

/**
 * 组件动态字段DTO
 */
export interface IComponentDTO { // TODOW: 废弃
  /** 主键 */
  id: number;
  /** 叶子类目 Id */
  leafId: number;
  /** 唯一键（通常是属性编码或ID） */
  key: string;
  /** 属性类型,可用值:CORE,SALES,DESC */
  attrType: string;
  /** 组件类型，例如 TEXT_SHORT / NUMBER / SELECT_SINGLE / ENUM_RADIO / IMAGE_UPLOAD_FREE */
  componentType: string;
  /** 字段展示名（用于表单显示） */
  label: string;
  /** 占位提示或帮助文案 */
  description?: string;
  /** 是否必填 */
  required: boolean;
  /** 是否可见（默认 true） */
  visible: boolean;
  /** 状态标识，0启用 1停用 2值变更 */
  status: number;
  /** 默认值，可能是字符串、数字、数组（多选）或图片URL列表 */
  value?: any;
  /**
   * 选项列表，仅当组件类型为枚举/下拉/多选等类型时返回
   * @description {@link IOptionDTO}
   */
  options?: IOptionDTO[];
}

/**
 * 公价商品VO
 */
export interface IOfficialPriceProductCommonVO {
  /** 公价商品ID */
  id: number;
  /** 公价商品编码 */
  productCode: string;
  /** 标题 */
  title: string;
  /** 品牌中文名 */
  brandName: string;
  /** 品牌英文名 */
  brandNameEn: string;
  /** 系列名称 */
  seriesName: string;
  /** 型号名称 */
  modelName: string;
  /** 缩略图 */
  thumbnail: string;
  /** 官方指导价，可为空 */
  guidePrice?: number;
  /**
   * 动态字段集合
   * @description {@link IDynamicComponent}
   */
  dynamicFields?: IDynamicComponent[];
}

/**
 * 分页结果
 */
export interface IPageResultOfficialPriceProductCommonVO {
  /**
   * 数据
   * @description {@link IOfficialPriceProductCommonVO}
   */
  data: IOfficialPriceProductCommonVO[];
  /** 总量 */
  total: number;
}

/**
 * 公价商品详情DTO
 */
export interface IOfficialPriceProductDTO {
  /** 主键，存在则视为编辑 */
  id: string;
  /** 叶子类目ID */
  leafCategoryId: number;
  /** 商品编码 */
  productCode: string;
  /** 标题 */
  title: string;
  /** 状态 */
  status: number;
  /** 表单schema哈希 */
  formSchemaHash?: string;
  /** 品牌id */
  brandId: number;
  /** 品牌中文名称 */
  brandName: string;
  /** 品牌英文名称 */
  brandNameEn: string;
  /** 系列id */
  seriesId: number;
  /** 系列名称 */
  seriesName: string;
  /** 型号id */
  modelId: number;
  /** 型号名称 */
  modelName: string;
  /**
   * 动态字段集合
   * @description {@link IDynamicComponent}
   */
  dynamicFields?: IDynamicComponent[];
}

/**
 * 系列分页查询结果
 */
export interface IPageResultSeriesDTO {
  /**
   * 数据
   * @description {@link ISeriesDTO}
   */
  data: ISeriesDTO[];
  /** 总量 */
  total: number;
}

/**
 * 型号分页查询结果
 */
export interface IPageResultModelDTO {
  /**
   * 数据
   * @description {@link IModelDTO}
   */
  data: IModelDTO[];
  /** 总量 */
  total: number;
}
