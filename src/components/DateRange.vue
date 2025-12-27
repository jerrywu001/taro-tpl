<template>
  <view class="common-date-range">
    <view class="common-date-range-input">
      <view
        class="common-date-range-input-wrapper"
        :class="{ active: activeDateInput === 'start' }"
        @click="switchActiveDateInput('start')"
      >
        <nut-input
          v-model="startDateFormatter"
          placeholder="开始日期"
          readonly
          @click="switchActiveDateInput('start')"
        />
      </view>
      <view
        class="common-date-range-input-wrapper"
        :class="{ active: activeDateInput === 'end' }"
        @click="switchActiveDateInput('end')"
      >
        <nut-input
          v-model="endDateFormatter"
          placeholder="结束日期"
          readonly
          @click="switchActiveDateInput('end')"
        />
      </view>
    </view>

    <view class="common-date-range-picker">
      <nut-date-picker
        v-model="dateVModel"
        cancel-text="清空"
        :min-date="minDate"
        :max-date="maxDate"
        :three-dimensional="false"
        @cancel="onDateClear"
        @confirm="onDateConfirm"
      />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { computed, PropType, ref, watch } from 'vue';
import { foramtDateStrToZhcn } from '@/utils';

type DateValue = [string, string, string] | [];

const defaultMaxDate = new Date(new Date().setDate(new Date().getDate() + 1));

const emit = defineEmits<{ change: [value: string[]] }>();

const props = defineProps({
  /**
   * 日期范围，例如：
   * ```
   * ['2025-06-06', '2025-06-08']
   * ```
   */
  dateRange: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  /**
   * 最小日期
   * @description 最小日期
   * @default '2024-01-01'
   */
  min: {
    type: String as PropType<string | undefined>,
    default: () => '2024-01-01',
  },
  /**
   * 最大日期
   * @description 最大日期，undefined -> 当前日期+1天
   * @default undefined
   */
  max: {
    type: String as PropType<string | undefined>,
    default: () => undefined,
  },
  clearMode: {
    type: String as PropType<'all' | 'actived'>,
    default: () => 'all',
  },
});
/** 和dateRange格式一样，例如：['2025-06-06', '2025-06-08'] */
const ranges = ref([] as string[]);
const dateVModel = ref<Date | undefined>(undefined);
const activeDateInput = ref<'start' | 'end'>('start');

const minDate = computed(() => props.min ? new Date(props.min.replace(/-/g, '/')) : undefined);
const maxDate = computed(() => props.max ? new Date(props.max.replace(/-/g, '/')) : defaultMaxDate);

const startInputActive = computed(() => activeDateInput.value === 'start');
const startDateFormatter = computed(() => foramtDateStrToZhcn(ranges.value[0]).split(' ')[0] || undefined);
const endDateFormatter = computed(() => foramtDateStrToZhcn(ranges.value[1]).split(' ')[0] || undefined);

const cloneDeep = (val: Record<string, any>) => JSON.parse(JSON.stringify(val));

const getDateObject = (date: string[] | string | Date | undefined) => {
  if (!date) return undefined;
  if (date instanceof Date) return date;

  if (typeof date === 'string') {
    return new Date(date.replace(/-/g, '/'));
  }

  if (date.length < 3) return undefined;

  return new Date(Number(date[0]), Number(date[1]) - 1, Number(date[2]));
};

const onDateConfirm = ({ selectedValue }: { selectedValue: DateValue }) => {
  if (activeDateInput.value === 'start') {
    ranges.value[0] = selectedValue.join('-');
  } else {
    ranges.value[1] = selectedValue.join('-');
  }

  emit('change', ranges.value);
  dateVModel.value = selectedValue.length > 0 ? getDateObject(selectedValue) : undefined;
};

const onDateClear = () => {
  if (props.clearMode === 'all') {
    ranges.value[0] = '';
    ranges.value[1] = '';
    activeDateInput.value = 'start';
  } else if (activeDateInput.value === 'start') {
    ranges.value[0] = '';
  } else {
    ranges.value[1] = '';
  }

  emit('change', ranges.value);
  dateVModel.value = undefined;
};

const switchActiveDateInput = (inputType: 'start' | 'end') => {
  activeDateInput.value = inputType;

  const currentDate = inputType === 'start' ? ranges.value[0] : ranges.value[1];

  // 如果当前日期为空,则默认显示今天的日期
  dateVModel.value = currentDate ? getDateObject(currentDate) : new Date();
};

/** 更新 dateVModel 的值 */
const updateDateVModel = (values: DateValue[]) => {
  if (startInputActive.value) {
    // 如果开始日期为空,则默认显示今天的日期
    dateVModel.value = values[0] ? getDateObject(values[0]) : new Date();
  } else {
    // 如果结束日期为空,则默认显示今天的日期
    dateVModel.value = values[1] ? getDateObject(values[1]) : new Date();
  }
};

// init dateRange values
watch(
  () => props.dateRange,
  (initialValues: string[]) => {
    const pickerValues = cloneDeep(initialValues || []);
    const values = pickerValues.map((v) => v.split('-')) as DateValue[];

    ranges.value = pickerValues;

    // 如果 dateRange 为空数组或值为空,默认显示今天的日期
    if (pickerValues.length === 0 || !pickerValues[0]) {
      dateVModel.value = new Date();
    } else {
      updateDateVModel(values);
    }
  },
  { immediate: true },
);
</script>

<style lang="scss">
.common-date-range {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;

  &-title {
    font-size: 28px;
    font-weight: 600;
    color: #333;
  }

  &-input {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 64px;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      font-size: 24px;
      border-top: 1px solid #999;
      width: 32px;
      text-align: center;
    }

    &-wrapper {
      padding: 0;
      height: 64px;
      border-radius: 4px;
      border: 1px solid #eee;

      &.active {
        background-color: #f7f7f7;

        .input-placeholder {
          color: #333;
        }
      }

      .nut-input {
        padding: 0;
        height: 64px;
        border: none;
        background-color: transparent;

        .nut-input-box,
        .nut-input-inner {
          height: 100%;

          input {
            height: 100%;
            font-size: 24px;
            color: #333;
            width: 100%;
            box-sizing: border-box;
            padding: 0 0 0 16px;
            text-align: center !important;
          }
        }
      }
    }
  }

  &-picker {
    display: flex;
    flex-direction: row;
    align-items: center;

    .nut-picker {
      width: 100%;
    }
  }
}
</style>
