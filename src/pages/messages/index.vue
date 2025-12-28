<template>
  <safe-layout
    custom-class="messages-wrapper"
    custom-nav
    no-padding
    bg-type="whitebg"
    content-bg="#f5f5f5"
    show-footer-tabbar
    :show-back-button="false"
  >
    <template #nav-title>
      <view class="messages-nav">
        <text class="messages-nav__title">
          消息中心
        </text>
        <view v-if="unreadCount > 0" class="messages-nav__badge">
          <text>{{ unreadCount }}</text>
        </view>
      </view>
    </template>

    <view class="messages-page">
      <view class="messages-section">
        <view class="messages-section__header">
          <text class="messages-section__title">
            通知消息
          </text>
        </view>

        <view class="messages-card">
          <view class="messages-card__head">
            <text class="messages-card__title">
              {{ notice.title }}
            </text>
            <text class="messages-card__time">
              {{ notice.time }}
            </text>
          </view>
          <text class="messages-card__content">
            {{ notice.content }}
          </text>
        </view>
      </view>

      <view class="messages-section">
        <view class="messages-section__header">
          <view class="messages-section__title-row">
            <text class="messages-section__title">
              新任务邀请
            </text>
            <view v-if="pendingCount > 0" class="messages-section__tag">
              <text>待处理 {{ pendingCount }}</text>
            </view>
          </view>
        </view>

        <view class="messages-task">
          <view class="messages-task__head">
            <view class="messages-task__label">
              <text>新订单</text>
            </view>
            <text class="messages-task__title">
              {{ invite.title }}
            </text>
          </view>

          <view class="messages-task__meta">
            <text class="messages-task__meta-strong">
              {{ invite.child }}
            </text>
            <text class="messages-task__dot">
              ·
            </text>
            <text class="messages-task__meta-muted">
              {{ invite.service }}
            </text>
          </view>

          <view class="messages-task__price">
            <text class="messages-task__currency">
              ¥
            </text>
            <text class="messages-task__amount">
              {{ invite.price }}
            </text>
          </view>

          <view class="messages-task__info">
            <view class="messages-task__info-text">
              <IconFont size="12" color="#999" name="clock" />
              {{ invite.timeRange }}
            </view>
            <view class="messages-task__info-text">
              <IconFont size="12" color="#999" name="locationg3" />
              {{ invite.location }}
            </view>
          </view>

          <view class="messages-task__actions">
            <nut-button type="warning" shape="square">
              <template #icon>
                <IconFont size="10" name="close" />
              </template>
              拒绝
            </nut-button>
            <nut-button type="warning" shape="square">
              <template #icon>
                <IconFont size="12" name="refresh" />
              </template>
              申请延时
            </nut-button>
            <nut-button type="primary" shape="square">
              <template #icon>
                <IconFont size="12" name="checklist" />
              </template>
              立即接单
            </nut-button>
          </view>
        </view>
      </view>
    </view>
  </safe-layout>
</template>

<script lang="ts" setup>
import { IconFont } from '@nutui/icons-vue-taro';
import SafeLayout from '@/layout/SafeLayout.vue';
import './index.scss';

const unreadCount = 2;
const pendingCount = 1;

const notice = {
  title: '平台安全提醒',
  time: '10:00',
  content: '请各位陪伴官注意，近期高温天气，户外陪伴请注意防暑降温，随身携带防暑药品。',
};

const invite = {
  title: '赵家长发布了任务',
  child: '3岁女孩',
  service: '临时看护',
  price: 90,
  timeRange: '2024-05-24 10:00-12:00',
  location: '碧桂园豪园',
};
</script>
