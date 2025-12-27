import { isNull } from '@/utils';

export const ArrayComponentTypes = [
  'IMAGE_UPLOAD',
  'IMAGE_UPLOAD_FREE',
  'ENUM_CHECKBOX',
  'SELECT_MULTI',
  'SELECT_MULTI_CUSTOM',
] as ComponentType[];

export const DynamicTipPrefix = {
  TEXT_LONG: '请输入',
  TEXT_SHORT: '请输入',
  TEXTAREA: '请输入',
  NUMBER: '请输入',
  IMAGE_UPLOAD: '请上传',
  IMAGE_UPLOAD_FREE: '请上传',
  DATE_PICKER: '请选择',
  AREA_PICKER: '请选择',
};

export type ComponentType =
  | 'TEXT_LONG'
  | 'TEXT_SHORT'
  | 'TEXTAREA'
  | 'NUMBER'
  | 'ENUM_RADIO'
  | 'SELECT_SINGLE'
  | 'SELECT_SINGLE_CUSTOM'
  | 'ENUM_CHECKBOX'
  | 'SELECT_MULTI'
  | 'SELECT_MULTI_CUSTOM'
  | 'IMAGE_UPLOAD'
  | 'IMAGE_UPLOAD_FREE'
  | 'BRAND_MODEL_SERIES_PICKER'
  | 'ACCESSORY_SELECT_SINGLE'
  | 'CONDITION_SELECT_SINGLE'
  | 'MASTER_BANK_SELECT'
  | 'BRANCH_BANK_SELECT'
  | 'DATE_PICKER'
  | 'AREA_PICKER';

export const asyncOptionsComponentTypes = [
  'ACCESSORY_SELECT_SINGLE',
  'CONDITION_SELECT_SINGLE',
] as ComponentType[];

export interface IDynamicComponent {
  /**
   * 属性keyname
   * @description 新建属性的时候，由后端动态生成
   */
  key: string;
  /**
   * 组件类型
   * ```bash
   * TEXT_LONG 长文本
   * TEXT_SHORT 短文本
   * TEXTAREA 多行文本
   * NUMBER 数字
   * ENUM_RADIO 单选
   * SELECT_SINGLE 下拉单选
   * SELECT_SINGLE_CUSTOM 自定义下拉单选
   * ENUM_CHECKBOX 多选
   * SELECT_MULTI 下拉多选
   * SELECT_MULTI_CUSTOM 自定义下拉多选
   * IMAGE_UPLOAD 图片上传
   * IMAGE_UPLOAD_FREE 图片上传（无限制）
   * BRAND_MODEL_SERIES_PICKER 品牌-型号-系列选择器
   * ACCESSORY_SELECT_SINGLE 配件下拉单选
   * CONDITION_SELECT_SINGLE 成色下拉单选
   * MASTER_BANK_SELECT 总行下拉单选
   * BRANCH_BANK_SELECT 支行下拉单选
   * DATE_PICKER 日期选择器
   * AREA_PICKER 区域选择器
   * ```
   */
  componentType: ComponentType;
  /**
   * 选项列表
   * @description 组件类型为单选，多选，下拉， 配件下拉， 成色下拉时必要
   */
  options?: Array<{
    /** 选项名称 */
    label: string;
    /** 选项值 */
    value: string | number;
    /** 选项状态 1：停用 0：启用 */
    status: 1 | 0;
  }>;
  /**
   * 属性值
   * @description {@link IDynamicValues}
   */
  value?: IDynamicValues;
  /** 组件状态 1：停用 0：启用 2：值变更 */
  status: 1 | 0 | 2;
  /** 属性名称 */
  label: string;
  /** 有就优先取，否则拼接label */
  placeholder?: string;
  /** 属性别名 */
  aliasLabel?: string;
  /** 属性类型: 核心属性，销售属性，描述属性 */
  propType?: string;
  /** 是否必填 */
  required?: boolean;
  /** 是否前台展示 */
  visible?: boolean;
  /** 是否标签字段 */
  isTag?: boolean;
  /** 属性描述 */
  description?: string;
  /** 叶子类目 Id */
  leafId?: number;

  // 以下是前端的属性
  /** 属性类型,可用值:CORE,SALES,DESC */
  attrType?: string;
  /** 展示值（详情模式用） */
  displayValue?: string;

