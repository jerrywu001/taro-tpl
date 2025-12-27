<template>
  <view
    class="custom-link-button"
    :class="{
      disabled: props.disabled || sending,
    }"
    @click="onClick"
  >
    <text>{{ label }}</text>
  </view>
</template>

<script setup lang="ts">
import { useUnload } from '@tarojs/taro';
import { onBeforeUnmount, ref } from 'vue';

const emit = defineEmits(['send-sms']);

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  defaultLabel: {
    type: String,
    default: '获取验证码',
  },
  interval: {
    type: Number,
    default: 60,
  },
});

const label = ref(props.defaultLabel);
const sending = ref(false);
const loading = ref(false);
const timer = ref<any>(null);
const times = ref(props.interval);

function onClick() {
  if (props.disabled || sending.value) return;

  emit('send-sms');
}

function clearTimeInterval() {
  times.value = props.interval;
  label.value = props.defaultLabel;
  sending.value = false;
  clearInterval(timer.value);
  timer.value = null;
}

function showLoading() {
  loading.value = true;
  label.value = '发送中...';
}

function hideLoading() {
  loading.value = false;
  label.value = props.defaultLabel;
}

function countdown() {
  if (props.disabled || sending.value) return;

  clearTimeInterval();

  sending.value = true;
  loading.value = false;
  label.value = `${times.value}s后重发`;
  timer.value = setInterval(() => {
    if (times.value <= 1) {
      sending.value = false;
      clearTimeInterval();
    } else {
      label.value = `${--times.value}s后重发`;
    }
  }, 1000);
}

defineExpose({
  showLoading,
  hideLoading,
  clearTimeInterval,
  countdown,
  sending,
  loading,
});

onBeforeUnmount(() => {
  clearTimeInterval();
});

useUnload(() => {
  clearTimeInterval();
});
</script>

<style lang="scss">
.custom-link-button {
  color: #A28071;
  position: absolute;
  right: 0;
  top: 0;
  padding: 12px 0 12px 32px;
  height: 12px;
  line-height: 12px;
  font-size: 24px;
  border-radius: 8px;
  background-color: transparent;
  z-index: 6;

  &:active {
    opacity: 0.8;
  }

  &.disabled {
    color: #74ADFF;

    &:active {
      opacity: 1;
    }
  }
}
</style>
