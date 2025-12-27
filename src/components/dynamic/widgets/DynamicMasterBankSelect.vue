<template>
  <!-- 总行下拉单选（统一为 Picker 弹窗交互） -->
  <div
    v-if="!readonly"
    :id="`dynamic-${config.key}`"
    class="dynamic-select"
    @click="openOptionsPicker"
  >
    <view v-if="displayName" class="select-value">
      <text>{{ displayName }}</text>

      <view>
        <view
          v-if="allowClear && config.status !== 1 && !isNull(selectedOption?.value)"
          class="dynamic-clear"
          @click="clearSelect"
        >
          <IconFont name="circle-close" />
        </view>

        <view style="display: flex; align-items: center;">
          <IconFont v-if="config.status !== 1" name="rect-right" />
        </view>
      </view>
    </view>

    <view v-else class="select-placeholder">
      <text>请选择{{ config.label }}</text>
      <IconFont v-if="config.status !== 1" name="rect-right" />
    </view>
  </div>

  <span v-else>{{ modelValue?.bankName || '-' }}</span>

  <root-portal>
    <nut-popup
      v-model:visible="showSelecter"
      position="bottom"
      safe-area-inset-bottom
      @click-overlay="closeOptionsPicker(true)"
    >
      <nut-picker
        :model-value="pickerValue"
        :columns="options"
        :field-names="{ text: 'label', value: 'value' }"
        :title="`请选择${config.label}`"
        @confirm="chooseSelect"
        @cancel="closeOptionsPicker(true)"
      >
        <template #top>
          <view v-if="withSearch" class="select-search-box">
            <nut-input
              v-model="searchKeyword"
              :placeholder="searchPlaceholder"
              clearable
              :max-length="60"
              show-word-limit
              @clear="handleLoadOptions('')"
              @change="(e) => handleLoadOptions(e.detail.value)"
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
import { isNull, showToast } from '@/utils';
import { queryMasterBanks } from '@/api';
import { IconFont } from '@nutui/icons-vue-taro';
import { useDebounce } from '@/hooks';

let prevKeyword = '';
let prevOptions = [] as IDynamicPicker[];

const props = defineProps({
  readonly: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: Object as PropType<{
      bankCode: string;
      bankName: string;
    }>,
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
    default: '搜索开户银行',
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
const displayName = computed(() => selectedOption.value?.label || props.modelValue?.bankName || '');

const { run: handleLoadOptions } = useDebounce(async (keyword: string, isFirstLoad = false) => {
  if (props.readonly) return;

  searchKeyword.value = keyword || '';
  await fetchOptions(searchKeyword.value, isFirstLoad);
}, 500);

async function fetchOptions(keyword: string, isFirstLoad = false) {
  loading.value = true;
  try {
    const items = await queryMasterBanks(keyword);

    options.value = items.map((item) => ({
      label: item.bankName,
      value: item.bankCode,
      disabled: false,
      className: '',
    }));

    if (isFirstLoad && selectValue.value && !selectedOption.value) {
      options.value.unshift({
        label: props.modelValue?.bankName || '',
        value: props.modelValue?.bankCode || '',
        disabled: false,
        className: '',
      });
    }
  } catch (error) {
    console.error('获取总行列表失败', error);
  }
  loading.value = false;
}

function openOptionsPicker() {
  if (props.readonly) return;

  if (props.config.status !== 1) {
    showSelecter.value = true;
    searchKeyword.value = prevKeyword;
    prevOptions = [...JSON.parse(JSON.stringify(options.value))];
  }
}

function closeOptionsPicker(clearSearch = false) {
  showSelecter.value = false;
  options.value = [...prevOptions];

  if (clearSearch) {
    searchKeyword.value = '';
  }
}

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

  prevKeyword = searchKeyword.value;
  prevOptions = [...JSON.parse(JSON.stringify(options.value))];
  selectValue.value = val as string;
  closeOptionsPicker(false);
  emit('update:modelValue', {
    bankName: item.label,
    bankCode: val,
  });
  emit('validate', props.config.key);
}

function clearSelect(e: PointerEvent) {
  e.stopPropagation();
  e.preventDefault();

  handleLoadOptions('');
  selectValue.value = undefined;

  emit('update:modelValue', null);
  emit('validate', props.config.key);
}

watch(
  () => props.modelValue,
  (newVal?: {
    bankName: string;
    bankCode: string;
  }) => {
    if (!newVal || typeof newVal !== 'object') {
      options.value = [];
      selectValue.value = undefined;
      return;
    }

    selectValue.value = newVal.bankCode;

    if (!newVal.bankCode) {
      selectValue.value = undefined;
    }
  },
  { immediate: true },
);

handleLoadOptions('', true);
</script>
