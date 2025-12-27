<template>
  <nut-radio-group
    v-if="!readonly"
    :id="`dynamic-${config.key}`"
    v-model="radioValue"
    class="flex"
    :disabled="config.status === 1"
    @change="handleChange"
  >
    <nut-radio
      v-for="option in options"
      :key="option.value"
      :label="option.value"
      :disabled="option.disabled"
    >
      <span style="display: flex; align-items: center;">
        <span>{{ option.label }}</span>
        <span v-if="option.disabled && !config.hideDisabledTip" style="font-size: 20rpx;">（已停用）</span>
      </span>
    </nut-radio>
  </nut-radio-group>

  <view v-else>
    <text>{{ selectedOption?.label || '-' }}</text>
  </view>
</template>

<script lang="ts" setup>
import { ref, watch, computed } from 'vue';
import { IDynamicComponent } from '..';
import { isNull } from '@/utils';

const props = defineProps<{
  readonly?: boolean;
  modelValue?: string | number;
  config: IDynamicComponent;
}>();

const emit = defineEmits(['update:modelValue', 'validate']);

let inited = ref(false);
const radioValue = ref<string | number | undefined>(props.modelValue);
const selectedOption = computed(() => options.value.find((option) => option.value === radioValue.value));

/** 过滤出可用的选项 */
const options = computed(() => {
  if (!props.config.options || !Array.isArray(props.config.options)) {
    return [];
  }

  return props.config.options
    .map((option) => ({
      label: option.label,
      value: option.value,
      disabled: option.status === 1,
    }));
});

const handleChange = (value: string | number | null) => {
  const val = isNull(value) ? null : value;

  if (val === null && !inited.value) {
    inited.value = true;
    return;
  }

  emit('update:modelValue', val);
  emit('validate', props.config.key);
};

/** 监听外部值变化 */
watch(() => props.modelValue, (newVal) => {
  if (newVal !== radioValue.value) {
    radioValue.value = newVal;
  }
}, { immediate: true });
</script>
