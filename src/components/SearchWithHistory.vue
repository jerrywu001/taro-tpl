<template>
  <view class="search-with-history">
    <!-- 搜索框 -->
    <view class="search-header">
      <SearchInput
        v-model="searchValue"
        :placeholder="placeholder"
        :allow-clear="true"
        :full-width="false"
        bg-color="#f5f5f5"
      >
        <template #right>
          <view class="search-btn" @click="handleSearch">
            搜索
          </view>
        </template>
      </SearchInput>
    </view>

    <!-- 最近搜索 -->
    <view v-if="showHistory && recentSearches.length > 0" class="recent-section">
      <view class="section-header">
        <view class="section-title">
          最近搜索
        </view>
        <view class="delete-btn" @click.stop="handleDeleteHistory">
          <image
            class="delete-icon"
            src="https://lg5-prod-1314932667.cos.ap-nanjing.myqcloud.com/applet/erso-applet/iocn/%E5%88%A0%E9%99%A4.png"
            mode="aspectFit"
          />
        </view>
      </view>
      <view class="tag-list">
        <view
          v-for="item in recentSearches"
          :key="item"
          class="tag-item"
          @click="selectRecentSearch(item)"
        >
          {{ item }}
        </view>
      </view>
    </view>

    <!-- 默认插槽：用于显示搜索结果或其他内容 -->
    <slot
      :keyword="currentSearchKeyword"
      :has-searched="hasSearched"
    />
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import Taro from '@tarojs/taro';
import SearchInput from '@/components/SearchInput.vue';

// Props 定义
interface Props {
  // localStorage 的 key，用于存储搜索历史
  storageKey?: string;
  // 搜索占位符
  placeholder?: string;
  // 最大历史记录数量
  maxHistory?: number;
  // 是否显示搜索历史（可以通过外部控制）
  showHistory?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  storageKey: 'search_history',
  placeholder: '搜索关键词',
  maxHistory: 10,
  showHistory: true,
});

// Emits 定义
interface Emits {
  // 搜索事件，返回搜索关键词
  (e: 'search', keyword: string): void;
}

const emit = defineEmits<Emits>();

// 搜索值
const searchValue = ref('');

// 是否已经执行过搜索
const hasSearched = ref(false);

// 当前搜索的关键词
const currentSearchKeyword = ref('');

// 最近搜索记录
const recentSearches = ref<string[]>([]);

// 页面加载时从 localStorage 读取搜索历史
onMounted(() => {
  loadSearchHistory();
});

// 监听 storageKey 变化，重新加载历史记录
watch(() => props.storageKey, () => {
  loadSearchHistory();
});

// 从 localStorage 加载搜索历史
const loadSearchHistory = () => {
  try {
    const history = Taro.getStorageSync(props.storageKey);

    if (history && Array.isArray(history)) {
      recentSearches.value = history;
    } else {
      recentSearches.value = [];
    }
  } catch (error) {
    console.error('读取搜索历史失败:', error);
    recentSearches.value = [];
  }
};

// 保存搜索历史到 localStorage
const saveSearchHistory = (keyword: string) => {
  try {
    // 移除重复项
    const newHistory = recentSearches.value.filter((item) => item !== keyword);

    // 添加到开头
    newHistory.unshift(keyword);
    // 最多保存指定条数
    if (newHistory.length > props.maxHistory) {
      newHistory.pop();
    }
    // 更新状态
    recentSearches.value = newHistory;
    // 保存到 localStorage
    Taro.setStorageSync(props.storageKey, newHistory);
  } catch (error) {
    console.error('保存搜索历史失败:', error);
  }
};

// 执行搜索
const performSearch = (keyword: string) => {
  if (!keyword.trim()) {
    hasSearched.value = false;
    currentSearchKeyword.value = '';
    return;
  }

  // 记录当前搜索关键词
  currentSearchKeyword.value = keyword.trim();

  // 标记已执行搜索
  hasSearched.value = true;

  // 触发搜索事件
  emit('search', currentSearchKeyword.value);
};

// 处理搜索按钮点击
const handleSearch = () => {
  const keyword = searchValue.value.trim();

  if (!keyword) {
    Taro.showToast({
      title: '请输入搜索关键词',
      icon: 'none',
    });
    return;
  }

  // 保存到搜索历史
  saveSearchHistory(keyword);

  // 执行搜索
  performSearch(keyword);
};

// 选择最近搜索项
const selectRecentSearch = (item: string) => {
  searchValue.value = item;

  // 将选中的项移到第一位（不新增，只调整顺序）
  saveSearchHistory(item);

  // 直接执行搜索
  performSearch(item);
};

// 删除搜索历史
const handleDeleteHistory = () => {
  Taro.showModal({
    title: '提示',
    content: '确定要清空所有搜索历史吗？',
    success: (res) => {
      if (res.confirm) {
        // 清空搜索历史
        recentSearches.value = [];
        // 清空 localStorage
        try {
          Taro.removeStorageSync(props.storageKey);
          Taro.showToast({
            title: '已清空',
            icon: 'success',
            duration: 1500,
          });
        } catch (error) {
          console.error('清空搜索历史失败:', error);
        }
      }
    },
  });
};

// 暴露方法供父组件调用
defineExpose({
  performSearch,
  loadSearchHistory,
  clearSearch: () => {
    searchValue.value = '';
    hasSearched.value = false;
    currentSearchKeyword.value = '';
  },
  getSearchValue: () => searchValue.value,
  setSearchValue: (value: string) => {
    searchValue.value = value;
  },
});
</script>

<style lang="scss">
.search-with-history {
  width: 100%;
  min-height: calc(100vh - 260px);
  background-color: #f5f5f5;

  .search-header {
    background-color: #fff;
    padding-bottom: 24px;

    .search-btn {
      font-size: 28px;
      color: #333;
      padding: 0 8px;
      white-space: nowrap;

      &:active {
        opacity: 0.6;
      }
    }
  }

  .recent-section {
    margin-top: 24px;
    padding: 0 32px;

    .section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 24px;

      .section-title {
        font-weight: 600;
        font-size: 28px;
        color: #333;
      }

      .delete-btn {
        padding: 8px;
        display: flex;
        align-items: center;
        justify-content: center;

        &:active {
          opacity: 0.6;
        }

        .delete-icon {
          width: 28px;
          height: 28px;
        }
      }
    }

    .tag-list {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;

      .tag-item {
        padding: 12px 24px;
        background-color: #fff;
        border-radius: 8px;
        font-size: 24px;
        color: #666;

        &:active {
          opacity: 0.6;
        }
      }
    }
  }
}
</style>
