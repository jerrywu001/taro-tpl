<template>
  <!-- 品牌型号系列级联选择 -->
  <div
    :id="`dynamic-${config.key}`"
    class="dynamic-condition-brand-model-series"
  >
    <div v-if="!readonly" class="flex flex-row gap-2">
      <!-- 品牌选择 -->
      <nut-form-item
        class="dynamic-item"
        label="品牌"
        :prop="config.key"
        :required="config.required"
      >
        <div v-if="config.status === 1 && !config.hideDisabledTip" class="disabled-msg">
          属性已停用
        </div>
        <dynamic-select
          v-model="brandValue"
          :config="brandConfig"
          enable-search
          search-placeholder="搜索品牌"
          @update:model-value="handleBrandChange"
        />

        <div v-if="allEmpty" class="cbms__error__tips">
          请选择品牌
        </div>
      </nut-form-item>

      <!-- 系列选择 -->
      <nut-form-item
        class="dynamic-item no-required"
        label="系列"
        :prop="config.key"
      >
        <dynamic-select
          v-model="seriesValue"
          :config="seriesConfig"
          enable-search
          search-placeholder="搜索系列"
          @update:model-value="handleSeriesChange"
        />
      </nut-form-item>

      <!-- 型号选择 -->
      <nut-form-item
        class="dynamic-item no-required"
        label="型号"
        :prop="config.key"
      >
        <dynamic-select
          v-model="modelVal"
          :config="modelConfig"
          enable-search
          search-placeholder="搜索型号"
          @update:model-value="handleModelChange"
        />
      </nut-form-item>
    </div>

    <div v-else class="flex flex-row gap-1">
      <nut-form-item
        class="dynamic-item"
        label="品牌"
        :prop="config.key"
        :required="config.required"
      >
        <div v-if="config.status === 1 && !config.hideDisabledTip" class="disabled-msg">
          属性已停用
        </div>
        <text>
          {{ selectedBrand }}
        </text>
      </nut-form-item>
      <nut-form-item
        class="dynamic-item no-required"
        label="系列"
        :prop="config.key"
      >
        <text>
          {{ selectedSeries }}
        </text>
      </nut-form-item>
      <nut-form-item
        class="dynamic-item no-required"
        label="型号"
        :prop="config.key"
      >
        <text>
          {{ selectedModel }}
        </text>
      </nut-form-item>
    </div>
  </div>
</template>

<script lang="ts" setup>
import DynamicSelect from './DynamicSelectSingle.vue';
import { ref, watch, computed } from 'vue';
import { IDynamicComponent, IDynamicError } from '..';
import { isNull } from '@/utils';
import { EStatus } from '@/types/common';
import { IBrandItem } from '@/types/goods/brand';
import { ISeriesItem } from '@/types/goods/series';
import { IModelItem } from '@/types/goods/model';
import { queryBrandList } from '@/api/goods/brand';
import { querySeriesList } from '@/api/goods/series';
import { queryModelList } from '@/api/goods/model';

let inited = false;

const emit = defineEmits(['update:modelValue', 'validate']);

const props = defineProps<{
  readonly?: boolean;
  modelValue?: [string, string, string];
  config: IDynamicComponent;
  extraParams?: Record<string, any>;
}>();

const loadingBrand = ref(false);
const loadingSeries = ref(false);
const loadingModel = ref(false);

const brandValue = ref<string | undefined>(undefined);
const seriesValue = ref<string | undefined>(undefined);
const modelVal = ref<string | undefined>(undefined);

const brandList = ref<IBrandItem[]>([]);
const seriesList = ref<ISeriesItem[]>([]);
const modelList = ref<IModelItem[]>([]);

const brandOptions = computed(() => {
  return brandList.value.map((item) => ({
    value: item.id,
    label: `${item.nameEn}/${item.nameZh}`,
    status: item.status === EStatus.DISABLED ? 1 : item.status === EStatus.ENABLED ? 0 : null,
  }));
});
const brandConfig = computed(() => ({
  key: 'brand',
  label: '品牌',
  options: brandOptions.value,
  status: props.config.status,
} as IDynamicComponent));

const seriesOptions = computed(() => {
  return seriesList.value
    .map((item) => ({
      value: item.id,
      label: item.name,
      status: item.status === EStatus.DISABLED ? 1 : item.status === EStatus.ENABLED ? 0 : null,
    }));
});

const seriesConfig = computed(() => ({
  key: 'series',
  label: '系列',
  options: seriesOptions.value,
  // 当未选择品牌时禁用系列选择
  status: isNull(brandValue.value) ? 1 : props.config.status,
} as IDynamicComponent));

const modelOptions = computed(() => {
  return modelList.value
    .map((item) => ({
      value: item.id,
      label: item.name,
      status: item.status === EStatus.DISABLED ? 1 : item.status === EStatus.ENABLED ? 0 : null,
    }));
});

