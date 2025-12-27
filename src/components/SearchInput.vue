<template>
  <view class="common-search" @click="emit('click')">
    <view
      class="common-search-box"
      :class="{ 'full-width': fullWidth }"
      :style="{ backgroundColor: bgColor }"
    >
      <view class="common-search-input">
        <view class="common-search-icon">
          <IconFont name="search" />
        </view>

        <view class="common-search-input-text">
          <input
            v-model="modelValue"
            class="common-search-input-text-input"
            :placeholder="placeholder"
            :readOnly="readOnly"
            @input="searchHandler"
          >

          <view
            v-if="allowClear && showClearIcon"
            class="common-input-clear"
            @click="clearInput"
          >
            <Image src="https://lg5-prod-1314932667.cos.ap-nanjing.myqcloud.com/applet%2Faplit-app%2Fclose.png" />
          </view>
        </view>
      </view>
    </view>

    <slot name="right" />
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDebounce } from '@/hooks';
import { IconFont } from '@nutui/icons-vue-taro';

defineProps({
  bgColor: {
    type: String,
    default: '#fff',
  },
  /**
   * 输入框占位符
   * @default '输入关键字搜索'
   */
  placeholder: {
    type: String,
    default: '输入关键字搜索',
  },
  /**
   * 是否显示清除按钮
   * @default false
   */
  allowClear: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否全宽
   * @default false
   */
  fullWidth: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否只读
   * @default false
   */
  readOnly: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue', 'change', 'click']);

const { run: searchHandler } = useDebounce((evt: InputEvent) => {
  handleInput((evt.target as HTMLInputElement).value);
}, 500);

const modelValue = defineModel<string | number>();

const showClearIcon = computed(() => !!modelValue.value);

function handleInput(value: string) {
  emit('update:modelValue', value);
  emit('change', value);
}

function clearInput() {
  modelValue.value = '';
  emit('change', '');
}
</script>

<style lang="scss">
.common-search {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 24px;
  box-sizing: border-box;

  &-box {
    color: #999;
    font-size: 24px;
    border-radius: 36px;
    height: 62px;
    padding: 0 26px;
    width: calc(100% - 128px);

    &.full-width {
      width: 100%;
    }
  }

  &-input {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 12px;
    height: 100%;

    .common-input-clear {
      width: 44px;
      height: 44px;
      position: absolute;
      right: 2px;
      top: 10px;

      image {
        width: 100%;
        height: 100%;
      }

      &:active {
        opacity: 0.6;
      }
    }
  }

  &-input-text {
    flex: 1;
    height: 100%;
    position: relative;

    &-input {
      color: #333;
      font-size: 24px;
      width: calc(100% - 50px);
      height: 100%;
      box-sizing: border-box;
      padding: 8px 0;
    }
  }
}
</style>
