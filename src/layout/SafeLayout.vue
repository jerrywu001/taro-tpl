<template>
  <view
    class="safe-layout"
    :class="[
      customClass,
      {
        'safe-layout-custom-nav': customNav,
        authscale: bgType === 'authscale',
        minebg: bgType === 'minebg',
        graybg: bgType === 'graybg',
        whitebg: bgType === 'whitebg',
        black: bgType === 'black',
        blacksacle: bgType === 'blacksacle',
        shortblack:bgType === 'shortblack',
      },
    ]"
    :style="{
      position: 'relative',
      boxSizing: 'border-box',
      height: `${contentH}px`,
      paddingTop: customNav ? `${totalNavHeight}px` : '0px',
    }"
  >
    <view
      v-if="customNav"
      class="safe-nav"
      :style="{
        top: `${statusBarHeight}px`,
        height: `${navHeight}px`,
        backgroundColor: customNavBg || undefined
      }"
    >
      <view
        class="nav-bar-left"
        :style="{
          height: `${navHeight}px`,
        }"
        @click="handleBack"
      >
        <slot v-if="!showBackButton" name="nav-left" />
        <IconFont
          v-else
          name="rect-left"
          :color="backButtonType === 'white' ? '#fff' : '#333'"
        />
      </view>

      <view
        class="nav-tabs"
      >
        <slot name="nav-tabs" />
      </view>

      <view
        class="nav-title"
      >
        <slot name="nav-title" />
      </view>
    </view>

    <view ref="subNavRef" class="sub-nav-wrapper">
      <slot name="sub-nav" />
    </view>

    <view
      class="safe-content"
      :style="{
        backgroundColor: contentBg || undefined
      }"
    >
      <view
        class="safe-content-inner"
        :class="{
          'no-padding': noPadding,
        }"
      >
        <slot />

        <view
          v-if="emptyPlaceholder"
          class="data-empty-placeholder"
        >
          <image class="empty-image" src="https://lg5-prod-1314932667.cos.ap-nanjing.myqcloud.com/applet/erso-applet/common/empty-placeholder.png" />
          <text class="empty-text">
            {{ emptyPlaceholder }}
          </text>
        </view>
      </view>

      <view
        v-if="showFooter"
        class="safe-content-footer"
        :class="{'footer-visibled': withFooter}"
      >
        <slot name="footer" />
      </view>
    </view>

    <tabbars v-if="showFooterTabbar" />
  </view>

  <root-portal v-if="showLoadingBox">
    <view class="sys-global-loading">
      <IconFont name="loading" />
      <view v-if="loadingContent">
        <text>{{ loadingContent }}</text>
      </view>
    </view>
    <view v-if="loadingState.mask" class="sys-global-loading-mask" />
  </root-portal>
</template>

<script lang="ts" setup>
import Taro from '@tarojs/taro';
import Tabbars from './Tabbars.vue';
import { showToast } from '@/utils';
import { IconFont } from '@nutui/icons-vue-taro';
import { useNavHeight } from '@/hooks/useNavHeight';
import { loadingState } from '@/hooks/useGlobalLoading';
import { computed, PropType, ref, useSlots, nextTick } from 'vue';

defineOptions({ inheritAttrs: false });

const subNavRef = ref();
const subNavHeight = ref(0);

const slots = useSlots();
const withFooter = computed(() => !!slots.footer);
const withSubNav = computed(() => !!slots['sub-nav']);

const showLoadingBox = computed(() => loadingState.singal > 0);
const loadingContent = computed(() => loadingState.content);

const getSubNavHeight = () => {
  if (!withSubNav.value) {
    subNavHeight.value = 0;
    return;
  }

  nextTick(() => {
    const query = Taro.createSelectorQuery();

    query
      .select('.sub-nav-wrapper')
      .boundingClientRect((rect: Taro.NodesRef.BoundingClientRectCallbackResult) => {
        if (rect) {
          subNavHeight.value = rect.height;
        }
      })
      .exec();
  });
};

const props = defineProps({
  /**
   * 自定义类名
   */
  customClass: {
    type: String,
    default: '',
  },
  /**
   * 是否自定义导航栏
   * @default false
   */
  customNav: {
    type: Boolean,
    default: false,
  },
  showFooter: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否显示底部导航栏
   * @default false
   */
  showFooterTabbar: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否显示返回按钮
   * @description 如果showBackButton为true，则自动隐藏 ‘nav-left’ 插槽，展示返回按钮
   * @description 如果showBackButton为false，则自动显示 ‘nav-left’ 插槽，隐藏返回按钮
   * @default true
   */
  showBackButton: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否显示左右内边距
   * @default false
   */
  noPadding: {
    type: Boolean,
    default: false,
  },
  customNavBg: {
    type: String,
    default: '',
  },
  contentBg: {
    type: String,
    default: '',
  },
  bgType: {
    type: String as PropType<'authscale' | 'minebg' | 'graybg' | 'whitebg' | 'blacksacle' | 'black' | 'shortblack'>,
    default: 'graybg',
  },
  emptyPlaceholder: {
    type: String,
    default: '',
  },
  backButtonType: {
    type: String as PropType<'default' | 'white'>,
    default: 'default',
  },
});

const {
  safeHeight,
  statusBarHeight,
  navHeight,
  totalNavHeight,
} = useNavHeight();

const realContentH = computed(() => safeHeight.value - totalNavHeight.value);

const contentH = computed(() => {
  return props.customNav ? safeHeight.value : realContentH.value;
});

const handleBack = () => {
  if (props.showBackButton) {
    Taro.navigateBack()
      .catch((err) => {
        showToast(err.errMsg);
      });
  }
};

getSubNavHeight();

Taro.onNetworkStatusChange((res) => {
  if (!res.isConnected) {
    showToast('网络连接异常');
  }
});
</script>