  /**
   * input maxlength
   * @default 60
   */
  maxlength?: number;
  /**
   * 图片上传张数限制
   * @default 10
   */
  limit?: number;
  /** 图片上传格式：image/jpeg,image/png,image/jpg */
  accept?: string;
  /**
   * 图片上传最大文件大小（单位：mb）
   * @default 3
   */
  maxFileSize?: number;
  /**
   * 图片上传比例限制
   * @default undefined
   * @description 1:1比例或者3:4 -> [1, 0.75]
   */
  aspectRatio?: Array<number>;
  /**
   * 图片上传最小宽度
   * @default undefined
   */
  minWidth?: number;

  /** 是否开启搜索 */
  enableSearch?: boolean;
  /** 是否隐藏已停用选项的提示 */
  hideDisabledTip?: boolean;
  /** 字段提示 */
  fieldTips?: Record<string, string>;
}

export interface IDynamicPicker {
  label: string;
  value: string | number;
  [key: string]: any;
}

export type IDynamicValues = boolean | string | number | string[] | number[] | Record<string, any>;

/**
 * 解析动态组件的默认配置
 * @link https://confluence.zuirenli.cn/pages/viewpage.action?pageId=25559140
 * @param items 动态组件列表
 * @returns 解析后的动态组件列表
 */
export function resolveBynamicDefaultConfigs(items: IDynamicComponent[]) {
  let rs = JSON.parse(JSON.stringify(items)) as IDynamicComponent[];

  for (const v of rs) {
    const type = v.componentType;

    if (type === 'TEXT_LONG') {
      v.maxlength = isNull(v.maxlength) ? 60 : v.maxlength;
    }

    if (type === 'TEXT_SHORT') {
      v.maxlength = isNull(v.maxlength) ? 24 : v.maxlength;
    }

    if (type === 'TEXTAREA') {
      v.maxlength = isNull(v.maxlength) ? 500 : v.maxlength;
    }

    if (type === 'NUMBER') {
      v.maxlength = isNull(v.maxlength) ? 60 : v.maxlength;
    }

    if (type === 'IMAGE_UPLOAD') {
      v.limit = isNull(v.limit) ? 10 : v.limit;
      v.maxFileSize = isNull(v.maxFileSize) ? 5 : v.maxFileSize;
      v.aspectRatio = [1, 0.75];
      v.minWidth = isNull(v.minWidth) ? 750 : v.minWidth;
      v.accept = 'image/jpeg,image/png,image/jpg';
    }

    if (type === 'IMAGE_UPLOAD_FREE') {
      v.limit = isNull(v.limit) ? 10 : v.limit;
      v.maxFileSize = isNull(v.maxFileSize) ? 5 : v.maxFileSize;
      v.accept = 'image/jpeg,image/png,image/jpg';
    }
  }

  return rs;
}

export * from './component-map';
export { default as DynamicContainer } from './DynamicContainer.vue';

export interface IDynamicError {
  prop: string;
  message: string;
}

export function getDynamicFromParams({
  basicInfoValues,
  priceInfoValues,
  imagesInfoValues,
  basicItems,
  priceItems,
  imagesItems,
}: {
  basicItems: IDynamicComponent[];
  priceItems: IDynamicComponent[];
  imagesItems: IDynamicComponent[];
  basicInfoValues: Record<string, IDynamicValues>;
  priceInfoValues: Record<string, IDynamicValues>;
  imagesInfoValues: Record<string, IDynamicValues>;
}) {
  const params = {
    baseFields: [] as IDynamicComponent[],
    priceFields: [] as IDynamicComponent[],
    imageFields: [] as IDynamicComponent[],
  };

  const baseFields: IDynamicComponent[] = [...basicItems];
  const priceFields: IDynamicComponent[] = [...priceItems];
  const imagesFields: IDynamicComponent[] = [...imagesItems];

  for (const v of baseFields) {
    params.baseFields.push({
      ...JSON.parse(JSON.stringify(v)),
      value: basicInfoValues[v.key],
    });
  }

  for (const v of priceFields) {
    params.priceFields.push({
      ...JSON.parse(JSON.stringify(v)),
      value: priceInfoValues[v.key],
    });
  }

  for (const v of imagesFields) {
    params.imageFields.push({
      ...JSON.parse(JSON.stringify(v)),
      value: imagesInfoValues[v.key],
    });
  }

  return params;
}
