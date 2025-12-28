# 工具函数

## 位置

所有工具函数定义在以下文件中：
- `src/utils/index.ts` - 主要工具函数
- `src/utils/number.ts` - 数字处理函数
- `src/utils/validate.ts` - 验证函数
- `src/utils/areaCodes.ts` - 区域列表和类型定义

## 常用工具函数速查表

### 基础工具函数

| 函数名 | 功能 | 示例 |
|--------|------|------|
| `formatMoneyString()` | 格式化货币，添加千分位 | `formatMoneyString(10000)` → `'10,000'` |
| `desensitizePhone()` | 手机号脱敏 | `desensitizePhone('13800138000')` → `'138****8000'` |
| `showToast()` | 显示提示信息 | `showToast('操作成功')` |
| `showLoading()` | 显示加载指示器 | `showLoading('加载中...')` |
| `hideLoading()` | 隐藏加载指示器 | `hideLoading()` |
| `formatCountValue()` | 格式化大数字，使用万/亿单位 | `formatCountValue(12000)` → `{ value: '1.2', unit: '万' }` |
| `foramtDateStrToZhcn()` | 格式化日期为中文样式（含时间） | `foramtDateStrToZhcn('2025-01-23')` → `'2025年1月23日 HH:MM:SS'` |
| `isNull()` | 检查值是否为null/undefined/空字符串 | `isNull(null)` → `true` |
| `groupBy()` | 按属性分组数组 | `groupBy(array, 'category')` |
| `getFileExt()` | 获取文件扩展名 | `getFileExt('file.txt')` → `'txt'` |
| `changeFormatToDate()` | 日期格式转换（YYYYMMDD → YYYY-MM-DD） | `changeFormatToDate('20250123')` → `'2025-01-23'` |
| `imageToBase64()` | 图片URL转Base64（异步） | `await imageToBase64(url)` |

### 脱敏函数

| 函数名 | 功能 | 示例 |
|--------|------|------|
| `desensitizePhone()` | 手机号脱敏 | `desensitizePhone('13800138000')` → `'138 **** 8000'` |
| `processSSNId()` | 身份证号脱敏 | `processSSNId('110101199001011234')` → `'110 ******** 1234'` |
| `processCardNumber()` | 银行卡号脱敏 | `processCardNumber('6217123456786608')` → `'6217 **** **** 6608'` |
| `addBlankToCardNumber()` | 银行卡号每四位插入空格 | `addBlankToCardNumber('6217123456786608')` → `'6217 1234 5678 6608'` |

### 数字处理函数（number.ts）

| 函数名 | 功能 | 示例 |
|--------|------|------|
| `formatNumber()` | 保留指定位数小数 | `formatNumber(3.14159, 2)` → `3.14` |
| `safeAdd()` | 安全的数字相加（避免浮点数精度问题） | `safeAdd([0.1, 0.2])` → `0.30` |

### 验证函数（validate.ts）

| 函数名 | 功能 | 返回值 |
|--------|------|--------|
| `checkPhone()` | 验证手机号 | 返回错误信息或空字符串 |
| `checkSmsCode()` | 验证短信验证码（6位数字） | 返回错误信息或空字符串 |
| `checkEmail()` | 验证邮箱格式 | 返回错误信息或空字符串 |
| `checkSSNId()` | 验证身份证号 | 返回错误信息或空字符串 |
| `checkPass()` | 验证密码（6-20位，含字母和数字） | 返回错误信息或空字符串 |
| `checkNumber()` | 验证小数或整数 | 返回错误信息或空字符串 |
| `checkDigit()` | 验证数字 | 返回错误信息或空字符串 |
| `checkInterge()` | 验证整数 | 返回错误信息或空字符串 |
| `checkSCCode()` | 验证社会信用代码（18位） | 返回错误信息或空字符串 |
| `checkUserNames()` | 验证用户名（不超过20字符） | 返回错误信息或空字符串 |
| `formatMoney()` | 验证正数小数点后不超2位 | 返回错误信息或空字符串 |
| `formatPayNumber()` | 格式化支付数字为两位小数 | `'3.1'` → `'3.10'` |
| `isValidID()` | 验证身份证号有效性（18位或15位） | 返回boolean |

### 其他工具函数

| 函数名 | 功能 |
|--------|------|
| `getH5BaseUrl()` | 根据API网关获取H5基础URL |
| `getDeltaByPagePath()` | 根据页面路径获取返回层级信息 |
| `getEventChannel()` | 获取Taro事件通道 |
| `getPayIcon()` | 获取支付图标（异步） |
| `queryNodeById()` | 查询节点DOM信息（异步） |
| `generateRandomOptionValue()` | 生成随机选项值（格式：attr_xxxxxxxx） |
| `downloadImageLink()` | 下载图片并显示分享菜单 |
| `isiOS()` | 检查是否iOS平台 |
| `hideToast()` | 隐藏提示信息 |

