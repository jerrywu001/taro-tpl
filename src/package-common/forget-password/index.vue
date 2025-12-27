<template>
  <safe-layout
    custom-nav
    no-padding
    bg-type="authscale"
    :show-back-button="false"
  >
    <view class="common-form-content">
      <view class="common-form-content-title">
        <text>忘记密码</text>
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

      <template v-if="!stepTwo">
        <view class="common-form-content-form">
          <custom-input
            v-model="form.code"
            placeholder="请输入短信验证码"
            type="number"
            :maxlength="6"
          >
            <template #right>
              <sms-button
                ref="smsBtnRef"
                @send-sms="sendSms"
              />
            </template>
          </custom-input>
        </view>
      </template>

      <template v-else>
        <view class="common-form-content-form">
          <custom-input
            v-model="form.newPassword"
            placeholder="请输入新密码"
            :type="newPasswordType"
            enable-toggle-password
            @toggle-password="toggleNewPasswordType"
          />

          <custom-input
            v-model="form.confirmPassword"
            placeholder="请确认新密码"
            :type="confirmPasswordType"
            enable-toggle-password
            @toggle-password="toggleConfirmPasswordType"
          />
        </view>
      </template>
    </view>

    <view class="common-form-content-div" />

    <nut-button
      class="common-form-content-button"
      type="primary"
      :loading="loading"
      @click="doLogin"
    >
      确定
    </nut-button>
  </safe-layout>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Taro from '@tarojs/taro';
import { showToast } from '@/utils';
import { useThrottle } from '@/hooks';
import { ESmsType } from '@/types/common';
import SafeLayout from '@/layout/SafeLayout.vue';
import { CustomInput, SmsButton } from '@/components';
import { checkPhone, checkSmsCode } from '@/utils/validate';
import { findPassword, sendNotLoginSmscode, verifyFindPassword } from '@/api/login';

let token = '';

const form = ref({
  username: '',
  code: '',
  newPassword: '',
  confirmPassword: '',
});

const loading = ref(false);
const stepTwo = ref(false);
const smsBtnRef = ref<InstanceType<typeof SmsButton>>();
const newPasswordType = ref<'text' | 'password'>('password');
const confirmPasswordType = ref<'text' | 'password'>('password');

const { run: doLogin } = useThrottle(submitForm, 1000);
const { run: sendSms } = useThrottle(handleSendSms, 1000);

/**
 * 提交表单
 */
async function submitForm() {
  if (!form.value.username) return showToast('请输入手机号');
  if (checkPhone(form.value.username)) return showToast('手机号格式不正确');

  if (!stepTwo.value && !form.value.code) return showToast('请输入短信验证码');
  if (!stepTwo.value && checkSmsCode(form.value.code)) return showToast('短信验证码格式不正确');

  if (stepTwo.value && !form.value.newPassword) return showToast('请输入新密码');
  if (stepTwo.value && !form.value.confirmPassword) return showToast('请输入确认密码');
  if (stepTwo.value && (form.value.newPassword.length < 6 || form.value.newPassword.length > 20)) return showToast('请输入6-20位新密码');
  if (stepTwo.value && (form.value.confirmPassword.length < 6 || form.value.confirmPassword.length > 20)) return showToast('请输入6-20位确认密码');
  if (stepTwo.value && form.value.newPassword !== form.value.confirmPassword) return showToast('新密码和确认密码不一致，请重新输入');

  loading.value = true;

  try {
    if (!stepTwo.value) {
      const res = await findPassword({
        username: form.value.username,
        code: form.value.code,
      });

      token = res.token;
      stepTwo.value = true;
    } else {
      await verifyFindPassword({
        token,
        username: form.value.username,
        newPassword: form.value.newPassword,
      });

      showToast('密码修改成功, 请重新登录');

      setTimeout(() => {
        Taro.navigateBack();
      }, 2000);
    }
  } catch (error) {
    showToast((error as Error).message);
  } finally {
    loading.value = false;
  }
}

/**
 * 发送短信验证码
 */
async function handleSendSms() {
  if (checkPhone(form.value.username)) return showToast('手机号格式不正确');

  try {
    smsBtnRef.value?.showLoading();

    await sendNotLoginSmscode(form.value.username, ESmsType.FindPass);

    smsBtnRef.value?.countdown();
    showToast('验证码发送成功');
  } catch (error) {
    smsBtnRef.value?.hideLoading();
    showToast((error as Error).message);
  }
}

function toggleNewPasswordType() {
  newPasswordType.value = newPasswordType.value === 'text' ? 'password' : 'text';
}

function toggleConfirmPasswordType() {
  confirmPasswordType.value = confirmPasswordType.value === 'text' ? 'password' : 'text';
}
</script>
