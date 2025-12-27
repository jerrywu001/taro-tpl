import { IDynamicComponent } from '.';

type CompMap = Record<IDynamicComponent['componentType'], () => Promise<any>>;

/**
 * 组件类型到组件导入路径的映射
 */
export const componentImportMap: CompMap = {
  TEXT_LONG: () => import('./widgets/DynamicInput.vue'),
  TEXT_SHORT: () => import('./widgets/DynamicInput.vue'),
  TEXTAREA: () => import('./widgets/DynamicTextarea.vue'),
  NUMBER: () => import('./widgets/DynamicNumber.vue'),
  ENUM_RADIO: () => import('./widgets/DynamicEnumRadio.vue'),
  SELECT_SINGLE: () => import('./widgets/DynamicSelectSingle.vue'),
  SELECT_SINGLE_CUSTOM: () => import('./widgets/DynamicSelectSingle.vue'),
  ENUM_CHECKBOX: () => import('./widgets/DynamicEnumCheckbox.vue'),
  SELECT_MULTI: () => import('./widgets/DynamicSelectMulti.vue'),
  SELECT_MULTI_CUSTOM: () => import('./widgets/DynamicSelectMulti.vue'),
  IMAGE_UPLOAD: () => import('./widgets/DynamicImageUpload.vue'),
  IMAGE_UPLOAD_FREE: () => import('./widgets/DynamicImageUpload.vue'),
  BRAND_MODEL_SERIES_PICKER: () => import('./widgets/DynamicBrandModelSeriesPicker.vue'),
  ACCESSORY_SELECT_SINGLE: () => import('./widgets/DynamicAccessoryOrConditionSelect.vue'),
  CONDITION_SELECT_SINGLE: () => import('./widgets/DynamicAccessoryOrConditionSelect.vue'),
  MASTER_BANK_SELECT: () => import('./widgets/DynamicMasterBankSelect.vue'),
  BRANCH_BANK_SELECT: () => import('./widgets/DynamicBranchBankSelect.vue'),
  DATE_PICKER: () => import('./widgets/DynamicDatePicker.vue'),
  AREA_PICKER: () => import('./widgets/DynamicAreaPicker.vue'),
};
