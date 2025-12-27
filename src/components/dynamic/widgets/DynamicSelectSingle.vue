<template>
  <div
    v-if="!readonly"
    :id="`dynamic-${config.key}`"
    class="dynamic-select"
    @click="config.status !== 1 && (showSelecter = true)"
  >
    <view v-if="!isNull(selectedOption?.value)" class="select-value">
      <text>{{ selectedOption?.label }}</text>

      <view>
        <text v-if="selectedOption?.disabled && !config.hideDisabledTip" class="dynamic-select-disabled">
          已停用
        </text>
        <view
          v-if="allowClear && config.status !== 1 && !isNull(selectedOption?.value)"
          class="dynamic-clear"
          @click="clearSelect"
        >
          <IconFont name="circle-close" />
        </view>
        <IconFont v-if="config.status !== 1" name="rect-right" />
      </view>
    </view>
    <view v-else class="select-placeholder">
      <text>请选择{{ config.label }}</text>
      <IconFont v-if="config.status !== 1" name="rect-right" />
    </view>
  </div>

  <span v-else>{{ selectedOption?.label || '-' }}</span>

  <root-portal>
    <nut-popup v-model:visible="showSelecter" safe-area-inset-bottom position="bottom">
      <nut-picker
        :model-value="pickerValue"
        :columns="filteredOptions"
        :field-names="{ text: 'label', value: 'value' }"
        :title="config.placeholder || `请选择${config.label}`"
        @confirm="chooseSelect"
        @cancel="showSelecter = false"
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
          <view v-else-if="withSearch" class="select-search-box">
            <nut-input
              v-model="searchKeyword"
              :placeholder="searchPlaceholder"
              clearable
              :max-length="60"
              show-word-limit
            />
          </view>
        </template>
      </nut-picker>
    </nut-popup>
  </root-portal>
</template>

<script lang="ts" setup>
import { ref, watch, computed, PropType } from 'vue';
import { IDynamicComponent, IDynamicPicker } from '..';
import { isNull, showToast, generateRandomOptionValue } from '@/utils';
import Taro from '@tarojs/taro';
import { IconFont } from '@nutui/icons-vue-taro';

const props = defineProps({
  readonly: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: [String, Number],
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
  enableSearch: {
    type: Boolean,
    default: false,
  },
  searchPlaceholder: {
    type: String,
    default: '搜索选项',
  },
});

const emit = defineEmits(['update:modelValue', 'validate', 'add-option']);

const showSelecter = ref(false);
const newOptionText = ref('');
const selectValue = ref<string | number | undefined>(undefined);
const options = ref<IDynamicPicker[]>([]);
const searchKeyword = ref('');

const withSearch = computed(() => props.enableSearch || props.config.enableSearch);
const selectedOption = computed(() => options.value.find((option) => option.value === selectValue.value));
const canCustom = computed(() => props.config.componentType === 'SELECT_SINGLE_CUSTOM');
const pickerValue = computed(() => selectedOption.value?.value ? [selectedOption.value.value] : []);

const filteredOptions = computed(() => {
  const kw = (searchKeyword.value || '').trim().toLowerCase();

  if (!withSearch.value || !kw) return options.value;
  return options.value.filter((opt) => String(opt.label || '').toLowerCase()
    .includes(kw));
});

function chooseSelect({ selectedOptions }) {
  const item = selectedOptions[0] as IDynamicPicker;

  if (!item) return showToast('未选中任何选项');

  const val = isNull(item.value) ? null : item.value;

  if (item.disabled) {
    showToast('已停用，不能选择');
    return;
  }

  showSelecter.value = false;
  emit('update:modelValue', val);
  emit('validate', props.config.key);
}

const addCustomOption = () => {
  if (!newOptionText.value.trim()) return;

  const exists = props.config.options?.some((option) =>
    option.label === newOptionText.value.trim() ||
    option.value === newOptionText.value.trim(),
  );

  if (exists) {
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

  selectValue.value = option.value;
  emit('update:modelValue', selectValue.value);
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

  selectValue.value = undefined;

  emit('update:modelValue', null);
  emit('validate', props.config.key);
};

watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal !== selectValue.value) {
      selectValue.value = newVal;
    }
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
      className: option.status === 1 ? 'disabled' : '',
    }));
  },
  { immediate: true },
);

watch(
  () => showSelecter.value,
  (visible) => {
    if (!visible) {
      searchKeyword.value = '';
    }
  },
);
</script>