## 详细说明

### formatMoneyString() - 货币格式化

**用途**：为货币值添加千分位分隔符，保留两位小数

**示例**：
```typescript
formatMoneyString(1000);      // '1,000.00'
formatMoneyString(1000000);   // '1,000,000.00'
formatMoneyString(999);       // '999.00'
formatMoneyString(null);      // ''
```

### desensitizePhone() - 手机号脱敏

**用途**：对手机号进行脱敏处理（隐藏中间位数）

**示例**：
```typescript
desensitizePhone('13800138000');  // '138 **** 8000'
desensitizePhone('15912345678');  // '159 **** 5678'
desensitizePhone(null);           // ''
```

### processSSNId() - 身份证号脱敏

**用途**：对身份证号进行脱敏处理（保留前三位和后四位）

**示例**：
```typescript
processSSNId('110101199001011234');  // '110 ******** 1234'
processSSNId(null);                  // ''
```

### processCardNumber() - 银行卡号脱敏

**用途**：对银行卡号进行脱敏处理

**示例**：
```typescript
processCardNumber('6217123456786608');  // '6217 **** **** 6608'
processCardNumber(null);                // ''
```

### addBlankToCardNumber() - 银行卡号格式化

**用途**：银行卡号每四位插入空格

**示例**：
```typescript
addBlankToCardNumber('6217123456786608');  // '6217 1234 5678 6608'
addBlankToCardNumber(null);                // ''
```

### showToast() - 显示提示信息

**用途**：显示一条消息提示，是 Taro 提示的包装器

**参数**：
- `title` (string)：提示文本
- `icon` (string)：图标类型，可选值：'none'(默认) | 'success' | 'loading'
- `duration` (number)：显示时长（毫秒），默认2000

**示例**：
```typescript
// 基础用法
showToast('操作成功');

// 自定义参数
showToast('保存失败', 'error');  // 使用 'none' 替代 'error'

// 长时间显示
showToast('请稍候', 'loading', 2000);
```

### showLoading() - 显示加载指示器

**用途**：显示全局加载指示器，防止用户交互

**参数**：
- `title` (string)：加载文本，可选
- `mask` (boolean)：是否显示透明遮罩防止交互，默认false

**示例**：
```typescript
// 显示加载
showLoading('加载中...');

// 显示无标题的加载指示器
showLoading(undefined, true);

// 之后隐藏
hideLoading();
```

### hideLoading() - 隐藏加载指示器

**用途**：隐藏之前显示的加载指示器

**示例**：
```typescript
async function fetchData() {
  showLoading('加载中...');
  try {
    const data = await queryData();
    showToast('加载成功');
  } catch (error) {
    showToast(error.message, 'none');
  } finally {
    hideLoading();
  }
}
```

### formatCountValue() - 大数字格式化

**用途**：将大数字格式化为更易读的形式（万/亿）

**返回值**：`{ value: string, unit: string }`

**示例**：
```typescript
formatCountValue(100);          // { value: '100', unit: '' }
formatCountValue(10000);        // { value: '1', unit: '万' }
formatCountValue(50000);        // { value: '5', unit: '万' }
formatCountValue(100000000);    // { value: '1', unit: '亿' }
formatCountValue(123450000);    // { value: '1.235', unit: '亿' }
```

### foramtDateStrToZhcn() - 日期中文格式化

**用途**：将日期字符串格式化为中文样式（包含时间）

**示例**：
```typescript
foramtDateStrToZhcn('2025-01-23');           // '2025年1月23日 00:00:00'
foramtDateStrToZhcn('2025-01-23 14:30:45');  // '2025年1月23日 14:30:45'
foramtDateStrToZhcn('2024-12-31');           // '2024年12月31日 00:00:00'
foramtDateStrToZhcn('');                     // ''
```

### formatNumber() - 数字格式化

**用途**：保留指定位数小数

**示例**：
```typescript
formatNumber(3.14159, 2);  // 3.14
formatNumber(10, 2);       // 10.00
formatNumber(100.5, 1);    // 100.5
```

### safeAdd() - 安全的数字相加

**用途**：解决JavaScript浮点数精度问题，安全地相加多个数字

**示例**：
```typescript
safeAdd([0.1, 0.2]);       // 0.30（普通加法会得到 0.30000000000000004）
safeAdd([1.5, 2.5, 3.1]);  // 7.10
safeAdd([100, 50.5]);      // 150.50
```

