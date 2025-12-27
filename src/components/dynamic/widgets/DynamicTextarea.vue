<template>
  <nut-textarea
    v-if="!readonly"
    :id="`dynamic-${config.key}`"
    v-model="inputValue"
    :placeholder="config.placeholder || `请输入${config.label}`"
    limit-show
    :max-length="config.maxlength || 60"
    :disabled="config.status === 1"
    @change="handleChange"
  />

  <span v-else>{{ inputValue || '-' }}</span>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { IDynamicComponent } from '..';

const props = defineProps<{
  readonly?: boolean;
  modelValue?: string;
  config: IDynamicComponent;
}>();

const emit = defineEmits(['update:modelValue', 'validate']);

let inited = ref(false);
const inputValue = ref(props.modelValue || '');

const handleChange = () => {
  const val = inputValue.value || null;

  if (val === null && !inited.value) {
    inited.value = true;
    return;
  }

  emit('update:modelValue', val);
  emit('validate', props.config.key);
};

// 监听外部值变化
watch(() => props.modelValue, (newVal) => {
  if (newVal !== inputValue.value) {
    inputValue.value = newVal || '';
  }
}, { immediate: true });
</script>
