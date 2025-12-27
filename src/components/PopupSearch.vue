<template>
  <nut-popup
    v-model:visible="showTop"
    position="top"
    :close-on-click-overlay="false"
  >
    <view
      class="popup-search"
      :style="{ paddingTop: `${statusBarHeight}px` }"
    >
      <view
        class="popup-search-nav"
        :style="{
          top: `${statusBarHeight}px`,
          height: `${navHeight}px`,
        }"
      >
        <view
          class="popup-search-left"
          :style="{
            height: `${navHeight}px`,
          }"
          @click="Taro.navigateBack()"
        >
          <slot v-if="!showBackButton" name="nav-left" />
          <IconFont
            v-else
            name="rect-left"
            color="#333"
          />
        </view>

        <view
          class="popup-search-title"
        >
          {{ title }}
        </view>
      </view>

      <!-- content -->
      <view class="popup-search-content">
        <!-- date ranges -->
        <template v-if="dateRangeArray.length > 0">
          <template v-for="(range, idx) in dateRangeArray" :key="range.key">
            <view class="popup-search-date-range">
              <view class="popup-search-date-range-title">
                <text>{{ range.title }}</text>
              </view>

              <DateRange
                :date-range="[range.start, range.end]"
                :min="range.minDate"
                :max="range.maxDate"
                @change="(vals) => onDateRangeChange(vals, idx)"
              />
            </view>
          </template>
        </template>
      </view>

      <view class="popup-search-footer">
        <nut-button
          type="default"
          block
          @click="doCancel"
        >
          取消
        </nut-button>
        <nut-button
          type="primary"
          block
          @click="doSave"
        >
          确定
        </nut-button>
      </view>
    </view>
  </nut-popup>
</template>

<script lang="ts" setup>
import Taro from '@tarojs/taro';
import { DateRange, IDateRange } from '.';
import { IconFont } from '@nutui/icons-vue-taro';
import { useNavHeight } from '@/hooks/useNavHeight';
import { computed, PropType, ref, watch } from 'vue';
import { isNull, showToast } from '@/utils';

const emit = defineEmits(['update:visible', 'change', 'close']);

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  enabledDateRange: {
    type: Boolean,
    default: true,
  },
  showBackButton: {
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
    default: '搜索',
  },
  /**
   * 分组选项的值，例如：
   * ```
   * {
   *   'txnCategory': '1',
   *   'txnType': '3',
   * }
   * ```
   */
  groupValues: {
    type: Object as PropType<Record<string, string | number>>,
    default: () => ({}),
  },
  /**
   * 日期范围
   * @description 日期范围对象 {@link IDateRange}
   *
   * 例如：
   * ```
   * [
   *   {
   *     title: '交易日期',
   *     key: 'transDate', // 非必须，只在多个时间选择场景下需要
   *     start: '2025-06-06',
   *     end: '2025-06-08',
   *     minDate: '2008-06-06',
   *   },
   *   // ...
   * ]
   * ```
   */
  dateRangeArray: {
    type: Array as PropType<IDateRange[]>,
    default: () => [],
  },
});

const { statusBarHeight, navHeight } = useNavHeight();

const rangeArray = ref<IDateRange[]>([]);

const fromGroupValues = ref<Record<string, string | number | number[]>>({});

const showTop = computed({
  get() {
    return props.visible;
  },
  set(val) {
    emit('update:visible', val);
  },
});

const cloneDeep = (val: any) => JSON.parse(JSON.stringify(val));

const onDateRangeChange = (dateStrArray: string[], idx: number) => {
  const [start, end] = dateStrArray;

  rangeArray.value[idx].end = end;
  rangeArray.value[idx].start = start;
};

const doSave = () => {
  let error = '';

  for (const v of rangeArray.value) {
    if (v.required && (!v.start || !v.end)) {
      error = '请选择日期';
      break;
    }

    if (v.start && v.end && new Date(v.start.replace(/-/g, '/')) > new Date(v.end.replace(/-/g, '/'))) {
      error = '开始日期不能大于结束日期';
      break;
    }
  }

  if (error) {
    showToast(error);
    return;
  }

  emit('change', {
    values: cloneDeep(fromGroupValues.value),
    ranges: rangeArray.value,
  });
};

const doCancel = () => {
  rangeArray.value = cloneDeep(props.dateRangeArray);
  fromGroupValues.value = cloneDeep(props.groupValues);
  emit('close');
};

watch(
  [
    () => props.groupValues,
    () => props.dateRangeArray,
  ],
  ([newValues, newRangeArr]) => {
    fromGroupValues.value = cloneDeep(newValues || {});
    rangeArray.value = cloneDeep(newRangeArr || []);
  },
  {
    immediate: true,
    deep: true,
  },
);
</script>

<style lang="scss">
.popup-search {
  position: relative;
  padding: 32px 0;
  box-sizing: border-box;

  &-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
  }

  &-left {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &-title {
    font-size: 32px;
    font-weight: 500;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  &-group {
    margin-top: 32px;

    &-title {
      font-size: 28px;
      font-weight: 600;
      color: #333;
      margin-bottom: 16px;
    }

    &-options {
      display: flex;
      flex-wrap: wrap;
      gap: 28px;
    }

    &-option {
      flex: 1;
      text-align: center;
      font-size: 24px;
      color: #333;
      padding: 16px 38px;
      border-radius: 12px;
      background-color: #F0F2F5;

      &.active {
        background-color: #E8F2FF;
        color: var(--primary-color);
      }

      &:active {
        opacity: 0.8;
      }
    }
  }

  &-footer {
    display: flex;
    justify-content: space-between;
    margin-top: 32px;
    padding-bottom: 36px;
    gap: 16px;

    .nut-button {
      border-radius: 12px;
    }

    .nut-button--default {
      width: 226px;
    }

    .nut-button--primary {
      flex: 1;
    }
  }

  &-content {
    max-height: calc(100vh - 632px);
    overflow-y: auto;
  }

  &-date-range {
    margin-top: 32px;

    &-title {
      font-size: 28px;
      font-weight: 600;
      color: #333;
      margin-bottom: 16px;
    }
  }

  &-nav,
  &-content,
  &-footer {
    padding: 0 32px;
  }
}
</style>
