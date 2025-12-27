<template>
  <nut-form
    ref="formRef"
    class="dynamic-container"
    auto-label-width
    label-align="right"
    :rules="rules"
    :model-value="formValues"
    :validate-trigger="['change', 'blur']"
  >
    <template v-for="item in renderItems" :key="item.key">
      <template v-if="item.visible">
        <nut-form-item
          :class="['dynamic-item', `dynamic-item-${item.key}`]"
          :prop="item.key"
        >
          <template #label>
            <text>{{ item.label }}</text>
            <IconFont
              v-if="!readonly && ['IMAGE_UPLOAD_FREE', 'IMAGE_UPLOAD'].includes(item.componentType)"
              name="tips"
              class="tip-icon-slot"
              @click="showRulesTip(item)"
            />
          </template>
          <div v-if="item.status === 1 && !item.hideDisabledTip" class="disabled-msg">
            属性已停用
          </div>
          <component
            :is="loadedComponents[item.componentType]"
            v-model="formValues[item.key]"
            :config="item"
            :readonly="readonly"
            @validate="handleValidate(item.key)"
            @add-option="handleAddOption"
            @update:model-value="handleValueChange(item.key, $event)"
          />
        </nut-form-item>
      </template>
    </template>
  </nut-form>
</template>

<script lang="ts" setup>
import { showToast } from '@/utils';
import { IconFont } from '@nutui/icons-vue-taro';
import { componentImportMap } from './component-map';
import { ref, markRaw, watch, computed, PropType } from 'vue';
import { ArrayComponentTypes, DynamicTipPrefix, IDynamicComponent, IDynamicError, IDynamicValues, resolveBynamicDefaultConfigs } from '.';
import './dynamic.scss';

const props = defineProps({
  readonly: {
    type: Boolean,
    default: false,
  },
  formItems: {
    type: Array as PropType<IDynamicComponent[]>,
    default: () => [],
  },
  initialValues: {
    type: Object as PropType<Record<string, any>>,
    default: () => ({}),
  },
  extraParams: {
    type: Object as PropType<Record<string, any>>,
    default: () => ({}),
  },
  fieldTips: {
    type: Object as PropType<Record<string, string>>,
    default: () => ({}),
  },
});

const emit = defineEmits(['update:values', 'change']);

const formRef = ref<any>(null);
const formValues = ref<Record<string, any>>({});
const loadedComponents = ref<Record<string, any>>({});
const customOptions = ref<Record<string, Array<{
  label: string;
  value: string | number;
  status: 0 | 1;
}>>>({}); // 存储自定义添加的选项

const renderItems = computed(() => {
  const items = resolveBynamicDefaultConfigs(props.formItems);

  // 合并自定义添加的选项
  return items.map((item) => {
    if (customOptions.value[item.key]) {
      return {
        ...item,
        options: [...item.options || [], ...customOptions.value[item.key]],
      };
    }
    return item;
  });
});

const rules = computed(() => {
  const rs: Record<string, any> = {};

  renderItems.value.forEach((item) => {
    if (item.required) {
      const tipMsg = `${DynamicTipPrefix[item.componentType] || '请选择'}${item.label}`;
      const arrayAndRequired = ArrayComponentTypes.includes(item.componentType) && item.required;

      rs[item.key] = [
        {
          required: true,
          message: tipMsg,
          validator: (val: any) => {
            if (arrayAndRequired) {
              return val?.length > 0;
            }
            return true;
          },
        },
      ];
    }
  });

  return rs;
});

