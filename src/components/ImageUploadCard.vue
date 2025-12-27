<template>
  <div
    class="image-upload-card"
    :class="{ readonly }"
  >
    <nut-uploader
      ref="uploaderRef"
      :file-list="fileList"
      mode="aspectFill"
      :is-deletable="!readonly"
      :media-type="['image']"
      :disabled="disabled"
      :url="uploadUrl"
      :multiple="false"
      :maximum="1"
      :accept="acceptMimes"
      :headers="{ authorization: `Bearer ${getToken()}` }"
      :data="{
        ...uploadData,
        bizType: 'product'
      }"
      :before-upload="onBeforeUpload"
      @success="handleUploadSuccess"
      @failure="handleUploadError"
    >
      <template #default>
        <view
          v-if="!fileImage"
          class="iuc-placeholder"
          :style="placeholderStyle"
        >
          <view class="iuc-placeholder-content">
            <view class="iuc-icon-wrapper" />

            <text v-if="placeholderText" class="iuc-placeholder-text">
              {{ placeholderText }}
            </text>
          </view>
        </view>
        <view
          v-else
          class="iuc-placeholder"
          :style="{
            backgroundColor: props.backgroundColor,
          }"
          @click="handlePreview"
        >
          <view
            class="iuc-placeholder-content iuc-image"
            :style="placeholderStyle"
          >
            <view
              v-if="!readonly && !disabled"
              class="iuc-icon-wrapper delete-icon"
              @click="(e) => handleDelete(0, e)"
            />
          </view>
        </view>
      </template>
    </nut-uploader>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, computed } from 'vue';
import Taro from '@tarojs/taro';
import { UploadFileUrls } from '@/api';
import { getToken } from '@/api/request/auth';
import { hideLoading, showLoading } from '@/utils';
import { Uploader } from '@nutui/nutui-taro';

const props = withDefaults(defineProps<{
  /** 上传的图片 URL */
  modelValue?: string;
  /** Placeholder 文案 */
  placeholderText?: string;
  /** Placeholder 背景图片 URL */
  placeholderBg?: string;
  /** 是否只读模式 */
  readonly?: boolean;
  /** 是否禁用上传 */
  disabled?: boolean;
  /** 接受的文件类型 */
  accept?: string;
  /** 上传接口地址 */
  uploadUrl?: string;
  /** 上传数据 */
  uploadData?: Record<string, any>;
  /** 最大文件大小（MB） */
  maxFileSize?: number;
  /** 背景图片大小 */
  backgroundSize?: string;
  /** 背景图片位置 */
  backgroundPosition?: string;
  /** 背景颜色 */
  backgroundColor?: string;
}>(), {
  modelValue: '',
  placeholderText: '请上传图片',
  placeholderBg: '',
  accept: 'image/jpeg,image/png,image/jpg,image/bmp',
  uploadUrl: UploadFileUrls.normal,
  uploadData: () => ({} as Record<string, any>),
  maxFileSize: 5,
  backgroundPosition: '50% 50%',
  backgroundSize: 'contain',
  backgroundColor: '#f5f5f5',
});

const emit = defineEmits(['update:modelValue', 'success']);

const fileImage = ref('');

const uploaderRef = ref<InstanceType<typeof Uploader>>();

const uploadUrl = computed(() => props.uploadUrl);
const uploadData = computed(() => props.uploadData || { bizType: 'product' });
const acceptMimes = computed(() => props.accept || 'image/*');

const fileList = computed(() => fileImage.value
  ? [
    {
      url: fileImage.value,
      type: 'image',
      status: 'success',
    },
  ]
  : []);

const placeholderStyle = computed(() => {
  if (!fileImage.value) {
    return {
      backgroundColor: 'transparent',
      backgroundSize: props.backgroundSize,
      backgroundImage: props.placeholderBg ? `url(${props.placeholderBg})` : 'none',
    };
  }

  return {
    backgroundRepeat: 'no-repeat',
    backgroundColor: props.backgroundColor,
    backgroundPosition: props.backgroundPosition,
    backgroundSize: props.backgroundSize,
    backgroundImage: `url(${fileImage.value})`,
  };
});

const onBeforeUpload = (files: File[]) => {
  return new Promise((resolve) => {
    const file = files[0] as any;
    const fileType = 'image/' + file.tempFilePath.split('.').pop();
    const acceptArr = acceptMimes.value.split(',');
    const acceptStrs = acceptArr.map((v) => v.replace('image/', '')).join('/');

    if (!acceptArr.includes(fileType)) {
      Taro.showToast({
        title: `只能上传${acceptStrs}格式文件`,
        icon: 'none',
      });
      resolve([]);
      return;
    }

    if (props.maxFileSize && file.size / 1024 / 1024 > props.maxFileSize) {
      Taro.showToast({
        title: `图片大小不能超过${props.maxFileSize}MB`,
        icon: 'none',
      });
      resolve([]);
      return;
    }

    const src = file?.tempFilePath || file?.path || file?.url;

    if (!src) {
      resolve([]);
      return;
    }

    showLoading();
    resolve(files);
  });
};

function handleUploadSuccess(res: any) {
  hideLoading();
  const data = JSON.parse(res.data.data || '{}');
  const imageUrl = data?.context?.picResult?.picUrl;

  if (data?.code !== 0) {
    fileImage.value = '';
    uploaderRef.value?.clearUploadQueue();
    Taro.showToast({
      title: data?.message || '上传失败，请稍后重试~',
      icon: 'none',
    });
    return false;
  }

  if (imageUrl) {
    fileImage.value = imageUrl;

    emit('success', data.context || {});
    emit('update:modelValue', fileImage.value);
  }
}

function handleUploadError(err: any) {
  hideLoading();
  if (err?.errMsg?.includes('fail cancel')) return;

  fileImage.value = '';
  Taro.showToast({
    title: err?.response?.error || '失败，请稍后重试~',
    icon: 'none',
  });
}

function handleDelete(index = 0, e: PointerEvent) {
  e.stopPropagation();
  e.preventDefault();

  if (index > -1) {
    fileImage.value = '';
    emit('success', {});
    emit('update:modelValue', fileImage.value);
  }
}

function handlePreview() {
  Taro.previewImage({
    current: fileImage.value,
    urls: [fileImage.value],
  });
}

// 监听外部值变化
watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal) {
      fileImage.value = newVal;
    } else {
      fileImage.value = '';
    }
  },
  { immediate: true },
);
</script>

<style lang="scss">
.image-upload-card {
  margin-top: 24px;
  width: 654px;
  height: 340px;

  &:active {
    opacity: .8;
  }

  .iuc-placeholder {
    background-repeat: no-repeat;
    border-radius: 16px;
    background-size: cover;
  }

  .iuc-icon-wrapper {
    width: 88px;
    height: 88px;
    background-image: url(https://lg5-prod-1314932667.cos.ap-nanjing.myqcloud.com/applet/erso-applet/iocn/uploader-icon.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    margin-bottom: 22px;

    &.delete-icon {
      background-image: url(https://lg5-prod-1314932667.cos.ap-nanjing.myqcloud.com/applet/erso-applet/iocn/remove-upload-icon.png);
    }
  }

  .iuc-placeholder-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    text {
      font-size: 28px;
      color: #333;
    }
  }

  .iuc-placeholder-content,
  .iuc-placeholder,
  .nut-uploader__slot,
  .nut-uploader {
    height: 100%;
    width: 100%;
  }
}
</style>
