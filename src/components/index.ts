export { default as CheckboxButton } from './CheckboxButton.vue';
export { default as CustomInput } from './CustomInput.vue';
export { default as SmsButton } from './SmsButton.vue';
export { default as SearchInput } from './SearchInput.vue';
export { default as PopupSearch } from './PopupSearch.vue';
export { default as DateRange } from './DateRange.vue';
export { default as SwiperDetail } from './SwiperDetail.vue';
export { default as CustomTag } from './CustomTag.vue';
export { default as SingleSelect } from './SingleSelect.vue';
export { default as ImageUploadCard } from './ImageUploadCard.vue';
export { default as DatePicker } from './dynamic/widgets/DynamicDatePicker.vue';
export { default as MasterBankSelect } from './dynamic/widgets/DynamicMasterBankSelect.vue';
export { default as BranchBankSelect } from './dynamic/widgets/DynamicBranchBankSelect.vue';

export interface IDateRange {
  /**
   * 日期范围标题
   */
  title: string;
  /**
   * 日期范围key
   * @description 非必须，只在多个时间选择场景下需要
   */
  key?: string;
  /**
   * 开始日期
   */
  start: string;
  /**
   * 结束日期
   */
  end: string;
  /**
   * 最小日期
   * @description 最小日期 格式：'2024-01-01'
   * @default undefined
   */
  minDate?: string;
  /**
   * 最大日期
   * @description 最大日期 格式：'yyyy-MM-dd'
   * @default undefined
   */
  maxDate?: string;
  /**
   * 是否必填
   * @default false
   */
  required?: boolean;
}
