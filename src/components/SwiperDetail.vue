<template>
  <nut-swiper
    :init-page="2" :auto-play="5000" pagination-visible pagination-color="#333"
    pagination-unselected-color="#D9D9D9" :is-prevent-default="false"
    :stop-propagation="false"
    @change="onChange"
  >
    <nut-swiper-item v-for="(item, index) in list" :key="index" :style="{height: `${mainHeight}px`}">
      <view
        class="swiper-detail"
        :style="{height: `${mainHeight-20}px`, backgroundColor: bgColor}"
        @click="handleClick(item, index)"
      >
        <custom-fields :detail="item" :items="infoFileds" />
      </view>
    </nut-swiper-item>
  </nut-swiper>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  bgColor: {
    type: String,
    default: '#fff',
  },
  mainHeight: {
    type: Number,
    default: 200,
  },
  list: {
    type: Array as any,
    default: () => [1],
  },
  info: {
    type: Object,
    default: () => ({}),
  },
  infoFileds: {
    type: Array as any,
    default: () => [],
  },
});

const currentIndex = ref(1);

const emit = defineEmits(['change', 'click']);

function handleClick(item, index) {
  emit('click', item, index);
}

function onChange(index) {
  currentIndex.value = index + 1;
  emit('change', currentIndex.value);
}

</script>
<style lang="scss">
.swiper-detail {
  border-radius: 8px;
  padding:0 24px ;
}

.nut-swiper-pagination .h5-i {
  width: 12px !important;
  height: 12px !important;
  margin-right: 16px !important;
  border-radius: 50% !important;
}

.nut-swiper-pagination {
  bottom: 0 !important;
}
</style>
