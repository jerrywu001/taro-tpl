<template>
  <safe-layout
    custom-nav
    no-padding
    bg-type="whitebg"
    content-bg="#f5f5f5"
    show-footer-tabbar
    :show-back-button="false"
  >
    <template #nav-title>
      <text>消息</text>
    </template>

    <view>
      <view class="">
        <text>系统消息</text>
      </view>
    </view>
  </safe-layout>
</template>

<script lang="ts" setup>
import SafeLayout from '@/layout/SafeLayout.vue';
</script>
