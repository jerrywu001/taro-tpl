<template>
  <div
    v-if="!readonly"
    :id="`dynamic-${config.key}`"
    class="dynamic-select"
    @click="config.status !== 1 && (showPicker = true)"
  >
    <view v-if="dateValue" class="select-value">
      <text>{{ dateValue }}</text>

      <view>
        <view
          v-if="allowClear && config.status !== 1 && dateValue"
          class="dynamic-clear"
          @click="clearDate"
        >
          <IconFont name="circle-close" />
        </view>
        <IconFont v-if="config.status !== 1" name="rect-right" />
      </view>
    </view>
    <view v-else class="select-placeholder">
      <text>{{ config.placeholder || `请选择${config.label}` }}</text>
      <IconFont v-if="config.status !== 1" name="rect-right" />
    </view>
  </div>

  <span v-else>{{ dateValue || '-' }}</span>

  <root-portal>
    <nut-popup v-model:visible="showPicker" safe-area-inset-bottom position="bottom">
      <nut-date-picker
        v-model="pickerDate"
        :title="`请选择${config.label}`"
        :type="pickerType"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="handleConfirm"
        @cancel="showPicker = false"
      />
    </nut-popup>
  </root-portal>
</template>

<script lang="ts" setup>
import { ref, watch, PropType } from 'vue';
import { IDynamicComponent } from '..';
import { IconFont } from '@nutui/icons-vue-taro';

const props = defineProps({
  readonly: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: String,
    default: '',
  },
  config: {
    type: Object as PropType<IDynamicComponent>,
    default: () => ({}),
  },
  allowClear: {
    type: Boolean,
    default: true,
  },
  /**
   * 日期选择器类型
   * @default 'date'
   */
  pickerType: {
    type: String as PropType<'date' | 'datetime' | 'year-month' | 'month-day' | 'datehour'>,
    default: 'date',
  },
  /**
   * 日期格式化函数
   */
  format: {
    type: Function as PropType<(date: Date) => string>,
    default: undefined,
  },
  /**
   * 最小日期
   */
  minDate: {
    type: Date,
    default: () => new Date(1900, 0, 1),
  },
  /**
   * 最大日期
   */
  maxDate: {
    type: Date,
    default: () => new Date(2100, 11, 31),
  },
});

const emit = defineEmits(['update:modelValue', 'validate']);

const showPicker = ref(false);
const dateValue = ref<string>('');
const pickerDate = ref<Date>(new Date());

const getDateObject = (date: string[] | string | Date | undefined) => {
  if (!date) return undefined;
  if (date instanceof Date) return date;

  if (typeof date === 'string') {
    return new Date(date.replace(/-/g, '/'));
  }

  if (date.length < 3) return undefined;

  return new Date(Number(date[0]), Number(date[1]) - 1, Number(date[2]));
};

/**
 * 确认选择日期
 */
function handleConfirm({ selectedValue }: { selectedValue: string[] }) {
  const formattedDate = selectedValue.join('-');

  dateValue.value = formattedDate;
  showPicker.value = false;

  emit('update:modelValue', formattedDate);
  emit('validate', props.config.key);
}

/**
 * 清空日期
 */
function clearDate(e: PointerEvent) {
  e.stopPropagation();
  e.preventDefault();

  dateValue.value = '';

  emit('update:modelValue', '');
  emit('validate', props.config.key);
}

watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal !== dateValue.value) {
      dateValue.value = newVal;

      if (newVal) {
        pickerDate.value = getDateObject(newVal) as Date;
      }
    }
  },
  { immediate: true },
);
</script>

<style lang="scss" scoped>
// 样式继承自 DynamicSelectSingle
</style>
