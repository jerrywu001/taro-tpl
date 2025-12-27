<template>
  <root-portal>
    <nut-popup
      v-model:visible="isVisible"
      position="bottom"
      safe-area-inset-bottom
      @close="handleCancel"
    >
      <view class="single-select">
        <slot name="top" />

        <!-- 单选Picker -->
        <nut-picker
          :model-value="selectedIndexes"
          :columns="pickerColumns"
          :title="title || '请选择'"
          @confirm="onPickerConfirm"
          @cancel="onPickerCancel"
        />

        <view style="height: 56rpx;" />
      </view>
    </nut-popup>
  </root-portal>
</template>

<script setup lang="ts">
import { IOptionItem } from '@/types/common';
import { ref, watch, computed } from 'vue';

const props = defineProps<{
  visible?: boolean;
  /** 选项列表 */
  options?: IOptionItem[];
  /** v-model 绑定选中的值 */
  modelValue?: string | number;
  /** 标题文案 */
  title?: string;
  /** 确认按钮文案 */
  confirmText?: string;
  /** 取消按钮文案 */
  cancelText?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | undefined): void;
  (e: 'change', value: string | number | undefined): void;
  (e: 'close'): void;
}>();

const isVisible = ref(!!props.visible);
const normalizedOptions = ref<IOptionItem[]>([...props.options || []]);
const selectedIndexes = ref<string[] | number[]>([]);

// 将选项转换为 Picker 需要的格式
const pickerColumns = computed(() => {
  return [
    normalizedOptions.value.map((option) => ({
      text: option.label,
      value: option.value,
      disabled: option.disabled,
    })),
  ];
});

// 根据 modelValue 计算当前选中的索引
const updateSelectedIndex = () => {
  if (props.modelValue === undefined || props.modelValue === null) {
    selectedIndexes.value = [];
    return;
  }

  const item = normalizedOptions.value.find(
    (option) => option.value === props.modelValue,
  );

  // @ts-ignore
  selectedIndexes.value = item?.value ? [item?.value] : [];
};

const handleCancel = () => {
  updateSelectedIndex();
  isVisible.value = false;
  emit('close');
};

const onPickerConfirm = ({ selectedOptions }: { selectedOptions: Array<{ value: string | number }> }) => {
  const selectedValue = selectedOptions[0]?.value;

  emit('change', selectedValue);
  emit('update:modelValue', selectedValue);
  isVisible.value = false;
};

const onPickerCancel = () => {
  handleCancel();
};

watch(
  () => props.visible,
  (newVal) => {
    isVisible.value = !!newVal;
    if (newVal) {
      updateSelectedIndex();
    }
  },
  { immediate: true },
);

watch(
  () => props.modelValue,
  () => {
    updateSelectedIndex();
  },
  { immediate: true },
);

watch(
  () => props.options,
  (newVal) => {
    normalizedOptions.value = [...newVal || []];
    updateSelectedIndex();
  },
  {
    deep: true,
    immediate: true,
  },
);
</script>

<style lang="scss">
.single-select {
  padding: 12px;

  .picker-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 4px 24px 12px;

    .title {
      font-size: 32px;
    }

    .cancel {
      color: var(--color-text-2, #666);
    }
  }
}
</style>