### 验证函数使用示例

**验证函数特点**：
- 返回值为空字符串 `''` 表示验证通过
- 返回错误描述字符串表示验证失败

**示例**：
```typescript
// 手机号验证
const phoneErr = checkPhone('13800138000');
if (phoneErr) {
  showToast(phoneErr, 'none');  // 显示错误信息
} else {
  // 验证通过
}

// 短信验证码
const codeErr = checkSmsCode('123456');
if (!codeErr) {
  // 验证码正确
}

// 邮箱验证
const emailErr = checkEmail('user@example.com');

// 身份证验证
const idErr = checkSSNId('110101199001011234');

// 密码验证（6-20位，必须包含字母和数字）
const passErr = checkPass('password123');

// 用户名验证
const nameErr = checkUserNames('张三', '用户名');

// 整数验证
const intErr = checkInterge('123');

// 数字验证（可包含小数）
const numErr = checkDigit('123');

// 社会信用代码验证（18位）
const scErr = checkSCCode('911101011234567890');
```

### isNull() - 空值检查

**用途**：检查值是否为null、undefined或空字符串

**示例**：
```typescript
isNull(null);        // true
isNull(undefined);   // true
isNull('');          // true
isNull(0);           // false
isNull('text');      // false
```

### groupBy() - 数组分组

**用途**：按指定属性对数组进行分组

**示例**：
```typescript
const users = [
  { name: '张三', dept: '销售' },
  { name: '李四', dept: '技术' },
  { name: '王五', dept: '销售' },
];

groupBy(users, 'dept');
// 返回：{
//   销售: [{ name: '张三', dept: '销售' }, { name: '王五', dept: '销售' }],
//   技术: [{ name: '李四', dept: '技术' }]
// }
```

### getFileExt() - 获取文件扩展名

**用途**：从文件路径或URL获取文件扩展名

**示例**：
```typescript
getFileExt('document.pdf');           // 'pdf'
getFileExt('image.jpg');              // 'jpg'
getFileExt('file.tar.gz');            // 'gz'
getFileExt('');                       // ''
getFileExt('https://example.com/file.png');  // 'png'
```

### changeFormatToDate() - 日期格式转换

**用途**：将 YYYYMMDD 格式转换为 YYYY-MM-DD 格式

**示例**：
```typescript
changeFormatToDate('20250123');  // '2025-01-23'
changeFormatToDate('20240101');  // '2024-01-01'
changeFormatToDate('2025-01-23');  // '2025-01-23'（已是标准格式）
```

### imageToBase64() - 图片转Base64

**用途**：将图片URL转换为Base64编码（异步操作，需处理跨域）

**示例**：
```typescript
try {
  const base64 = await imageToBase64('https://example.com/image.png');
  console.log(base64);  // data:image/png;base64,iVBORw0KGgo...
} catch (error) {
  console.error('转换失败', error);
}
```

### generateRandomOptionValue() - 生成随机选项值

**用途**：生成格式为 `attr_` + 8位随机数字的随机值

**示例**：
```typescript
generateRandomOptionValue();  // 'attr_12345678'
generateRandomOptionValue();  // 'attr_87654321'
```

### isiOS() - 检查iOS平台

**用途**：检查当前运行环境是否为iOS系统

**示例**：
```typescript
if (isiOS()) {
  // iOS特定逻辑
} else {
  // Android或其他系统
}
```

### getDeltaByPagePath() - 获取页面返回层级

**用途**：根据页面路径计算返回需要的步数

**示例**：
```typescript
const result = getDeltaByPagePath('/pages/index/index');
// {
//   delta: 1,  // 实际返回的层级
//   pages: [...],  // 当前页面栈
//   index: 2   // 目标页面的索引
// }
```

### getEventChannel() - 获取事件通道

**用途**：获取Taro页面之间的事件通道

**示例**：
```typescript
const eventChannel = getEventChannel();
eventChannel.on('accept', (data) => {
  console.log('接收数据', data);
});
```

## 常用工具常量

### DefaultPageSize - 默认分页大小

```typescript
const DefaultPageSize = 50;  // 每页显示 50 条数据
```

### lowerThreshold - 下拉加载阈值

```typescript
const lowerThreshold = 120;  // 距离底部 120px 时触发加载更多
```

### longTimeValues - 长期时间值

```typescript
const longTimeValues = [
  '9999-12-31',
  '99991231',
  '2999-12-31',
  '29991231',
];  // 用于表示长期或无限期的时间值
```

### shareConfig - 分享配置

