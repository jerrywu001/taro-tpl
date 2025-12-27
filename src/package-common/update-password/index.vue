<!-- eslint-disable vue/v-on-event-hyphenation -->
<template>
  <safe-layout bg-type="graybg" show-back-button no-padding>
    <view class="update-password-page">
      <view class="input-card">
        <!-- 新密码输入框 -->
        <view class="input-row">
          <view class="input-label">
            新密码
          </view>
          <input
            v-if="!newPasswordVisible"
            v-model="formData.newPassword"
            type="password"
            placeholder="请输入新密码"
            class="input-field"
            :maxlength="20"
          >
          <input
            v-else
            v-model="formData.newPassword"
            type="text"
            placeholder="请输入新密码"
            class="input-field"
            :maxlength="20"
          >
          <view
            class="input-icon"
            @click="togglePasswordVisible('new')"
          >
            <Image
              v-if="newPasswordVisible"
              src="https://lg5-prod-1314932667.cos.ap-nanjing.myqcloud.com/applet%2Faplit-app%2Fpassword-open.png"
            />
            <Image
              v-else
              src="https://lg5-prod-1314932667.cos.ap-nanjing.myqcloud.com/applet%2Faplit-app%2Fpassword-hide.png"
            />
          </view>
        </view>

        <view class="divider" />

        <!-- 修改密码（确认密码）输入框 -->
        <view class="input-row">
          <view class="input-label">
            修改密码
          </view>
          <input
            v-if="!confirmPasswordVisible"
            v-model="formData.confirmPassword"
            type="password"
            placeholder="请输入修改密码"
            class="input-field"
            :maxlength="20"
          >
          <input
            v-else
            v-model="formData.confirmPassword"
            type="text"
            placeholder="请输入新密码"
            class="input-field"
            :maxlength="20"
          >
          <view
            class="input-icon"
            @click="togglePasswordVisible('confirm')"
          >
            <Image
              v-if="confirmPasswordVisible"
              src="https://lg5-prod-1314932667.cos.ap-nanjing.myqcloud.com/applet%2Faplit-app%2Fpassword-open.png"
            />
            <Image
              v-else
              src="https://lg5-prod-1314932667.cos.ap-nanjing.myqcloud.com/applet%2Faplit-app%2Fpassword-hide.png"
            />
          </view>
        </view>

        <view class="divider" />
      </view>

      <view class="password-hint">
        密码必须包含字母(大小写)、数字、特殊字符其中两种
      </view>

      <nut-button
        type="primary"
        shape="square"
        block
        :loading="isSubmitting"
        @click="handleSubmit"
      >
        确定
      </nut-button>
    </view>
  </safe-layout>
</template>

<script lang="ts" setup>
import Taro from '@tarojs/taro';
import { ref, reactive } from 'vue';
import { removeToken } from '@/api/request/auth';
import SafeLayout from '@/layout/SafeLayout.vue';
import { showToast, hideLoading } from '@/utils';
import { logout, updatePassword } from '@/api/login';
import './index.scss';

const PASSWORD_REGEX = /(?!^\d+$)(?!^[A-Za-z]+$)(?!^[^A-Za-z0-9]+$)(?!^.*[\u4E00-\u9FA5].*$)^\S{6,20}$/;

const formData = reactive({
  newPassword: '',
  confirmPassword: '',
});

const newPasswordVisible = ref(false);
const confirmPasswordVisible = ref(false);
const isSubmitting = ref(false);

function validateNewPassword() {
  const password = formData.newPassword.trim();

  if (!password) {
    showToast('请输入新密码');
    return false;
  }

  if (password.length < 6) {
    showToast('新密码长度不能小于6位');
    return false;
  }

  if (!PASSWORD_REGEX.test(password)) {
    showToast('密码须含字母(大小写)、数字、特殊字符其中两种', undefined, 3000);
    return false;
  }

  return true;
}

function validateConfirmPassword() {
  const confirm = formData.confirmPassword.trim();

  if (!confirm) {
    showToast('请输入修改密码');
    return false;
  }

  if (confirm.length < 6) {
    showToast('修改密码长度不能小于6位');
    return false;
  }

  if (confirm !== formData.newPassword.trim()) {
    showToast('两次输入的密码不一致');
    return false;
  }

  if (!PASSWORD_REGEX.test(confirm)) {
    showToast('密码须含字母(大小写)、数字、特殊字符其中两种', undefined, 3000);
    return false;
  }

  return true;
}

function validateForm() {
  let isConfirmPasswordValid = true;
  const isNewPasswordValid = validateNewPassword();

  if (isNewPasswordValid) {
    isConfirmPasswordValid = validateConfirmPassword();
  }

  return isNewPasswordValid && isConfirmPasswordValid;
}

function togglePasswordVisible(field: 'new' | 'confirm') {
  if (field === 'new') {
    newPasswordVisible.value = !newPasswordVisible.value;
  } else {
    confirmPasswordVisible.value = !confirmPasswordVisible.value;
  }
}

async function handleSubmit() {
  if (!validateForm() || isSubmitting.value) return;

  isSubmitting.value = true;

  try {
    await updatePassword(formData.newPassword.trim());
    await logout();

    hideLoading();
    removeToken();
    showToast('修改成功');

    setTimeout(() => {
      Taro.navigateBack();
    }, 1500);
  } catch (error) {
    hideLoading();
    const errMsg = (error as Error).message;

    showToast(errMsg || '密码修改失败，请稍后再试');
  } finally {
    isSubmitting.value = false;
  }
}
</script>
