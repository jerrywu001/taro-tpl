<template>
  <div
    :id="`dynamic-${config.key}`"
    class="dynamic-number"
  >
    <nut-input
      v-if="!readonly"
      v-model="numberValue"
      clearable
      type="digit"
      :max-length="config.maxlength"
      :placeholder="config.placeholder || `请输入${config.label}`"
      :disabled="config.status === 1"
      @change="handleChange"
    />

    <span v-else>{{ numberValue || '-' }}</span>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { IDynamicComponent } from '..';
import { isNull } from '@/utils';

const props = defineProps<{
  readonly?: boolean;
  modelValue?: number;
  config: IDynamicComponent;
}>();

const emit = defineEmits(['update:modelValue', 'validate']);

// 将输入值转换为数字类型
const parseValue = (val: any): number | undefined => {
  if (val === '' || val === null || val === undefined) return undefined;
  const num = Number(val);

  return isNaN(num) ? undefined : num;
};

let inited = ref(false);
const numberValue = ref<number | undefined>(parseValue(props.modelValue));

const handleChange = () => {
  const val = isNull(numberValue.value) ? null : numberValue.value;

  if (val === null && !inited.value) {
    inited.value = true;
    return;
  }

  emit('update:modelValue', Number(val));
  emit('validate', props.config.key);
};

// 监听外部值变化
watch(() => props.modelValue, (newVal) => {
  const parsedValue = parseValue(newVal);

  if (parsedValue !== numberValue.value) {
    numberValue.value = parsedValue;
  }
}, { immediate: true });
</script>