```typescript
const shareConfig = {
  title: '只做放心交易，只做全链合规',
  path: '/pages/index/index',
};  // 默认分享配置
```

## 在列表页面中的应用

```typescript
<script lang="ts" setup>
import {
  DefaultPageSize,
  showLoading,
  hideLoading,
  showToast,
  formatMoneyString,
  desensitizePhone,
  lowerThreshold,
  formatCountValue,
  foramtDateStrToZhcn
} from '@/utils';

interface IListItem {
  id: string;
  price: number;
  phone: string;
  viewCount: number;
  createTime: string;
}

const dataList = ref<IListItem[]>([]);
const params = ref<IListParam>({
  page: 1,
  size: DefaultPageSize,  // 使用默认页大小
});

async function fetchList() {
  showLoading(undefined, true);  // 显示加载

  try {
    const result = await queryList(params.value);
    dataList.value = result.data;

    // 格式化数据显示
    dataList.value.forEach(item => {
      item.displayPrice = formatMoneyString(item.price);
      item.displayPhone = desensitizePhone(item.phone);

      // 格式化大数字
      const countInfo = formatCountValue(item.viewCount);
      item.displayCount = countInfo.value + countInfo.unit;

      // 格式化日期
      item.displayTime = foramtDateStrToZhcn(item.createTime);
    });

    showToast('加载成功');
  } catch (error) {
    showToast((error as Error).message, 'none');  // 显示错误信息
  } finally {
    hideLoading();  // 隐藏加载
  }
}

function loadMore() {
  // 加载更多数据
  params.value.page++;
  fetchList();
}
</script>

<template>
  <SafeLayout bg-type="graybg" no-padding>
    <!-- 搜索栏 -->
    <template #sub-nav>
      <SearchInput
        v-model="keyword"
        @search="fetchList"
        placeholder="搜索商品"
      />
    </template>

    <!-- 列表内容 -->
    <scroll-view
      class="list-container"
      :scroll-y="true"
      :lower-threshold="lowerThreshold"
      @scrolltolower="loadMore"
    >
      <view v-for="item in dataList" :key="item.id" class="list-item">
        <view class="item-price">{{ item.displayPrice }}</view>
        <view class="item-phone">{{ item.displayPhone }}</view>
        <view class="item-count">浏览 {{ item.displayCount }}</view>
        <view class="item-time">{{ item.displayTime }}</view>
      </view>
    </scroll-view>
  </SafeLayout>
</template>

<style lang="scss">
.list-container {
  height: 100%;
}

.list-item {
  padding: 16rpx;
  border-bottom: 1rpx solid #f0f0f0;

  .item-price {
    font-size: 32rpx;
    font-weight: bold;
    color: #ff6b35;
  }

  .item-phone {
    font-size: 24rpx;
    color: #999;
  }
}
</style>
```

## 区域列表使用示例

```typescript
import { areaList, IAreaValue } from '@/utils';

interface AreaSelectData {
  selectedArea: IAreaValue;
}

const data = reactive<AreaSelectData>({
  selectedArea: {
    provinceCode: '',
    provinceName: '',
    cityCode: '',
    cityName: '',
    districtCode: '',
    districtName: '',
  }
});

// 使用 AreaPicker 或自定义组件
function onAreaChange(areas: any[]) {
  if (areas.length >= 1) {
    data.selectedArea.provinceCode = areas[0].value;
    data.selectedArea.provinceName = areas[0].text;
  }
  if (areas.length >= 2) {
    data.selectedArea.cityCode = areas[1].value;
    data.selectedArea.cityName = areas[1].text;
  }
  if (areas.length >= 3) {
    data.selectedArea.districtCode = areas[2].value;
    data.selectedArea.districtName = areas[2].text;
  }
}
```

## 重要说明

- **导入方式**：所有工具函数都已导出，可以直接在组件中使用 `import { functionName } from '@/utils'`
- **Taro包装器**：`showToast` 和 `showLoading` 是 Taro 方法的包装器，提供统一的样式和行为
- **纯函数**：大多数工具函数是纯函数，无副作用，可以直接在模板或脚本中使用
- **日期格式**：`foramtDateStrToZhcn()` 函数假设输入格式为 `YYYY-MM-DD` 或 `YYYY-MM-DD HH:MM:SS`
- **注意拼写**：函数名 `foramtDateStrToZhcn` 有拼写变体（format vs foramт），使用时注意准确拼写
- **验证函数特点**：验证函数返回空字符串表示验证通过，返回错误信息表示验证失败
- **异步操作**：`imageToBase64()`、`getPayIcon()` 和 `queryNodeById()` 都是异步函数，需要使用 `await` 或 `.then()`
