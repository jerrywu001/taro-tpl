<template>
  <view class="sd-form-field goods-cate-selector column baseline">
    <view class="sd-form-field-label">
      <text style="color: #f00;">
        *
      </text>
      <text>商品类目</text>
    </view>
    <view class="sd-form-field-value dynamic-item">
      <dynamic-select-single
        v-model="selectedCategory"
        :config="categoryConfig"
        @update:model-value="handleCategoryChange"
      />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { showToast } from '@/utils';
import { ref, computed, watch } from 'vue';
import { queryCategoryList } from '@/api/pickup';
import { IDynamicComponent } from '@/components/dynamic';
import DynamicSelectSingle from '@/components/dynamic/widgets/DynamicSelectSingle.vue';

interface ICategory {
  id: string;
  name: string;
}

const props = defineProps({
  modelValue: {
    type: String,
    default: undefined,
  },
});

const emit = defineEmits(['update:modelValue', 'change']);

const selectedCategory = ref<string | undefined>(props.modelValue);
const categories = ref<ICategory[]>([]);
const loading = ref(false);

/** 分类配置 */
const categoryConfig = computed(() => ({
  key: 'categoryId',
  label: '商品类目',
  componentType: 'SELECT_SINGLE',
  status: 0,
  options: categories.value.map((category) => ({
    label: category.name,
    value: category.id,
    status: 0,
  })),
} as IDynamicComponent));

function handleCategoryChange(value: string) {
  const category = categories.value.find((c) => c.id === value);

  emit('change', category);
  emit('update:modelValue', value);
}

async function loadCategories() {
  loading.value = true;

  try {
    const data = await queryCategoryList('LEAF', 'ENABLED');

    categories.value = data || [];
  } catch (error) {
    showToast((error as Error).message);
  } finally {
    loading.value = false;
  }
}

watch(
  () => props.modelValue,
  (value) => {
    selectedCategory.value = value;
  },
  { immediate: true },
);

defineExpose({ getCateById: (id: string) => categories.value.find((c) => String(c.id) === String(id)) });

loadCategories();
</script>

<style lang="scss">
.goods-cate-selector {
  .select-value {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .nut-icon-rect-right {
      font-size: 22px;
      color: #999;
    }
  }

  .dynamic-label {
    color: #666;
    font-size: 28px;
    margin-bottom: 16px;
  }

  .dynamic-select {
    font-size: 28px;
  }

  .dynamic-item {
    .select-placeholder {
      padding: 22px 0;
    }

    .select-value {
      padding: 12px 0;
    }
  }

  &:active {
    opacity: .7;
  }
}
</style>
