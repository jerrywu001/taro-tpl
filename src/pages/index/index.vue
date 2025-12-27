<template>
  <safe-layout
    custom-class="index"
    custom-nav
    no-padding
    bg-type="whitebg"
    show-footer-tabbar
    :show-back-button="false"
  >
    <template #nav-title>
      <text>56456</text>
    </template>

    <view class="index-container">
      <text class="sdf">
        asdf
      </text>
    </view>

    <view class="sdf">
      saas
    </view>

    <!-- 隐私弹框 -->
    <nut-dialog
      v-model:visible="showPrivacy"
      no-ok-btn
      no-cancel-btn
      pop-class="privacy-dialog"
      :pop-style="{ width: '556rpx', height: 'auto' }"
      :close-on-click-overlay="false"
    >
      <view
        class="privacy"
      >
        <view class="privacy-title">
          <text>隐私政策</text>
        </view>
        <view class="privacy-content">
          <text>
            感谢您使用本产品，您使用本产品前应当仔细阅读并同意
          </text>
          <view style="display: inline;color: #37f;" @click="() => Taro.openPrivacyContract()">
            <text>{{ privacyContractName }}</text>
          </view>
          <text>
            ，当您点击同意并开始使用产品服务时，即表示您已理解并阅读该条款内容，该条款对您产生法律约束力。如您拒绝，将无法更好的体验本产品。
          </text>
        </view>
        <view class="privacy-btns">
          <view class="privacy-btns-item" @click="showPrivacy = false">
            <text>拒绝</text>
          </view>
          <button class="privacy-btns-item" open-type="agreePrivacyAuthorization" @click="agreePrivacyAuth">
            <text>同意</text>
          </button>
        </view>
      </view>
    </nut-dialog>
  </safe-layout>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { shareConfig } from '@/utils';
import SafeLayout from '@/layout/SafeLayout.vue';
import Taro, { useDidShow, usePullDownRefresh, useShareAppMessage, useShareTimeline } from '@tarojs/taro';
import './index.scss';

const showPrivacy = ref(false);
const privacyContractName = ref('');

function agreePrivacyAuth() {
  showPrivacy.value = false;
}

useDidShow(() => {
  Taro.getPrivacySetting({
    success: (res) => {
      privacyContractName.value = res.privacyContractName;

      if (res.needAuthorization) {
        Taro.showToast({
          title: '请先授权定位',
          icon: 'none',
        });

        showPrivacy.value = true;
        return;
      }

      console.log(res, '已同意协议');
    },
  });
});

usePullDownRefresh(() => {
  Taro.stopPullDownRefresh();
});

useShareTimeline(() => shareConfig);
useShareAppMessage(() => shareConfig);
</script>
