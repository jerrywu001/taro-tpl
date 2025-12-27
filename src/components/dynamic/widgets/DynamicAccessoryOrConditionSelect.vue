<template>
  <!-- 配件/成色下拉单选（统一为 Picker 弹窗交互） -->
  <div
    v-if="!readonly"
    :id="`dynamic-${config.key}`"
    class="dynamic-select"
    @click="config.status !== 1 && (showSelecter = true)"
  >
    <view v-if="selectedOption" class="select-value">
      <text>{{ selectedOption.label }}</text>

      <view>
        <text v-if="selectedOption.disabled && !config.hideDisabledTip" class="dynamic-select-disabled">
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
        :title="`请选择${config.label}`"
        @confirm="chooseSelect"
        @cancel="showSelecter = false"
      >
        <template #top>
          <view v-if="withSearch" class="select-search-box">
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
import { EStatus } from '@/types/common';
import { isNull, showToast } from '@/utils';
import { queryQualityList } from '@/api/goods/quality';
import { queryAccessoryList } from '@/api/goods/accessory';
import { IconFont } from '@nutui/icons-vue-taro';

const props = defineProps({
  readonly: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: String,
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
    default: true,
  },
  searchPlaceholder: {
    type: String,
    default: '搜索选项',
  },
});

const emit = defineEmits(['update:modelValue', 'validate']);

const loading = ref(false);
const showSelecter = ref(false);
const selectValue = ref<string | undefined>(undefined);
const options = ref<IDynamicPicker[]>([]);
const searchKeyword = ref('');

const withSearch = computed(() => props.enableSearch || props.config.enableSearch);
const selectedOption = computed(() => options.value.find((option) => String(option.value) === String(selectValue.value)));
const pickerValue = computed(() => selectedOption.value?.value ? [selectedOption.value.value] : []);

const filteredOptions = computed(() => {
  const kw = (searchKeyword.value || '').trim().toLowerCase();

  if (!withSearch.value || !kw) return options.value;
  return options.value.filter((opt) => String(opt.label || '').toLowerCase()
    .includes(kw));
});

const fetchOptions = async () => {
  loading.value = true;
  try {
    let items: Record<string, any>[] = [];

    if (props.config.componentType === 'ACCESSORY_SELECT_SINGLE') {
      items = await queryAccessoryList();
    }

    if (props.config.componentType === 'CONDITION_SELECT_SINGLE') {
      items = await queryQualityList();
    }

    // 保持接口获取逻辑不变，仅补充 className 以统一风格
    options.value = items.map((item) => ({
      label: item.name,
      value: item.id,
      disabled: item.status === EStatus.DISABLED,
      className: item.status === EStatus.DISABLED ? 'disabled' : '',
    }));
  } catch (error) {
    console.error('获取选项失败', error);
  }
  loading.value = false;
};

function chooseSelect({ selectedOptions }) {
  const item = selectedOptions[0] as {
    label: string;
    value: string;
    disabled: boolean;
  };
  const val = isNull(item.value) ? null : item.value;

  if (item.disabled) {
    showToast('已停用，不能选择');
    return;
  }

  showSelecter.value = false;
  emit('update:modelValue', String(val));
  emit('validate', props.config.key);
}

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
      selectValue.value = String(newVal);
    }
  },
  { immediate: true },
);

fetchOptions();
</script>
