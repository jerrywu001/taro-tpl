<template>
  <safe-layout
    custom-class="index"
    custom-nav
    no-padding
    bg-type="index-bg"
    content-bg="#fff"
    show-footer-tabbar
    :show-back-button="false"
  >
    <!-- 顶部橙色区域 -->
    <view class="index-header">
      <view class="index-header__bg">
        <view class="index-header__circle index-header__circle--1" />
        <view class="index-header__circle index-header__circle--2" />
        <view class="index-header__circle index-header__circle--3" />
      </view>
      <view class="index-header__content">
        <text class="index-header__title">
          成为认证陪伴官
        </text>
        <text class="index-header__subtitle">
          利用课余时间 · 发挥专业特长 · 赚取生活费
        </text>
      </view>
    </view>

    <!-- 三个特点卡片 -->
    <view class="index-features">
      <view class="index-features__item">
        <view class="index-features__icon index-features__icon--time">
          <text class="iconfont">
            ⏰
          </text>
        </view>
        <text class="index-features__title">
          时间自由
        </text>
        <text class="index-features__desc">
          按需接单
        </text>
      </view>
      <view class="index-features__item">
        <view class="index-features__icon index-features__icon--money">
          <text class="iconfont">
            💰
          </text>
        </view>
        <text class="index-features__title">
          报酬丰厚
        </text>
        <text class="index-features__desc">
          日结周结
        </text>
      </view>
      <view class="index-features__item">
        <view class="index-features__icon index-features__icon--safe">
          <text class="iconfont">
            ✅
          </text>
        </view>
        <text class="index-features__title">
          安全保障
        </text>
        <text class="index-features__desc">
          全程保险
        </text>
      </view>
    </view>

    <!-- 入驻流程 -->
    <view class="index-process">
      <text class="index-process__title">
        入驻流程
      </text>
      <view class="index-process__list">
        <view v-for="(item, idx) in processList" :key="idx" class="index-process__item">
          <view class="index-process__step">
            <text>{{ idx + 1 }}</text>
          </view>
          <view class="index-process__info">
            <text class="index-process__name">
              {{ item.title }}
            </text>
            <text class="index-process__desc">
              {{ item.desc }}
            </text>
          </view>
        </view>
      </view>
    </view>

    <!-- 底部按钮 -->
    <template #footer>
      <view class="index-footer">
        <nut-button
          type="warning"
          shape="square"
          block
          @click="handleApply"
        >
          立即申请入驻
        </nut-button>
      </view>
    </template>

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

/** 入驻流程列表 */
const processList = [
  {
    title: '入驻申请',
    desc: '填写个人基本信息，上传学籍证明',
  },
  {
    title: '岗前安全考试',
    desc: '在线学习安全知识，完成考试',
  },
  {
    title: '平台审核',
    desc: '工作人员将在1-3个工作日内审核',
  },
  {
    title: '开始接单',
    desc: '审核通过后即可浏览附近任务',
  },
];

/** 立即申请入驻 */
function handleApply() {
  Taro.navigateTo({ url: '/pages/apply/index' });
}

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
