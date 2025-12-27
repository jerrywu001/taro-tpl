<template>
  <view class="product-search">
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
    <view v-if="recentSearches.length > 0 && searchResults.length === 0" class="recent-section">
      <view class="section-title">
        最近搜索
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

    <!-- 搜索结果 -->
    <view v-if="hasSearched && searchResults.length > 0" class="results-section">
      <slot name="results" :results="searchResults" :on-select="handleSelectItem">
        <!-- 默认结果展示 -->
        <view
          v-for="item in searchResults"
          :key="item.id"
          class="result-card"
          @click="handleSelectItem(item)"
        >
          <image class="result-image" :src="item.image" mode="aspectFit" />
          <view class="result-content">
            <view class="result-title">
              {{ item.brand }} {{ item.model }} {{ item.size }}
            </view>
            <view class="result-code">
              {{ item.code }}
            </view>
            <view class="result-price">
              官方指导价(¥): {{ item.price }}
            </view>
          </view>
        </view>
      </slot>
    </view>

    <!-- 空状态 -->
    <view v-if="hasSearched && searchResults.length === 0" class="empty-state">
      <slot name="empty" :keyword="currentSearchKeyword">
        <text class="empty-text">
          未找到"{{ currentSearchKeyword }}"相关的商品
        </text>
      </slot>
    </view>
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
  // 搜索数据源
  dataSource?: any[];
  // 搜索字段（用于匹配搜索关键词）
  searchField?: string;
  // 最大历史记录数量
  maxHistory?: number;
}

const props = withDefaults(defineProps<Props>(), {
  storageKey: 'search_history',
  placeholder: '搜索 品牌/系列/型号',
  dataSource: () => [],
  searchField: 'searchText',
  maxHistory: 10,
});

// Emits 定义
interface Emits {
  // 搜索事件，返回搜索关键词和结果
  (e: 'search', keyword: string, results: any[]): void;
  // 选中项事件
  (e: 'select', item: any): void;
}

const emit = defineEmits<Emits>();

// 搜索值
const searchValue = ref('');

// 是否已经执行过搜索
const hasSearched = ref(false);

// 当前搜索的关键词（用于空状态显示）
const currentSearchKeyword = ref('');

// 最近搜索记录
const recentSearches = ref<string[]>([]);

// 搜索结果
const searchResults = ref<any[]>([]);

// 页面加载时从 localStorage 读取搜索历史
onMounted(() => {
  loadSearchHistory();
});

// 监听数据源变化
watch(() => props.dataSource, () => {
  if (currentSearchKeyword.value) {
    performSearch(currentSearchKeyword.value);
  }
}, { deep: true });

// 从 localStorage 加载搜索历史
const loadSearchHistory = () => {
  try {
    const history = Taro.getStorageSync(props.storageKey);

    if (history && Array.isArray(history)) {
      recentSearches.value = history;
    }
  } catch (error) {
    console.error('读取搜索历史失败:', error);
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
    searchResults.value = [];
    hasSearched.value = false;
    currentSearchKeyword.value = '';
    return;
  }

  // 记录当前搜索关键词
  currentSearchKeyword.value = keyword.trim();

  // 标记已执行搜索
  hasSearched.value = true;

  // 执行搜索
  const searchLower = keyword.toLowerCase().trim();
  const results = props.dataSource.filter((item) => {
    const searchText = item[props.searchField] || '';

    return searchText.toLowerCase().includes(searchLower);
  });

  searchResults.value = results;

  // 触发搜索事件
  emit('search', currentSearchKeyword.value, results);
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
  // 直接执行搜索
  performSearch(item);
};

// 处理选中项
const handleSelectItem = (item: any) => {
  emit('select', item);
};

// 暴露方法供父组件调用
defineExpose({
  performSearch,
  clearSearch: () => {
    searchValue.value = '';
    searchResults.value = [];
    hasSearched.value = false;
    currentSearchKeyword.value = '';
  },
});
</script>

<style lang="scss">
.product-search {
  width: 100%;
  min-height: 100vh;
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

    .section-title {
      font-weight: 600;
      font-size: 28px;
      color: #333;
      margin-bottom: 24px;
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

  .results-section {
    padding: 0 32px;
    padding-top: 24px;

    .result-card {
      display: flex;
      background-color: #fff;
      border-radius: 16px;
      padding: 24px;
      margin-bottom: 24px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);

      &:active {
        opacity: 0.8;
      }

      .result-image {
        width: 160px;
        height: 160px;
        margin-right: 24px;
        background-color: #f5f5f5;
        border-radius: 12px;
        flex-shrink: 0;
      }

      .result-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 12px;

        .result-title {
          font-size: 28px;
          color: #333;
          font-weight: 500;
          line-height: 1.4;
        }

        .result-code {
          font-size: 24px;
          color: #999;
        }

        .result-price {
          font-size: 26px;
          color: #333;
          font-weight: 500;
        }
      }
    }
  }

  .empty-state {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 120px 0;

    .empty-text {
      font-size: 28px;
      color: #999;
    }
  }
}
</style>
