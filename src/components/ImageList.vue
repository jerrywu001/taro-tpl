<template>
  <div class="common-image-list">
    <template v-if="displayImages.length === 0">
      <div class="common-image-item null-image">
        暂无图片
      </div>
    </template>
    <template v-else>
      <div
        v-for="(item, index) in displayImages"
        :key="`${item.fileUrl}-${index}`"
        class="common-image-item"
        @click="(e) => previewImage(index, e)"
      >
        <IconFont v-if="loadingImages.has(index)" name="loading" />
        <!-- 图片正常显示 -->
        <image
          v-if="!errorImages.has(index)"
          :src="item.fileUrl"
          alt="image"
          mode="aspectFill"
          @load="loadingImages.delete(index)"
          @error="handleImageError(index)"
        />
        <!-- 图片加载失败显示 -->
        <view
          v-else
          class="error-image-placeholder"
        />
        <div
          v-if="showTotal && index === displayImages.length - 1"
          class="common-image-mask"
        >
          <span>共 {{ totalCount }} 张</span>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import Taro from '@tarojs/taro';
import { IFileInfo } from '@/types/pickup/save';
import { IconFont } from '@nutui/icons-vue-taro';
import { PropType, computed, ref, watch } from 'vue';

const props = defineProps({
  images: {
    type: Array as PropType<IFileInfo[]>,
    default: () => [],
  },
  /**
   * 大于等于 maxCount 时，显示共 x 张
   */
  maxCount: {
    type: Number,
    default: 4,
  },
  enablePreview: {
    type: Boolean,
    default: true,
  },
});

const displayImages = computed(() => (props.images || []).slice(0, Math.max(0, props.maxCount || 0)));
const totalCount = computed(() => (props.images || []).length);
const showTotal = computed(() => totalCount.value > (props.maxCount || 0));

const loadingImages = ref<Set<number>>(new Set());
const errorImages = ref<Set<number>>(new Set());

const handleImageError = (index: number) => {
  errorImages.value.add(index);
  loadingImages.value.delete(index);
};

const previewImage = (index: number, e: PointerEvent) => {
  e.stopPropagation();
  e.preventDefault();

  if (!props.enablePreview || errorImages.value.has(index)) return;

  Taro.previewImage({
    current: props.images[index].fileUrl,
    urls: props.images.map((v) => v.fileUrl || ''),
  });
};

watch(
  () => displayImages.value,
  (imgs) => {
    loadingImages.value.clear();
    errorImages.value.clear();

    if (imgs.length === 0) return;

    loadingImages.value = new Set(imgs.map((_, i) => i));
  },
  { immediate: true },
);
</script>

<style lang="scss">
.common-image-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.common-image-item {
  width: 112px;
  height: 112px;
  position: relative;

  &:active {
    opacity: 0.5;
  }

  img, image {
    border-radius: 8px;
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  &.null-image {
    font-size: 20px;
    color: #999;
    background-color: #eee;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .error-image-placeholder {
    background-image: url(https://lg5-prod-1314932667.cos.ap-nanjing.myqcloud.com/applet/erso-applet/common/no-image.png);
    background-size: 100% 100%;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .nut-icon-loading {
    color: #666;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -18px;
    margin-left: -18px;
  }
}

.common-image-mask {
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  color: #fff;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  border-radius: 8px;

  view {
  font-size: 20px;
    padding-bottom: 10px;
    padding-right: 12px;
  }
}
</style>
