/**
 * 库存状态枚举
 */
export enum InventoryStatus {
  /** 上架 */
  ON_SHELF = 'ON_SHELF',
  /** 下架 */
  OFF_SHELF = 'OFF_SHELF',
  /** 锁定 */
  LOCKED = 'LOCKED',
  /** 已售 */
  SOLD = 'SOLD',
}

/**
 * 排序方向
 */
export enum OrderDirection {
  /** 正序 */
  ASC = 'ASC',
  /** 倒序 */
  DESC = 'DESC',
}

/**
 * 查询条件
 */
export interface Condition {
  /** 字段 */
  field: string;
  /** 操作符 */
  operator: string;
  /** 值 */
  value: any;
}

/**
 * 排序条件
 */
export interface Order {
  /** 排序字段 */
  orderBy: string;
  /** 倒序/正序 */
  order: OrderDirection;
}

/**
 * 库存列表项（完整版）
 */
export interface IInventoryItem {
  /** 主键ID */
  id: number;
  /** 租户ID */
  tenantId?: number;
  /** 唯一码 */
  uniqueCode: string;
  /** SPU ID */
  spuId?: number;
  /** SKU ID */
  skuId?: number;
  /** 品牌ID */
  brandId?: number;
  /** 品牌名称 */
  brandName: string;
  /** 类目ID（保留字段） */
  categoryId?: number;
  /** 叶子类目ID */
  leafCategoryId?: number;
  /** 类目路径快照，例如：箱包>女包>单肩包 */
  leafCategoryPath?: string;
  /** 仓库ID */
  warehouseId?: number;
  /** 仓库名称 */
  warehouseName?: string;
  /** SPU标题快照 */
  spuTitle?: string;
  /** 封面图URL */
  coverImageUrl: string;
  /** 成色ID */
  conditionId?: number;
  /** 成色名称快照 */
  conditionName: string;
  /** 配件ID数组JSON */
  accessoryIdsJson?: string;
  /** 配件名称拼接快照 */
  accessoryName?: string;
  /** 库存状态：ON_SHELF=上架，OFF_SHELF=下架，LOCKED=锁定，SOLD=已售 */
  status: InventoryStatus | string;
  /** 结算价 */
  settlePrice?: number;
  /** 成本价 */
  costPrice?: number;
  /** 销售价 */
  salePrice?: number;
  /** 公价 */
  marketPrice?: number;
  /** 入库时间 */
  inboundTime?: string;
  /** 上架时间 */
  shelfTime?: string;
  /** 售出时间 */
  soldTime?: string;

  // 兼容旧字段
  /** 图片列表 */
  picUrl?: string;
  /** 商品标题 */
  productName?: string;
  /** 商品类目名 */
  categoryName?: string;
}

/**
 * 库存列表查询参数（简单版）
 */
export interface IInventoryListParam {
  /** 商品名称 */
  productName?: string;
}

/**
 * 库存分页查询参数
 */
export interface InventoryItemQueryDTO {
  /** 页码，从 1 开始 */
  page: number;
  /** 每页条数，最大值为 1000 */
  size: number;
  /** 条件 */
  conditions?: Condition[];
  /** 排序条件 */
  orders?: Order[];
  /** 通用字段 */
  commonField?: string;
  /** 库存状态：ON_SHELF=上架，OFF_SHELF=下架，LOCKED=锁定，SOLD=已售 */
  status?: InventoryStatus | string;
  /** 类目 Id */
  categoryId?: number[];
  /** 品牌 Id */
  brandId?: number[];
  /** 成色 Id */
  conditionId?: number;
  /** 配件 Id */
  accessoryId?: number;
  /** 结算价开始 */
  settlePriceStart?: number;
  /** 结算价结束 */
  settlePriceEnd?: number;
  /** 成本价开始 */
  costPriceStart?: number;
  /** 成本价结束 */
  costPriceEnd?: number;
  /** 销售价开始 */
  salePriceStart?: number;
  /** 销售价结束 */
  salePriceEnd?: number;
  /** 入库时间开始 */
  inboundTimeStart?: string;
  /** 入库时间结束 */
  inboundTimeEnd?: string;
}

/**
 * 分页结果
 */
export interface PageResultInventoryItemDTO {
  /** 数据 */
  data: IInventoryItem[];
  /** 总量 */
  total: number;
}

/**
 * 商品上下架参数
 */
export interface InventoryShelfDTO { inventoryIdList: number[] }

