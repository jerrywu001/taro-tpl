<template>
  <safe-layout
    show-footer-tabbar
    :show-back-button="false"
    custom-nav
    bg-type="authscale"
  >
    <view class="mine-box">
      <view class="password-ico" @click="toEditPassPage">
        <text>密码管理11</text>
        <IconFont name="rect-right" />
      </view>
      <view class="customer-ico" @click="toHelpCenter">
        <text>帮助中心</text>
        <IconFont name="rect-right" />
      </view>
      <view class="logout-ico" @click="showLogoutDialog = true">
        <text>退出登录</text>
        <IconFont name="rect-right" />
      </view>
    </view>

    <nut-dialog
      content="<view style='color: #333; font-size: 36rpx;'>确定退出登录吗？</view>"
      :visible="showLogoutDialog"
      @cancel="showLogoutDialog = false"
      @ok="handleLogout"
    />
  </safe-layout>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Taro from '@tarojs/taro';
import { logout } from '@/api/login';
import { removeToken } from '@/api/request/auth';
import { IconFont } from '@nutui/icons-vue-taro';
import SafeLayout from '@/layout/SafeLayout.vue';

const showLogoutDialog = ref(false);

async function handleLogout() {
  await Taro.showToast({
    title: '退出中...',
    icon: 'loading',
  });

  try {
    await logout();
  } catch (error) {
    console.log((error as Error).message);
  }

  // 后端要求: 报错也退出
  showLogoutDialog.value = false;
  Taro.hideToast();
  removeToken();
  Taro.navigateTo({ url: '/pages/login/index' });
}

function toHelpCenter() {
  Taro.navigateTo({ url: '/package-common/help-center/index' });
}

function toEditPassPage() {
  Taro.navigateTo({ url: '/package-common/update-password/index' });
}
</script>

<style lang="scss">
.mine-box {
  border-radius: 12px;
  background-color: #fff;
  font-size: 28px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px 0;

  & > view {
    box-sizing: border-box;
    background-size: 40px 40px;
    background-position: 32px center;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 20px 32px 20px 80px;

    .nut-icon {
      color: #666;
      font-size: 26px;
    }

    &.password-ico {
      background-image: url(https://lg5-prod-1314932667.cos.ap-nanjing.myqcloud.com/applet/erso-applet/common/pass-ico.png);
    }

    &.customer-ico {
      background-image: url(https://lg5-prod-1314932667.cos.ap-nanjing.myqcloud.com/applet/erso-applet/common/customer-ico.png);
    }

    &.logout-ico {
      background-image: url(https://lg5-prod-1314932667.cos.ap-nanjing.myqcloud.com/applet/erso-applet/common/exit-ico.png);
    }

    &:active {
      opacity: 0.7;
    }
  }
}
</style>
