<template>
  <safe-layout
    custom-nav
    no-padding
    bg-type="whitebg"
  >
    <!-- <template #nav-title>
      <text>登录</text>
    </template> -->

    <view class="common-form-content login-content">
      <view class="common-form-content-title">
        <text>欢迎登录二手合规通！</text>
      </view>

      <view class="common-form-content-form">
        <custom-input
          v-model="form.username"
          placeholder="请输入登录手机号"
          type="number"
          :maxlength="11"
          :show-clear="!!form.username"
        />
      </view>

      <view class="common-form-content-form">
        <custom-input
          v-model="form.password"
          placeholder="请输入密码"
          :type="passwordType"
          enable-toggle-password
          @toggle-password="togglePasswordType"
        />
      </view>
    </view>

    <view class="login-content-protocol">
      <nut-checkbox v-model="agreeProtocol" />

      <view class="login-content-protocol-box">
        <view @click="agreeProtocol = !agreeProtocol">
          <text>
            我已阅读并同意
          </text>
        </view>
        <view @click="handleProtocol(false)">
          <text class="login-content-protocol-item sys-link">
            《用户协议》
          </text>
        </view>
        <text>和</text>
        <view @click="handleProtocol(true)">
          <text class="login-content-protocol-item sys-link">
            《隐私协议》
          </text>
        </view>
      </view>
    </view>

    <nut-button
      class="common-form-content-button"
      type="primary"
      :loading="loading"
      @click="resolveLogin"
    >
      登录
    </nut-button>

    <!-- 登录成功，选择归属租户 -->
    <nut-popup v-model:visible="showChooseClient" position="bottom">
      <nut-picker
        :columns="clients"
        title="请选择归属租户"
        @confirm="chooseClient"
        @cancel="showChooseClient = false"
      />
    </nut-popup>

    <nut-dialog
      :content="`<view style='color: #333; font-size: 28rpx; min-height: 120rpx;'>${errorMsg}！${redirectLink}</view>`"
      :visible="showErrorDialog"
      ok-text="复制链接"
      @cancel="showErrorDialog = false"
      @ok="copyLink"
    />
  </safe-layout>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Taro from '@tarojs/taro';
import { useThrottle } from '@/hooks';
import { ILoginClient } from '@/types/login';
import SafeLayout from '@/layout/SafeLayout.vue';
import { CustomInput } from '@/components';
import { GlobalKeys } from '@/types/common';
import { checkPhone, checkSmsCode } from '@/utils/validate';
import { hideLoading, hideToast, showLoading, showToast } from '@/utils';
import { doLogin, queryClients } from '@/api/login';
import { removeToken, saveCurrentShop, saveStaffName, setToken } from '@/api/request/auth';

interface IPickerItem {
  text: string;
  value: string;
}

const form = ref({
  username: '',
  code: '',
  password: '',
});

const loading = ref(false);
const passwordMode = ref(true);
const agreeProtocol = ref(false);
const showErrorDialog = ref(false);
const showChooseClient = ref(false);
const passwordType = ref<'password' | 'text'>('password');
const clients = ref<IPickerItem[]>([]);

const redirectLink = ref('');
const errorMsg = ref('');

const { run: resolveLogin } = useThrottle(handleLogin, 1000);

/**
 * 处理登录逻辑
 */
async function handleLogin() {
  if (!form.value.username) return showToast('请输入手机号');
  if (checkPhone(form.value.username)) return showToast('登录手机号格式不正确');

  if (passwordMode.value && !form.value.password) return showToast('请输入密码');
  if (passwordMode.value && (form.value.password.length < 6 || form.value.password.length > 20)) return showToast('请输入6-20位密码');

  if (!passwordMode.value && !form.value.code) return showToast('请输入短信验证码');
  if (!passwordMode.value && checkSmsCode(form.value.code)) return showToast('短信验证码格式不正确');

  if (!agreeProtocol.value) return showToast('请先阅读并同意《用户协议》和《隐私协议》');

  loading.value = true;

  try {
    await continueLogin();
  } catch (error) {
    loading.value = false;
    showToast((error as Error).message);
  }
}

async function continueLogin() {
  try {
    if (passwordMode.value) {
      const items = await queryClients({
        phone: form.value.username,
        password: form.value.password,
      });

      clients.value = items.map((item) => ({
        text: item.tenantName,
        value: item.clientId,
        clientId: item.clientId,
      }));
      Taro.setStorageSync(GlobalKeys.Clients, JSON.stringify(items));

      if (items.length === 0) {
        removeToken();
        return showToast('登录用户不存在');
      }

      if (items.length === 1) {
        await doSwitchClient(items[0]);
        return;
      }

      // 选择应用进行登录
      showChooseClient.value = true;
      return;
    }

    // TODOW: 验证码暂未设计
    console.log('验证码暂未设计');
  } catch (error) {
    removeToken();
    showToast((error as Error).message);
  } finally {
    loading.value = false;
  }
}

async function chooseClient({ selectedOptions }) {
  const client = selectedOptions[0] as ILoginClient;

  showLoading('登录中...');

  await doSwitchClient(client);
}

async function doSwitchClient(client: ILoginClient, showMsg = true) {
  try {
    const res = await doLogin({
      phone: form.value.username,
      password: form.value.password,
      clientId: client.clientId,
    });

    if (!res.shopId) {
      redirectLink.value = res.redirectUri as string;
      errorMsg.value = res.msg as string;
      showErrorDialog.value = true;
      showChooseClient.value = false;

      hideToast();
      hideLoading();
      removeToken();

      return;
    }

    hideLoading();
    setToken(res.token);
    saveStaffName(res.staffName);
    saveCurrentShop({
      shopName: res.shopName,
      shopId: res.shopId,
    });

    if (showMsg) showToast('登录成功');
    showChooseClient.value = false;
    Taro.setStorageSync(GlobalKeys.CurrentClient, JSON.stringify(client));

    setTimeout(() => {
      hideToast();
      Taro.switchTab({ url: '/pages/index/index' });
    }, 600);
  } catch (error) {
    hideLoading();
    showToast((error as Error).message);
  }
}

function copyLink() {
  Taro.setClipboardData({
    data: redirectLink.value,
    success: () => showToast('链接复制成功'),
  });
}

function handleProtocol(privacy = false) {
  Taro.navigateTo({ url: !privacy ? '/package-common/protocol/index' : '/package-common/privacy/index' });
}

function togglePasswordType() {
  passwordType.value = passwordType.value === 'password' ? 'text' : 'password';
}
</script>

<style lang="scss">
.login-content {
  &-protocol {
    display: flex;
    align-items: center;
    justify-content: start;
    font-size: 24px;
    color: #666;
    padding: 0 64px 32px;

    &-box {
      display: flex;
      align-items: center;
      justify-content: start;
    }

    .nut-checkbox {
      margin-right: -12px;
    }

    &-item {
      color: var(--primary-color);
    }
  }

  &-footer {
    font-size: 24px;
    display: flex;
    justify-content: space-between;
    padding: 32px 64px 64px;

    &-item {
      cursor: pointer;
      color: #999;

      &.primary {
        color: var(--primary-color);
      }

      &:active {
        opacity: 0.8;
      }
    }
  }
}
</style>