const showRulesTip = (item: IDynamicComponent) => {
  if (['IMAGE_UPLOAD_FREE', 'IMAGE_UPLOAD'].includes(item.componentType)) {
    const defaultTip = item.fieldTips?.[item.key] || '';

    if (defaultTip) return showToast(defaultTip, undefined, 3000);

    const accept = item.accept || '';
    const acceptArr = accept.split(',');
    const acceptStrs = acceptArr.map((v) => v.replace('image/', '')).join('/');
    let msgTip = `单张最大${item.maxFileSize}MB，最多${item.limit}张，支持${acceptStrs}格式`;

    if (item.componentType === 'IMAGE_UPLOAD') {
      if (item.aspectRatio) {
        const formattedRatios = item.aspectRatio?.map((r) => {
          if (r === 1) return '1:1';
          if (r === 4 / 3) return '4:3';
          if (r === 3 / 4) return '3:4';
          if (r === 16 / 9) return '16:9';
          if (r === 9 / 16) return '9:16';
          return `${Number(r).toFixed(2)}`;
        }).join('或');

        msgTip += `，图片比例为${formattedRatios}`;
      }
      // minWidth
      if (item.minWidth) {
        msgTip += `，图片最小宽度为${item.minWidth}px`;
      }
    }

    showToast(msgTip, undefined, 3000);
  }
};

const handleValueChange = (key: string, value: any) => {
  formValues.value[key] = value;
  emit('update:values', JSON.parse(JSON.stringify(formValues.value)) as Record<string, IDynamicValues>);
  emit('change', {
    key,
    value,
    allValues: formValues.value,
    newItems: getNewDynamicItems(),
  });
};

const handleAddOption = (key: string, option: any) => {
  if (!customOptions.value[key]) {
    customOptions.value[key] = [];
  }

  // 检查选项是否已存在，避免重复添加
  const exists = customOptions.value[key].some(
    (item) => item.value === option.value || item.label === option.label,
  );

  if (!exists) {
    customOptions.value[key].push(option);
  }
};

const validateForm = (): Promise<Array<IDynamicError>> => {
  return new Promise((resolve) => {
    formRef.value?.validate()
      .then(({ valid, errors }) => {
        if (valid) {
          resolve([]);
        } else {
          console.warn('error:', errors);
          resolve(errors);
        }
      })
      .catch((error) => {
        console.error('验证表单失败:', error);
        resolve([]);
      });
  });
};

const handleValidate = (key: string) => {
  formRef.value?.validate(key);
};

function getNewDynamicItems() {
  const values = JSON.parse(JSON.stringify(formValues.value));
  const fields = JSON.parse(JSON.stringify(renderItems.value));
  const customOptions = formRef.value?.getCustomOptions?.() || {};

  const newDynamicFields = fields.map((field) => {
    const fieldWithValue = {
      ...field,
      value: values[field.key] !== undefined ? values[field.key] : field.value,
    };

    // 如果该字段有自定义选项，合并到 options 中
    if (customOptions[field.key] && customOptions[field.key].length > 0) {
      const allOptions = [
        ...field.options || [],
        ...customOptions[field.key],
      ];

      const optionsMap = new Map();

      allOptions.forEach((option) => {
        optionsMap.set(option.value, option);
      });

      fieldWithValue.options = Array.from(optionsMap.values());
    }

    return fieldWithValue;
  });

  return newDynamicFields as IDynamicComponent[];
}

defineExpose({
  validateForm,
  resetForm: () => {
    formRef.value?.resetFields();
  },
  updateFormValues: (values: Record<string, any>) => {
    formValues.value = {
      ...formValues.value,
      ...values,
    };
    emit('update:values', formValues.value);
  },
  getCustomOptions: () => customOptions.value,
  getNewDynamicItems,
});

watch(
  () => props.formItems,
  (items) => {
    items.forEach(async (item) => {
      try {
        const importFn = componentImportMap[item.componentType];

        if (importFn) {
          const component = await importFn();

          loadedComponents.value[item.componentType] = markRaw(component.default);
        }
      } catch (error) {
        console.error(`预加载组件失败: ${item.componentType}`, error);
      }
    });

    const initialValues: Record<string, any> = {};

    items.forEach((item) => {
      initialValues[item.key] = props.initialValues?.[item.key] !== undefined
        ? props.initialValues[item.key]
        : item.value;
    });

    formValues.value = initialValues;
    emit('update:values', formValues.value);
  },
  { immediate: true },
);
</script>
