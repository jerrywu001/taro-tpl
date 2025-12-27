<template>
  <div
    :id="`dynamic-${config.key}`"
    class="dynamic-select"
  >
    <div v-if="!readonly" @click="config.status !== 1 && (showSelecter = true)">
      <view v-if="selectValues.length > 0" class="select-value">
        <text>{{ selectedLabels }}</text>

        <view>
          <view
            v-if="allowClear && config.status !== 1 && selectValues.length > 0"
            class="dynamic-clear"
            @click="clearSelect"
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

    <span v-else>{{ selectedLabels || '-' }}</span>
  </div>

  <mutiple-select
    v-model="selectValues"
    :visible="showSelecter"
    :options="options"
    :title="`请选择${config.label}`"
    @change="handleChange"
    @close="showSelecter = false"
  >
    <template #top>
      <view v-if="canCustom" class="select-add-box">
        <nut-input
          v-model="newOptionText"
          placeholder="请输入属性名称"
          clearable
          :max-length="60"
          show-word-limit
        />

        <view class="add-btn" @click="addCustomOption">
          <IconFont name="plus" />
          <text>添加</text>
        </view>
      </view>
    </template>

    <template #extra-label="{ option }">
      <text v-if="option.disabled && !config.hideDisabledTip" class="extra-label">
        已停用
      </text>
    </template>
  </mutiple-select>
</template>

<script lang="ts" setup>
import { ref, watch, computed, PropType } from 'vue';
import { IDynamicComponent } from '..';
import Taro from '@tarojs/taro';
import MutipleSelect from '@/components/MutipleSelect.vue';
import { IconFont } from '@nutui/icons-vue-taro';
import { generateRandomOptionValue } from '@/utils';

const props = defineProps({
  readonly: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: Array as PropType<(string | number)[]>,
    default: () => [],
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

const emit = defineEmits(['update:modelValue', 'validate', 'add-option']);

const newOptionText = ref('');
const options = ref<{
  label: string;
  value: string | number;
  disabled: boolean;
}[]>([]);

const selectValues = ref<(string | number)[]>(Array.isArray(props.modelValue) ? props.modelValue : []);
const showSelecter = ref(false);

const canCustom = computed(() => props.config.componentType === 'SELECT_MULTI_CUSTOM');

const selectedLabels = computed(() => {
  const map = new Map(options.value.map((o) => [String(o.value), o.label]));

  return selectValues.value
    .map((v) => map.get(String(v)) || String(v))
    .join(', ');
});

const handleChange = (vals: (string | number)[]) => {
  const val = Array.isArray(vals) ? vals : [];
  const same = Array.isArray(props.modelValue)
    && props.modelValue.length === val.length
    && props.modelValue.every((v, i) => v === val[i]);

  if (!same) {
    emit('update:modelValue', val);
    emit('validate', props.config.key);
  }

  showSelecter.value = false;
};

const addCustomOption = () => {
  if (!newOptionText.value.trim()) return;

  const exists = options.value?.some((option) =>
    option.label === newOptionText.value.trim() ||
    option.value === newOptionText.value.trim(),
  );

  if (exists) {
    newOptionText.value = '';
    Taro.showToast({
      title: '选项已存在',
      icon: 'none',
    });
    return;
  }

  const option = {
    label: newOptionText.value.trim(),
    value: generateRandomOptionValue(),
  };

  options.value.push({
    ...option,
    disabled: false,
  });

  emit(
    'add-option',
    props.config.key,
    {
      ...option,
      status: 0,
    },
  );
  newOptionText.value = '';
};

const clearSelect = (e: PointerEvent) => {
  e.stopPropagation();
  e.preventDefault();

  selectValues.value = [];
  emit('update:modelValue', []);
  emit('validate', props.config.key);
};

watch(
  () => props.modelValue,
  (newVal) => {
    selectValues.value = Array.isArray(newVal) ? newVal : [];
  },
  { immediate: true },
);

watch(
  () => props.config.options,
  (newVal) => {
    options.value = (newVal || []).map((option) => ({
      label: option.label,
      value: option.value,
      disabled: option.status === 1,
    }));
  },
  { immediate: true },
);
</script>
