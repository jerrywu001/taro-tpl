import { TagType } from '@nutui/nutui-taro';

export interface IPageParam {
  /** 页码 */
  page: number;
  /** 每页条数 */
  size: number;
}

export enum EStatus {
  /** 启用 */
  ENABLED = 'ENABLED',
  /** 缓冲期 */
  GRACE = 'GRACE',
  /** 停用 */
  DISABLED = 'DISABLED',
}

export const statusLabel = {
  [EStatus.ENABLED]: '启用',
  [EStatus.GRACE]: '缓冲期',
  [EStatus.DISABLED]: '停用',
};

export const statusListLabel = {
  [EStatus.ENABLED]: '已启用',
  [EStatus.GRACE]: '缓冲期',
  [EStatus.DISABLED]: '已停用',
};

export const statusStyle: { [key: string]: TagType } = {
  [EStatus.ENABLED]: 'success',
  [EStatus.GRACE]: 'warning',
  [EStatus.DISABLED]: 'danger',
};

export const GlobalKeys = {
  TokenKey: 'TOKEN_KEY',
  /** 当前登录应用 */
  CurrentClient: 'CurrentClient',
  /** 应用列表 */
  Clients: 'Clients',
  /** 当前店铺 */
  CurrentShop: 'CurrentShop',
  /** 当前员工姓名 */
  StaffName: 'StaffName',
};

export interface IImageData {
  /** 图片id */
  id: number;
  /** 图片url */
  fileUrl: string;
}

export interface ICondition {
  field: string;
  value: any;
  /**
   * 运算符，默认为eq（等于）
   */
  operator?: 'eq' | 'like' | 'gt' | 'lt' | 'gte' | 'lte' | 'in' | 'between';
}

export function toConditional(d: Record<string, any>) {
  const operatorTypes = d.operatorTypes || {};
  const item = JSON.parse(JSON.stringify(d)) as Record<string, any>;
  const obj = JSON.parse(JSON.stringify(item)) as Record<string, any>;
  const conditions = [] as Array<ICondition>;

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (['page', 'size', 'orders'].includes(key) || key === 'operatorTypes') continue;

      const value = obj[key];

      const d = {
        field: key,
        value,
      } as ICondition;

      if (Array.isArray(value)) {
        d.operator = 'between';
      } else {
        d.operator = operatorTypes[key] || undefined;
      }

      conditions.push(d);
    }
  }

  return {
    conditions,
    page: obj.page as number,
    size: obj.size as number,
    orders: obj?.orders?.length ? obj.orders : undefined,
  };
}

export type IOptionItem = {
  label: string;
  value?: string | number;
  disabled?: boolean;
};