const modelConfig = computed(() => ({
  key: 'model',
  label: '型号',
  options: modelOptions.value,
  // 当未选择品牌时禁用系列选择
  status: isNull(brandValue.value) ? 1 : props.config.status,
} as IDynamicComponent));

const selectedBrand = computed(() => {
  const item = brandList.value.find((item) => String(item.id) === String(brandValue.value));

  return `${item?.nameZh || ''}/${item?.nameEn || ''}`;
});

const selectedSeries = computed(() => {
  const item = seriesList.value.find((item) => String(item.id) === String(seriesValue.value));

  return item?.name || '';
});

const selectedModel = computed(() => {
  const item = modelList.value.find((item) => String(item.id) === String(modelVal.value));

  return item?.name || '';
});

const allEmpty = computed(() => {
  let vals = [
    isNull(brandValue.value) ? null : brandValue.value,
    isNull(seriesValue.value) ? null : seriesValue.value,
    isNull(modelVal.value) ? null : modelVal.value,
  ];

  if (vals.every((val) => isNull(val))) {
    vals = [];
  }

  return vals.length === 0;
});

function updateModelValue() {
  let vals = [
    isNull(brandValue.value) ? '' : String(brandValue.value),
    isNull(seriesValue.value) ? '' : String(seriesValue.value),
    isNull(modelVal.value) ? '' : String(modelVal.value),
  ];

  if (vals.every((val) => isNull(val))) {
    vals = [];
  }

  emit('update:modelValue', vals);
  emit('validate', props.config.key);
}

async function handleBrandChange(value: string | undefined) {
  if (isNull(value)) {
    await fetchSeries();
    await fetchModels();

    brandValue.value = undefined;
    seriesValue.value = undefined;
    modelVal.value = undefined;
  } else {
    await fetchSeries(value);
    await fetchModels(value);

    brandValue.value = value;
    seriesValue.value = undefined;
    modelVal.value = undefined;
  }

  updateModelValue();
}

async function handleSeriesChange(value: string | undefined) {
  if (isNull(value)) {
    await fetchModels();

    seriesValue.value = undefined;
    modelVal.value = undefined;
  } else {
    await fetchModels(brandValue.value, value);

    seriesValue.value = value;
    modelVal.value = undefined;
  }

  updateModelValue();
}

function handleModelChange(value: string | undefined) {
  if (isNull(value)) {
    modelVal.value = undefined;
  } else {
    modelVal.value = value;
  }

  updateModelValue();
}

async function fetchBrands() {
  loadingBrand.value = true;
  try {
    brandList.value = await queryBrandList(props.extraParams?.leafCategoryId);
  } catch (error) {
    console.error('获取品牌列表失败', error);
  } finally {
    loadingBrand.value = false;
  }
}

async function fetchSeries(brandId?: string) {
  if (isNull(brandId)) {
    seriesList.value = [];
    return;
  }

  loadingSeries.value = true;
  try {
    seriesList.value = await querySeriesList(brandId);
  } catch (error) {
    console.error('获取系列列表失败', error);
  } finally {
    loadingSeries.value = false;
  }
}

async function fetchModels(brandId?: string, seriesId?: string) {
  if (isNull(brandId)) {
    modelList.value = [];
    return;
  }

  loadingModel.value = true;
  try {
    modelList.value = await queryModelList(brandId, seriesId);
  } catch (error) {
    console.error('获取型号列表失败', error);
  } finally {
    loadingModel.value = false;
  }
}

defineExpose({
  validate: (): IDynamicError[] => {
    if (!props.config.required) return [];

    return allEmpty.value
      ?
      [
        {
          prop: props.config.key,
          message: '请选择品牌',
        },
      ]
      : [];
  },
  resetFields: () => {
    brandValue.value = undefined;
    seriesValue.value = undefined;
    modelVal.value = undefined;
  },
});

watch(
  () => props.modelValue,
  (newVals: [string, string, string]) => {
    const vals = newVals || [];

    brandValue.value = isNull(vals[0]) ? undefined : String(vals[0]);
    seriesValue.value = isNull(vals[1]) ? undefined : String(vals[1]);
    modelVal.value = isNull(vals[2]) ? undefined : String(vals[2]);

    if (inited) return;

    inited = true;

    fetchBrands();
    fetchSeries(brandValue.value);
    fetchModels(brandValue.value, seriesValue.value);
  },
  {
    immediate: true,
    deep: true,
  },
);
</script>

<style lang="scss">
.dynamic-condition-brand-model-series {
  .dynamic-item:last-child {
    border-bottom: 1rpx solid #EEE;
  }

  .cbms__error__tips {
    text-align: var(--nut-form-item-tip-text-align, left);
    font-size: var(--nut-form-item-tip-font-size, 20rpx);
    color: var(--nut-form-item-error-message-color, var(--nut-required-color, #fa2c19)) ;
  }

  .nut-form-item__body__tips {
    display: none;
  }
}
</style>
