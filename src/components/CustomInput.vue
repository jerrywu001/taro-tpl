<template>
  <view class="custom-input-item">
    <template v-if="enableTogglePassword">
      <input
        v-if="type === 'password'"
        v-model="modelValue"
        type="password"
        :placeholder="placeholder"
        :maxlength="maxlength"
        @input="handleInput"
      >

      <input
        v-else
        v-model="modelValue"
        type="text"
        :placeholder="placeholder"
        :maxlength="maxlength"
        @input="handleInput"
      >
    </template>
    <template v-else>
      <input
        v-model="modelValue"
        :type="type"
        :placeholder="placeholder"
        :maxlength="maxlength"
        @input="handleInput"
      >
    </template>

    <div class="slot-right">
      <slot name="right" />

      <view
        v-if="showClear && modelValue"
        class="custom-input-icon"
        @click="modelValue = ''"
      >
        <Image src="https://lg5-prod-1314932667.cos.ap-nanjing.myqcloud.com/applet%2Faplit-app%2Fclose.png" />
      </view>

      <view
        v-if="enableTogglePassword"
        class="custom-input-icon"
        @click="togglePassword"
      >
        <Image
          v-if="type === 'password'"
          src="https://lg5-prod-1314932667.cos.ap-nanjing.myqcloud.com/applet%2Faplit-app%2Fpassword-hide.png"
        />

        <Image
          v-if="type === 'text'"
          src="https://lg5-prod-1314932667.cos.ap-nanjing.myqcloud.com/applet%2Faplit-app%2Fpassword-open.png"
        />
      </view>
    </div>
  </view>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';

defineProps({
  placeholder: {
    type: String,
    default: '',
  },
  type: {
    type: String as PropType<'text' | 'number' | 'password'>,
    default: 'text',
  },
  showClear: {
    type: Boolean,
    default: false,
  },
  enableTogglePassword: {
    type: Boolean,
    default: false,
  },
  maxlength: {
    type: Number,
    default: 100,
  },
});

const emit = defineEmits(['update:modelValue', 'toggle-password']);

const modelValue = defineModel<string | number>();

function handleInput(e: Event) {
  const value = (e.target as HTMLInputElement).value;

  emit('update:modelValue', value);
}

function togglePassword() {
  emit('toggle-password');
}
</script>

<style lang="scss">
.custom-input-item {
  position: relative;
  display: flex;
  justify-content: space-between;
  font-size: 28px;
  height: 80px;
  line-height: 80px;
  margin-bottom: 28px;
  border-bottom: 1px solid #ccc;

  input {
    width: calc(100% - 60rpx);
    height: 100%;
    color: #333;
  }

  .slot-right {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    gap: 8px;
  }

  .custom-input-icon {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 50px;
    height: 48px;

    image {
      width: 48px;
      height: 100%;
    }

    &:active {
      opacity: 0.8;
    }
  }
}
</style>
