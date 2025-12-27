<template>
  <div
    :id="`dynamic-${config.key}`"
    class="dynamic-image-upload"
    :class="{'readonly': readonly}"
  >
    <nut-uploader
      v-model:file-list="fileList"
      mode="aspectFill"
      :is-deletable="!readonly"
      :media-type="['image']"
      :disabled="config.status === 1"
      :url="UploadFileUrls.normal"
      :multiple="false"
      :maximum="config.limit"
      :accept="acceptMimes"
      :headers="{ authorization:`Bearer ${getToken()}` }"
      :data="{ bizType: 'product' }"
      :before-upload="onBeforeUpload"
      @file-item-click="handlePreview"
      @success="handleUploadSuccess"
      @failure="hanldeUploadError"
      @delete="({ index }) => handleDelete(index)"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, computed, nextTick } from 'vue';
import { IDynamicComponent } from '..';
import Taro from '@tarojs/taro';
import { UploadFileUrls } from '@/api';
import { getToken } from '@/api/request/auth';

const props = defineProps<{
  readonly?: boolean;
  modelValue?: string[];
  config: IDynamicComponent;
}>();

const emit = defineEmits(['update:modelValue', 'change', 'validate']);

const fileList = ref((props.modelValue || []).map((url) => ({
  url,
  type: 'image',
  status: 'success',
})));
const acceptMimes = computed(() => props.config?.accept || 'image/*');

const onBeforeUpload = (files: File[]) => {
  return new Promise((resolve) => {
    const file = files[0] as any;
    const fileType = 'image/' + file.tempFilePath.split('.').pop();
    const accept = props.config.accept || '';
    const acceptArr = accept.split(',');
    const acceptStrs = acceptArr.map((v) => v.replace('image/', '')).join('/');

    if (!acceptArr.includes(fileType)) {
      Taro.showToast({
        title: `只能上传${acceptStrs}格式文件`,
        icon: 'none',
      });
      resolve([]);
      return;
    }

    if (file.size / 1024 / 1024 > Number(props.config.maxFileSize || 0)) {
      Taro.showToast({
        title: `图片大小不能超过${props.config.maxFileSize}MB`,
        icon: 'none',
      });
      resolve([]);
      return;
    }

    if (!props.config.aspectRatio
      || !props.config.aspectRatio.length
      || !props.config.minWidth
    ) {
      resolve(files);
      return;
    }

    const src = file?.tempFilePath || file?.path || file?.url;

    const check = (width: number, height: number) => {
      const ratio = width / height;

      if (props.config.aspectRatio && !props.config.aspectRatio.includes(ratio)) {
        const formattedRatios = props.config.aspectRatio?.map((r) => {
          if (r === 1) return '1:1';
          if (r === 4 / 3) return '4:3';
          if (r === 3 / 4) return '3:4';
          if (r === 16 / 9) return '16:9';
          if (r === 9 / 16) return '9:16';
          return `${Number(r).toFixed(2)}`;
        }).join('或');

        Taro.showToast({
          title: `只能上传${formattedRatios}比例的图片`,
          icon: 'none',
        });
        resolve([]);
      } else if (width < Number(props.config.minWidth || 0)) {
        Taro.showToast({
          title: `图片宽度不能小于${props.config.minWidth}px`,
          icon: 'none',
        });
        resolve([]);
      } else {
        resolve(files);
      }
    };

    if (src) {
      // 小程序优先：通过临时文件路径获取图片信息
      Taro.getImageInfo({ src })
        .then(({ width, height }) => check(width, height))
        .catch(() => {
          Taro.showToast({
            title: '图片信息获取失败，请重试',
            icon: 'none',
          });
          resolve([]);
        });
      return;
    }

    // 其他环境无法判断尺寸时，直接通过
    resolve(files);
  });
};

function hanldeUploadError(err: any) {
  if (err?.errMsg && err?.errMsg.includes('fail cancel')) return;

  fileList.value = fileList.value.filter((v) => v.status === 'success');
  Taro.showToast({
    title: err?.response?.error || '上传失败，请稍后重试~',
    icon: 'none',
  });
}

function handleDelete(index = 0) {
  if (index > -1) {
    emit('change', fileList.value.map((v) => v.url));
    emit('update:modelValue', fileList.value.map((v) => v.url));
    emit('validate', props.config.key);
  }
}

function handleUploadSuccess(res) {
  const d = JSON.parse(res.data.data || '{}');

  nextTick(() => {
    fileList.value = [
      ...JSON.parse(JSON.stringify(fileList.value)) || [],
      {
        url: d?.context?.url,
        status: 'success',
        type: 'image',
      },
    ].filter((item) => !item.message);

    emit('change', fileList.value.map((item) => item.url));
    emit('update:modelValue', fileList.value.map((item) => item.url));
    emit('validate', props.config.key);
  });
}

function handlePreview({ fileItem }) {
  Taro.previewImage({
    current: fileItem.url,
    urls: fileList.value.map((v) => v.url),
  });
}

// 监听外部值变化
watch(() => props.modelValue, (newVal) => {
  fileList.value = (newVal || []).map((url) => ({
    url,
    type: 'image',
    status: 'success',
  }));
}, { immediate: true });
</script>

<style lang="scss">
.dynamic-image-upload {
  &.readonly {
    .nut-uploader__upload {
      display: none;
    }
  }
}
</style>
