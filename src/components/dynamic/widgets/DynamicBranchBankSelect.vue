<template>
  <!-- 支行下拉单选（统一为 Picker 弹窗交互） -->
  <div
    v-if="!readonly"
    :id="`dynamic-${config.key}`"
    class="dynamic-select"
    @click="chooseBranchBank"
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

  <span v-else>{{ modelValue?.bankBranch || '-' }}</span>

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
import { queryBranchBanks } from '@/api';
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
      bankCode?: string;
      bankBranch?: string;
      bankBranchCode?: string;
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
    default: '搜索支行',
  },
});

const emit = defineEmits(['update:modelValue', 'validate']);

const loading = ref(false);
const showSelecter = ref(false);
const selectValue = ref<string | undefined>(undefined);
const options = ref<IDynamicPicker[]>([]);
const searchKeyword = ref('');
const prevBankCode = ref('');

const withSearch = computed(() => props.enableSearch || props.config.enableSearch);
const selectedOption = computed(() => options.value.find((option) => String(option.value) === String(selectValue.value)));
const pickerValue = computed(() => selectedOption.value?.value ? [selectedOption.value.value] : []);
const displayName = computed(() => selectedOption.value?.label || props.modelValue?.bankBranch || '');

const { run: handleLoadOptions } = useDebounce(async (keyword: string, isFirstLoad = false) => {
  if (props.readonly) return;

  searchKeyword.value = keyword || '';
  await fetchOptions(searchKeyword.value, isFirstLoad);
}, 500);

function chooseBranchBank() {
  if (props.readonly) return;
  if (!props.modelValue?.bankCode) return showToast('请先选择开户银行');

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

async function fetchOptions(keyword = '', isFirstLoad = false) {
  loading.value = true;

  try {
    const items = await queryBranchBanks({
      bankCode: props.modelValue?.bankCode as string,
      cnapsName: keyword,
    });

    options.value = items.map((item) => ({
      label: item.cnapsName,
      value: item.cnapsCode,
      disabled: false,
      className: '',
    }));

    if (props.modelValue?.bankBranchCode) {
      selectValue.value = props.modelValue?.bankBranchCode;
    }

    if (isFirstLoad && selectValue.value && !selectedOption.value) {
      options.value.unshift({
        label: props.modelValue?.bankBranch || '',
        value: props.modelValue?.bankBranchCode || '',
        disabled: false,
        className: '',
      });
    }
  } catch (error) {
    console.error('获取支行列表失败', error);
  }
  loading.value = false;
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
    bankCode: props.modelValue?.bankCode as string,
    bankBranch: item.label,
    bankBranchCode: val,
  });
  emit('validate', props.config.key);
}

function clearSelect(e: PointerEvent) {
  e.stopPropagation();
  e.preventDefault();

  handleLoadOptions('');
  selectValue.value = undefined;

  emit('update:modelValue', {
    bankCode: props.modelValue?.bankCode as string,
    bankBranch: '',
    bankBranchCode: '',
  });
  emit('validate', props.config.key);
}

watch(
  () => props.modelValue,
  (newVal) => {
    if (!newVal || typeof newVal !== 'object' || !newVal.bankCode) {
      options.value = [];
      selectValue.value = undefined;
      return;
    }

    if (!newVal.bankBranchCode) {
      selectValue.value = undefined;
    }

    if (newVal.bankCode !== prevBankCode.value) {
      prevBankCode.value = newVal.bankCode;
      handleLoadOptions('', true);
    }
  },
  {
    immediate: true,
    deep: true,
  },
);
</script>
