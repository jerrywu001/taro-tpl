<template>
  <nut-checkbox-group
    v-if="!readonly"
    :id="`dynamic-${config.key}`"
    v-model="checkboxValues"
    :disabled="config.status === 1"
    @change="handleChange"
  >
    <nut-checkbox
      v-for="option in options"
      :key="option.value"
      :label="String(option.value || '')"
      :disabled="option.disabled"
    >
      <span style="display: flex; align-items: center;">
        <span>{{ option.label }}</span>
        <span v-if="option.disabled && !config.hideDisabledTip" style="font-size: 20rpx;">（已停用）</span>
      </span>
    </nut-checkbox>
  </nut-checkbox-group>

  <view v-else>
    <text>{{ selectedOptions.map((opt) => opt.label).join(', ') || '-' }}</text>
  </view>
</template>

<script lang="ts" setup>
import { ref, watch, computed } from 'vue';
import { IDynamicComponent } from '..';
import { isNull } from '@/utils';

const props = defineProps<{
  readonly?: boolean;
  modelValue?: (string | number)[];
  config: IDynamicComponent;
}>();

const emit = defineEmits(['update:modelValue', 'validate']);

let inited = ref(false);
/** 初始化复选框值，确保是数组类型 */
const checkboxValues = ref<(string | number)[]>(Array.isArray(props.modelValue) ? props.modelValue : []);
const selectedOptions = computed(() => options.value.filter((option) => checkboxValues.value.includes(option.value)));

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

const handleChange = (values: (string | number)[]) => {
  const val = isNull(values) ? [] : values;

  if (val.length === 0 && !inited.value) {
    inited.value = true;
    return;
  }

  emit('update:modelValue', val);
  emit('validate', props.config.key);
};

/** 监听外部值变化 */
watch(() => props.modelValue, (newVal) => {
  checkboxValues.value = Array.isArray(newVal) ? newVal : [];
}, { immediate: true });
</script>
