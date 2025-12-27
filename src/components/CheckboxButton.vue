<template>
  <view class="checkbox-button-box" @click="handleClick">
    <view :class="['checkbox-button', { 'checked': isChecked, 'disabled': disabled }]">
      <IconFont v-if="isChecked" name="Check" />
    </view>
    <slot />
  </view>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { IconFont } from '@nutui/icons-vue-taro';

const isChecked = ref<boolean>(false);

const emit = defineEmits(['change']);

const props = defineProps({
  value: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

function handleClick() {
  if (props.disabled) return;

  const newValue = !isChecked.value;

  isChecked.value = newValue;
  emit('change', newValue);
}

watch(
  () => props.value,
  (newValue) => {
    isChecked.value = newValue;
  },
  { immediate: true },
);
</script>

<style lang="scss">
.checkbox-button-box {
  width: auto;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  height: 44px;
}

.checkbox-button {
  width: 32px;
  height: 32px;
  border: 1px solid #d2d2d2;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  .nut-icon {
    color: #fff;
    font-size: 20px;
  }

  &.checked {
    background-color: var(--primary-color);
    border-color: var(--primary-color);
  }

  &.disabled {
    background-color: #f9f9f9;
    border-color: #efeeee;
    opacity: .7;
  }
}
</style>
