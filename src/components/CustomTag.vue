<template>
  <view
    :class="['custom-detail-item-tag', type, dark ? 'dark' : '']"
  >
    <slot />
  </view>
</template>

<script setup lang="ts">
import { TagType } from '@nutui/nutui-taro';
import { PropType } from 'vue';

const props = defineProps({
  type: {
    type: String as PropType<TagType>,
    default: 'success',
  },
  dark: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss">
.custom-detail-item-tag {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 24px;
  color: #fff;

  &.primary {
    color: #165DFF;
    background-color: #E8F3FF;
  }

  &.danger {
    color: #F53F3F;
    background-color: #FFECE8;
  }

  &.warning {
    color: #FF7D00;
    background-color: #FFF7E8;
  }

  &.success {
    color: #00B42A;
    background-color: #E8FFEA;

    &.dark {
      color: #00B42A;
      background-color: rgba(39, 195, 70, 0.20);
    }
  }

  &.default {
    color: #1D2129;
    background-color: #F2F3F5;
  }
}
</style>
