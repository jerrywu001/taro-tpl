<template>
  <view class="add-field-box" :class="size">
    <view
      class="add-field-box-btn"
      @click="emit('click')"
    >
      <icon-font
        name="plus"
        size="20"
        color="#a28071"
      />
      <text class="add-field-box-text">
        {{ text }}
      </text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { IconFont } from '@nutui/icons-vue-taro';

const emit = defineEmits(['click']);

defineProps({
  text: {
    type: String,
    default: '添加',
  },
  size: {
    type: String as PropType<'' | 'small'>,
    default: '',
  },
});
</script>

<style lang="scss">
.add-field-box-btn {
  padding: 60px 0;
  background: #fff;
  border: 2px dashed #a28071;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.add-field-box-text {
  font-size: 28px;
  font-weight: 600;
  color: #a28071;
}

.add-field-box {
  margin-top: 16px;
  background-color: #fff;
  padding: 8px;
  border-radius: 12px;

  &:active {
    opacity: 0.7;
  }

  &.small {
    .add-field-box-btn {
      padding: 16px 0;
    }
  }
}
</style>
