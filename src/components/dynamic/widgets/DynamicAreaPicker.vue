<template>
  <div
    v-if="!readonly"
    :id="`dynamic-${config.key}`"
    class="dynamic-select"
    @click="config.status !== 1 && handleOpenPicker()"
  >
    <view v-if="displayLabel" class="select-value">
      <text>{{ displayLabel }}</text>

      <view>
        <view
          v-if="allowClear && config.status !== 1 && displayLabel"
          class="dynamic-clear"
          @click="clearArea"
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

  <span v-else>{{ displayLabel || '-' }}</span>

  <root-portal>
    <nut-popup v-model:visible="showPicker" safe-area-inset-bottom position="bottom">
      <nut-picker
        :model-value="pickerValue"
        :columns="areaList"
        :title="`请选择${config.label}`"
        @confirm="handleConfirm"
        @cancel="handleClosePicker"
        @change="handlePickerChange"
      />
    </nut-popup>
  </root-portal>
</template>

<script lang="ts" setup>
import { IDynamicComponent } from '..';
import { IconFont } from '@nutui/icons-vue-taro';
import { ref, watch, computed, PropType } from 'vue';
import { areaList, IAreaValue } from '@/utils/areaCodes';

const emit = defineEmits(['update:modelValue', 'validate']);

const props = defineProps({
  readonly: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: Object as PropType<IAreaValue>,
    default: undefined,
  },
  config: {
    type: Object as PropType<IDynamicComponent>,
    default: () => ({}),
  },
  allowClear: {
    type: Boolean,
    default: true,
  },
});

const showPicker = ref(false);
const areaValue = ref({} as IAreaValue);
const tempAreaValue = ref({} as IAreaValue);

/** 当picker打开时，优先使用tempAreaValue；否则使用areaValue */
const pickerValue = computed(() => {
  const source = Object.keys(tempAreaValue.value).length > 0
    ? tempAreaValue.value
    : areaValue.value;

  return [
    source.provinceCode,
    source.cityCode,
    source.districtCode,
  ].filter(
    (v) => v,
  ) as string[];
});

const displayLabel = computed(() => {
  const parts: string[] = [];

  if (areaValue.value.provinceName) parts.push(areaValue.value.provinceName);
  if (areaValue.value.cityName) parts.push(areaValue.value.cityName);
  if (areaValue.value.districtName) parts.push(areaValue.value.districtName);

  return parts.join(' ');
});

function handleConfirm({ selectedOptions }: any) {
  const province = selectedOptions[0];
  const city = selectedOptions[1];
  const district = selectedOptions[2];

  showPicker.value = false;
  areaValue.value = {
    provinceCode: province?.value,
    provinceName: province?.text,
    cityCode: city?.value,
    cityName: city?.text,
    districtCode: district?.value,
    districtName: district?.text,
  };

  emit('update:modelValue', areaValue.value);
  emit('validate', props.config.key);
}

/** 仅用于更新级联列表，不提交数据 */
function handlePickerChange({ columnIndex, selectedOptions }: any) {
  if (columnIndex === 0) { // 选择省份时，重置市和区
    const selected = selectedOptions[0];

    tempAreaValue.value.provinceCode = selected.value;
    tempAreaValue.value.provinceName = selected.text;
    tempAreaValue.value.cityCode = '';
    tempAreaValue.value.cityName = '';
    tempAreaValue.value.districtCode = '';
    tempAreaValue.value.districtName = '';
    return;
  }

  if (columnIndex === 1) { // 选择市时，重置区
    const selected = selectedOptions[1];

    tempAreaValue.value.cityCode = selected.value;
    tempAreaValue.value.cityName = selected.text;
    tempAreaValue.value.districtCode = '';
    tempAreaValue.value.districtName = '';
    return;
  }

  // 选择区
  const selected = selectedOptions[2];

  tempAreaValue.value.districtCode = selected.value;
  tempAreaValue.value.districtName = selected.text;
}

/** 打开picker，同步当前值到临时值 */
function handleOpenPicker() {
  tempAreaValue.value = { ...areaValue.value };
  showPicker.value = true;
}

function handleClosePicker() {
  tempAreaValue.value = {};
  showPicker.value = false;
}

function clearArea(e: PointerEvent) {
  e.stopPropagation();
  e.preventDefault();

  areaValue.value = {};
  tempAreaValue.value = {};

  emit('update:modelValue', null);
  emit('validate', props.config.key);
}

watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal && typeof newVal === 'object') {
      areaValue.value = { ...newVal };
    } else {
      areaValue.value = {};
    }
  },
  { immediate: true },
);
</script>

<style lang="scss" scoped>
// 样式继承自 DynamicSelectSingle
</style>
