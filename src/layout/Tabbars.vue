<template>
  <nut-tabbar
    v-model="active"
    class="footer-bar"
    @tab-switch="tabSwitch"
  >
    <nut-tabbar-item tab-title="首页" :to="tabs[0]" :class="{ active: routePath === tabs[0] }">
      <template #icon>
        <img :src="routePath === tabs[0] ? icons.home.active : icons.home.unactive" alt="">
      </template>
    </nut-tabbar-item>
    <nut-tabbar-item tab-title="消息" :to="tabs[1]" :value="messageCount" :class="{ active: routePath === tabs[1] }">
      <template #icon>
        <img :src="routePath === tabs[1] ? icons.messages.active : icons.messages.unactive" alt="">
      </template>
    </nut-tabbar-item>
    <nut-tabbar-item tab-title="我的" :to="tabs[2]" :class="{ active: routePath === tabs[2] }">
      <template #icon>
        <img :src="routePath === tabs[2] ? icons.mine.active : icons.mine.unactive" alt="">
      </template>
    </nut-tabbar-item>
  </nut-tabbar>
</template>

<script lang="ts" setup>
import Taro from '@tarojs/taro';
import { ref } from 'vue';

const active = ref(0);

const messageCount = ref(2);

const tabs = [
  'pages/index/index',
  'pages/messages/index',
  'pages/mine/index',
];

const icons = {
  home: {
    active: 'https://lg5-prod-1314932667.cos.ap-nanjing.myqcloud.com/applet/erso-applet/common/home-active.png',
    unactive: 'https://lg5-prod-1314932667.cos.ap-nanjing.myqcloud.com/applet%2Ftabbars%2Fhome.png',
  },
  messages: {
    active: 'https://lg5-prod-1314932667.cos.ap-nanjing.myqcloud.com/applet/erso-applet/common/home-active.png',
    unactive: 'https://lg5-prod-1314932667.cos.ap-nanjing.myqcloud.com/applet%2Ftabbars%2Fhome.png',
  },
  mine: {
    active: 'https://lg5-prod-1314932667.cos.ap-nanjing.myqcloud.com/applet/erso-applet/common/mine-active.png',
    unactive: 'https://lg5-prod-1314932667.cos.ap-nanjing.myqcloud.com/applet%2Ftabbars%2Fmine.png',
  },
};

const currentPage = Taro.getCurrentInstance().page || {} as Taro.PageInstance;
// @ts-ignore
const routePath = currentPage?.route || '';

const tabSwitch = (item: { to: string }) => {
  Taro.switchTab({ url: `/${item.to}` });
};
</script>

<style lang="scss">
.nut-tabbar-item {
  color: #999;

  image {
    width: 46px !important;
    height: 46px !important;
  }

  &.active {
    color: #333;
  }
}
</style>
