<template>
  <root-portal>
    <nut-popup v-model:visible="isVisible" position="bottom" safe-area-inset-bottom @close="handleCancel">
      <view class="mutiple-select">
        <view class="picker-header">
          <view class="action cancel" @click="handleCancel">
            <text>{{ cancelText || '取消' }}</text>
          </view>
          <text class="title">
            {{ title || '请选择' }}
          </text>
          <view class="action confirm" @click="handleConfirm">
            <text>{{ confirmText || '确认' }}</text>
          </view>
        </view>

        <slot name="top" />

        <!-- 多选列表 -->
        <nut-checkbox-group v-model="selectedValues">
          <view
            v-for="option in normalizedOptions"
            :key="String(option.value)"
            class="select-item"
          >
            <nut-checkbox
              :label="String(option.value)"
              :disabled="option.disabled"
            >
              <text class="item-label">
                {{ option.label }}
              </text>

              <!-- 额外信息插槽：传递当前选项 -->
              <slot name="extra-label" :option="option" />
            </nut-checkbox>
          </view>
        </nut-checkbox-group>

        <view style="height: 56rpx;" />
      </view>
    </nut-popup>
  </root-portal>
</template>

<script setup lang="ts">
import { IOptionItem } from '@/types/common';
import { ref, watch } from 'vue';

const props = defineProps<{
  visible?: boolean;
  /** 选项列表 */
  options?: IOptionItem[];
  /** v-model 绑定选中的值 */
  modelValue?: (string | number)[];
  /** 标题文案 */
  title?: string;
  /** 确认按钮文案 */
  confirmText?: string;
  /** 取消按钮文案 */
  cancelText?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: (string | number)[]): void;
  (e: 'change', value: (string | number)[]): void;
  (e: 'close'): void;
}>();

const isVisible = ref(!!props.visible);
const normalizedOptions = ref<IOptionItem[]>([...props.options || []]);
const selectedValues = ref<(string | number)[]>(Array.isArray(props.modelValue) ? [...props.modelValue] : []);

const handleCancel = () => {
  selectedValues.value = Array.isArray(props.modelValue) ? [...props.modelValue] : [];
  isVisible.value = false;
  emit('close');
};

const handleConfirm = () => {
  const newValues = [...selectedValues.value];

  emit('change', [...newValues]);
  emit('update:modelValue', [...newValues]);
  isVisible.value = false;
};

watch(
  () => props.visible,
  (newVal) => {
    isVisible.value = !!newVal;
  },
  { immediate: true },
);

watch(
  () => props.modelValue,
  (newVal) => {
    selectedValues.value = Array.isArray(newVal) ? [...newVal] : [];
  },
  { immediate: true },
);

watch(
  () => props.options,
  (newVal) => {
    const diffOptions = (newVal || []).filter((opt) => !normalizedOptions.value.some((o) => o.value === opt.value));

    normalizedOptions.value.push(...diffOptions);
    selectedValues.value.push(...diffOptions.map((opt) => opt.value) as (string | number)[]);
  },
  { deep: true },
);
</script>

<style lang="scss">
.mutiple-select {
  padding: 12px;

  .nut-checkbox-group {
    width: 100%;
    max-height: 600px;
    overflow-y: auto;
  }

  .select-add-box {
    margin: 16px 0 22px;
  }

  .picker-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 4px 12px;

    .title {
      font-size: 32px;
    }

    .cancel {
      color: var(--color-text-2, #666);
    }
  }

  .select-item {
    padding: 12px 50px;
  }

  .nut-checkbox {
    width: 100%;
  }

  .nut-checkbox__label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    flex: 1;
  }

  .item-label {
    color: var(--color-text-1, #1a1a1a);
  }

  .extra-label {
    font-size: 24px;
    color: var(--color-text-3, #999);
  }

  .nut-checkbox__icon--disable {
    color: #dad7d7;
  }

  .nut-checkbox__label--disabled {
    text {
      color: #999;
    }
  }
}
</style>
