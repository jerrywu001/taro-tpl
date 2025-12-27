# CLAUDE.md

本文件为 Claude Code (claude.ai/code) 在处理此代码库时提供指导。

## 项目概述

这是一个使用 **Taro 4.x** 框架、Vue 3 组合式 API 和 NutUI 组件库构建的微信小程序。该应用是一个奢侈品销售管理系统。

**核心技术栈：**
- 框架：Taro 4.x（多端小程序框架）
- UI 框架：Vue 3 组合式 API
- 组件库：NutUI Taro 4.x (https://nutui.jd.com/taro/vue/4x)
- 构建工具：Webpack 5
- 开发语言：TypeScript
- 样式：SCSS/Sass
- 状态管理：无集中式状态管理（组件级状态使用 ref/reactive）

**项目规模：**
- 总页面数：26
- API 模块：8+ 业务模块
- TypeScript 类型文件：20+
- 自定义 Hooks：3 个（useDebounce、useThrottle、useNavHeight）
- 公共组件：20+ 个（10+ 基础组件 + 10+ 动态表单组件）

## Claude 助手行为规范

### 📋 Git 操作规范

**重要：禁止自动执行 `git add` 命令**

Claude 助手在执行 Git 操作时必须遵循以下规则：

#### 禁止操作

❌ **禁止自动执行 `git add .` 或 `git add <file>`**
- 不能在未经用户明确要求的情况下执行 `git add` 命令
- 不能在任何工作流程中自动暂存文件
- 即使是为了"方便"或"完成任务"也不允许

#### 允许操作

✅ **允许执行 `git status`**
- 可以随时查看 Git 状态
- 可以向用户展示哪些文件被修改

✅ **允许执行其他只读 Git 命令**
- `git diff`
- `git log`
- `git branch`
等

#### 用户主导原则

- Git 暂存操作必须由用户明确发起
- 如果需要暂存文件，应该：
  1. 告知用户有哪些文件被修改
  2. 建议用户执行 `git add` 命令
  3. 等待用户确认

#### 示例

```
❌ 错误做法：
完成代码修改后，我会自动执行 git add . 暂存文件...

✅ 正确做法：
代码修改已完成。您可以通过以下命令查看修改：
git status

如需暂存文件，请执行：
git add .
```

---

### 🔍 网络搜索策略（智能切换）

**重要：所有网络搜索遵循智能切换策略，优先使用内置工具，失败时自动升级到 Skill。**

#### 搜索工具优先级

当需要进行网络搜索时，按照以下优先级执行：

1. **首选：WebSearch 内置工具**
   - 使用场景：所有常规网络搜索需求
   - 优势：快速、简单、低开销
   - 适用范围：技术文档、框架特性、API 文档、最新资讯等

2. **自动降级：DuckDuckGo Skill + Felo AI Search**
   - 调用路径：`Skill(duckduckgo)` → `felo-search` 工具
   - 触发条件：
     - WebSearch 内置工具不可用时
     - WebSearch 搜索结果质量不佳时
     - 网络环境限制导致内置工具失败时
   - 优势：AI 驱动、智能总结、技术信息专业性强

#### 执行规则

```
✅ 标准流程：
1. 优先尝试 WebSearch 内置工具
2. 如果失败或不可用，自动切换到 felo-search
3. 向用户说明切换原因（如果发生切换）

✅ 使用场景（都优先使用 WebSearch）：
- 技术文档搜索
- 框架/库的最新特性
- API 文档查询
- 版本更新信息
- 技术最佳实践

❌ 禁止行为：
- 跳过内置工具直接使用 Skill（除非明确知道内置工具不可用）
- 不经用户同意强制使用特定搜索工具
```

#### Felo-Search 降级调用模式

**仅在 WebSearch 失败时使用**

**执行步骤：**

1. **加载 Skill**
   ```
   Skill(duckduckgo)
   ```

2. **调用 Felo-Search**
   ```bash
   cd "D:\other\sales-applet\.claude\skills\duckduckgo"
   python executor.py --call '{"tool": "felo-search", "arguments": {"query": "详细的搜索查询", "stream": false}}'
   ```

**参数说明：**
- `query`：详细的搜索查询，支持自然语言和关键词
- `stream`：流式返回，默认 `false`（一次性返回完整结果）

**示例查询：**
```json
{
  "tool": "felo-search",
  "arguments": {
    "query": "Vue 3 Composition API latest best practices and documentation 2025",
    "stream": false
  }
}
```

**降级示例：**
```
1. 首次尝试：WebSearch("Vue 3 toRefs documentation")
   - 如果成功 → 使用结果
   - 如果失败 → 执行步骤 2

2. 降级尝试：Skill(duckduckgo) + felo-search
   - 向用户说明："WebSearch 不可用，已切换到 Felo AI Search"
   - 执行搜索并返回结果
```

#### 可用的其他搜索工具

DuckDuckGo Skill 还提供以下工具（按需使用）：

| 工具名 | 用途 | 使用场景 |
|--------|------|---------|
| `felo-search` | AI 驱动的技术搜索 | **主要搜索工具**（优先使用） |
| `web-search` | 标准网页搜索 | 一般网页内容搜索 |
| `fetch-url` | 获取 URL 内容 | 提取网页主要内容 |
| `url-metadata` | 提取 URL 元数据 | 获取网页标题、描述等 |

#### 错误处理与降级策略

**WebSearch 失败处理流程：**

1. **首次尝试 WebSearch**
   - 如果成功：直接使用结果
   - 如果失败：执行步骤 2

2. **自动切换到 Felo-Search**
   - 检查 DuckDuckGo Skill 是否可用
   - 使用 `felo-search` 工具重新搜索
   - 向用户说明切换原因

3. **最终降级**
   - 如果 `felo-search` 也失败
   - 尝试使用其他搜索工具（`web-search`、`fetch-url`）
   - 向用户说明情况并提供可能的解决方案

**错误示例：**
```
场景：搜索 "Vue 3 最新文档"

尝试 1: WebSearch("Vue 3 latest documentation 2025")
结果：失败（网络限制或不可用）

尝试 2: Skill(duckduckgo) → felo-search
提示："WebSearch 当前不可用，已切换到 Felo AI Search"
结果：成功返回

最终：向用户展示搜索结果
```

#### 搜索质量要求

**通用搜索规范（适用于所有搜索工具）：**

- ✅ 使用详细、专业的查询语句
- ✅ 包含版本号或年份（如 "2025"、"latest"）
- ✅ 使用技术关键词（如 "official documentation"、"best practices"）
- ✅ 结果必须引用来源（如果可用）

**查询示例对比：**

| ❌ 不推荐 | ✅ 推荐 |
|----------|--------|
| "Nuxt docs" | "Nuxt 4 official documentation and latest features 2025" |
| "Vue API" | "Vue 3 Composition API complete guide and best practices" |
| "Taro" | "Taro 4.x framework documentation and migration guide" |

---

**本规范从即刻起强制执行，优先使用 WebSearch 内置工具，失败时自动降级到 DuckDuckGo Skill 的 felo-search 工具。**

## 业务模块

应用包含 26 个页面，按以下业务模块组织：

### 提货管理
- `pages/pickupManage/list` - 提货单列表
- `pages/pickupManage/before-detail` - 提货前订单详情
- `pages/pickupManage/after-detail` - 提货后订单详情
- `pages/pickupManage/create` - 创建提货单
- `pages/pickupManage/refound` - 提货退款
- `pages/pickupManage/approval-list` - 提货审批列表
- `pages/pickupManage/warehousing` - 入库管理

### 结算管理
- `pages/settlement/list` - 结算单列表
- `pages/settlement/data` - 结算单详情
- `pages/settlement/pay` - 付款处理
- `pages/settlement/payment-pending` - 待付款管理
- `pages/settlement/approval-list` - 结算审批列表

### 商品管理
- `pages/goods/data-manage` - 商品数据管理
- `pages/goods/data-list` - 商品数据列表
- `pages/goods/add-template` - 添加商品模板

### 会员管理
- `pages/member/list` - 会员列表

### 发票管理
- `pages/invoice/pending-detail` - 待处理发票详情

### 付款管理
- `pages/payment/detail` - 付款详情

### 核心页面
- `pages/index` - 首页（TabBar）
- `pages/mine` - 我的页面（TabBar）
- `pages/login` - 登录页
- `pages/forget-password` - 忘记密码
- `pages/protocol` - 用户协议/协议页

## 开发命令

### 安装依赖
```bash
pnpm i
```

### 开发
```bash
# 本地开发（带 Mock 服务器）
npm run dev:mock

# 本地开发（测试环境）
npm run dev:local

# 标准开发（微信小程序）
npm run dev
```

### 构建
```bash
# 生产环境构建（微信小程序）
npm run build

# 预览环境构建
npm run build:preview
```

### 代码检查
```bash
# 运行所有检查工具
npm run lint

# 单独运行检查工具
npm run oxc      # OxLint
npm run eslint   # ESLint
npm run stylelint # StyleLint
```

### Mock 服务器
Mock 服务器运行在 3003 端口，启动方式：
```bash
npm run mock-server
# 或通过 dev:mock 命令
```

## 架构说明

### 项目结构

```
src/
├── api/              # API 请求模块
│   ├── request/      # HTTP 客户端和请求工具
│   ├── login.ts      # 登录/认证 APIs（参考实现）
│   ├── pickup/       # 提货管理 APIs
│   ├── settlement/   # 结算 APIs
│   ├── goods/        # 商品/产品 APIs
│   └── ...
├── types/            # TypeScript 类型定义
│   ├── common.ts     # 共享类型（IPageParam、枚举等）
│   ├── login.ts      # 登录相关类型
│   └── ...
├── pages/            # 页面组件
│   ├── index/        # 首页
│   ├── login/        # 登录页
│   ├── pickupManage/ # 提货管理
│   ├── settlement/   # 结算管理
│   └── ...
├── components/       # 可复用组件
│   ├── dynamic/      # 动态表单组件
│   └── ...
├── utils/            # 工具函数
├── layout/           # 全局布局样式
└── app.config.ts     # 应用配置（页面、tabBar 等）

mocks/
├── index.cjs         # Mock 服务器入口（Express）
├── routes/           # Mock API 路由
├── controllers/      # Mock API 控制器
└── json/             # Mock 数据文件
```

### HTTP 请求流程

所有 API 请求使用 `src/api/request/Fetch.ts` 中的 `Http` 类：
- 方法：`Http.get()`、`Http.post()`、`Http.put()`、`Http.delete()`
- 响应格式：`{ code, message, context }`
- 成功条件：`code === EResponseCode.Succeed`
- 错误处理：通过 `getHttpErrorMessage()`

### 路径别名

TypeScript 路径别名 `@/*` 映射到 `src/*`（在 tsconfig.json 中配置）。

### 设计稿宽度

NutUI 组件使用 **375px** 设计稿宽度，全局 Taro 使用 **750px**。

### 页面配置

页面在使用前必须在 `src/app.config.ts` 中注册。

**TabBar 配置：**
- 启用自定义 TabBar（`custom: true`）
- 两个标签页：
  - 首页（`pages/index/index`）
  - 我的（`pages/mine/index`）

### 动态表单组件

项目包含一个强大的动态表单组件系统，位于 `src/components/dynamic/`。这些组件可以用最少的代码实现高度可配置的表单。

**可用组件：**

1. **DynamicInput** - 带验证的文本输入
2. **DynamicNumber** - 带约束的数字输入
3. **DynamicTextarea** - 多行文本输入
4. **DynamicEnumRadio** - 枚举值单选
5. **DynamicEnumCheckbox** - 枚举值多选
6. **DynamicSelectSingle** - 单选下拉框
7. **DynamicSelectMulti** - 多选下拉框
8. **DynamicImageUpload** - 带预览的图片上传
9. **DynamicBrandModelSeriesPicker** - 品牌/型号/系列级联选择器
10. **DynamicAccessoryOrConditionSelect** - 配件和成色选择器

**使用方式：**

```vue
<template>
  <dynamic-container :config="formConfig" v-model="formData" />
</template>

<script setup lang="ts">
import { DynamicContainer } from '@/components/dynamic';

const formConfig = {
  fields: [
    { type: 'input', key: 'name', label: '名称', required: true },
    { type: 'number', key: 'price', label: '价格', min: 0 },
    // ... 更多字段
  ]
};
</script>
```

**组件映射：**
- 定义在 `src/components/dynamic/component-map.ts`
- 自动将组件类型解析为具体实现

### 公共组件库

项目在 `src/components/` 目录下提供了丰富的可复用组件，**开发前请优先检查是否已有可用组件，避免重复开发**。

#### 基础组件

**1. SearchInput（搜索输入框）**
- **位置**：`src/components/SearchInput.vue`
- **功能**：带防抖的搜索输入框
- **特性**：
  - 内置 `useDebounce` hook，默认 500ms 防抖
  - 支持清空按钮
  - 自动 focus 管理
- **使用场景**：列表页面的搜索功能
- **示例**：
  ```vue
  <SearchInput v-model="keyword" @search="handleSearch" placeholder="搜索商品" />
  ```

**2. DateRange（日期范围选择器）**
- **位置**：`src/components/DateRange.vue`
- **功能**：日期范围选择
- **特性**：
  - 支持开始日期和结束日期选择
  - 自动格式化日期
  - 支持清空
- **使用场景**：筛选条件、报表查询
- **示例**：
  ```vue
  <DateRange v-model:startDate="startDate" v-model:endDate="endDate" />
  ```

**3. CustomInput（自定义输入框）**
- **位置**：`src/components/CustomInput.vue`
- **功能**：带标签的自定义输入框
- **特性**：
  - 支持左侧标签
  - 支持必填标记
  - 支持禁用状态
- **使用场景**：表单输入
- **示例**：
  ```vue
  <CustomInput label="姓名" v-model="name" required />
  ```

**4. ImageList（图片列表）**
- **位置**：`src/components/ImageList.vue`
- **功能**：图片列表展示和预览
- **特性**：
  - 支持图片懒加载
  - 支持点击预览大图
  - 支持删除功能
- **使用场景**：商品图片展示、订单详情图片
- **示例**：
  ```vue
  <ImageList :images="imageList" @delete="handleDelete" />
  ```

**5. SwiperDetail（轮播图详情）**
- **位置**：`src/components/SwiperDetail.vue`
- **功能**：轮播图组件
- **特性**：
  - 支持图片轮播
  - 支持指示器
  - 支持自动播放
- **使用场景**：商品详情页、图片展示
- **示例**：
  ```vue
  <SwiperDetail :images="images" :autoplay="true" />
  ```

**6. PopupSearch（弹出搜索）**
- **位置**：`src/components/PopupSearch.vue`
- **功能**：弹出式搜索选择器
- **特性**：
  - 支持搜索
  - 支持单选/多选
  - 支持分页加载
- **使用场景**：选择商品、选择客户等
- **示例**：
  ```vue
  <PopupSearch v-model="visible" :options="list" @confirm="handleConfirm" />
  ```

**7. CheckboxButton（复选框按钮）**
- **位置**：`src/components/CheckboxButton.vue`
- **功能**：按钮样式的复选框
- **特性**：
  - 支持单选/多选
  - 按钮样式
  - 支持禁用
- **使用场景**：筛选条件、选项卡
- **示例**：
  ```vue
  <CheckboxButton v-model="selected" :options="options" />
  ```

**8. SmsButton（短信验证码按钮）**
- **位置**：`src/components/SmsButton.vue`
- **功能**：发送短信验证码按钮
- **特性**：
  - 倒计时功能
  - 防重复点击
  - 自动禁用/启用
- **使用场景**：登录、注册、忘记密码
- **示例**：
  ```vue
  <SmsButton :phone="phone" @send="handleSendSms" />
  ```

**9. MutipleSelect（多选选择器）**
- **位置**：`src/components/MutipleSelect.vue`
- **功能**：多选下拉选择器
- **特性**：
  - 支持搜索
  - 支持全选
  - 支持已选项展示
- **使用场景**：多条件筛选
- **示例**：
  ```vue
  <MutipleSelect v-model="selected" :options="options" />
  ```
**10. SingleSelect（单选选择器）**
- **位置**：`src/components/SingleSelect.vue`
- **功能**：单选下拉选择器
- **特性**：
  - 支持搜索
  - 支持已选项展示
- **使用场景**：多条件筛选
- **示例**：
  ```vue
  <SingleSelect v-model="selected" :options="options" />
  ```

**11. CustomFields（自定义字段）**
- **位置**：`src/components/CustomFields.vue`
- **功能**：自定义字段展示
- **特性**：
  - 动态字段渲染
  - 支持多种字段类型
  - 支持编辑模式
- **使用场景**：详情页面、表单页面
- **示例**：
  ```vue
  <CustomFields :fields="fields" :data="formData" />

**12. CustomTag（自定义标签）**
- **位置**：`src/components/CustomTag.vue`
- **功能**：可自定义样式的标签组件
- **特性**：
  - 支持自定义文本
  - 支持自定义颜色
  - 支持圆角
- **使用场景**：标签展示、筛选条件
- **示例**：
  ```vue
  <CustomTag type="success">已完成</CustomTag>
  ```

#### 动态表单组件（扩展）

**13. MasterBankSelect（总行下拉选择）**
- **位置**：`src/components/dynamic/widgets/DynamicMasterBankSelect.vue`
- **功能**：总行银行下拉选择器
- **特性**：
  - 自动调用 `queryMasterBanks()` 接口获取总行列表
  - 支持搜索功能（默认启用）
  - 支持清空选择
  - 支持只读模式
  - 使用 NutUI Picker 弹窗交互
- **数据映射**：
  - `label` ← `bankName`（银行名称）
  - `value` ← `bankCode`（银行代码）
- **使用场景**：会员管理、收款账户、付款信息等需要选择开户银行的场景
- **示例**：
  ```vue
  <template>
    <view class="dynamic-item">
      <master-bank-select
        v-model="formData.bankCode"
        :config="{
          status: 0,
          key: 'bankCode',
          label: '开户银行',
          componentType: 'MASTER_BANK_SELECT'
        }"
        :enable-search="true"
        :allow-clear="true"
      />
    </view>
  </template>

  <script setup lang="ts">
  import { ref } from 'vue';
  import { MasterBankSelect } from '@/components';
  import '@/components/dynamic/dynamic.scss';

  const formData = ref({
    bankCode: '',
  });
  </script>
  ```

**14. DatePicker（日期选择器）**
- **位置**：`src/components/dynamic/widgets/DynamicDatePicker.vue`
- **功能**：日期选择器
- **特性**：
  - 支持日期选择
  - 支持清空选择
  - 支持只读模式
  - 使用 NutUI DatePicker 弹窗交互
- **使用场景**：表单中需要选择日期的场景
- **示例**：
  ```vue
  <template>
    <view class="dynamic-item">
      <date-picker
        v-model="formData.birthDate"
        :config="{
          status: 0,
          key: 'birthDate',
          label: '出生日期',
          componentType: 'DATE_PICKER'
        }"
        :allow-clear="true"
      />
    </view>
  </template>

  <script setup lang="ts">
  import { ref } from 'vue';
  import { DatePicker } from '@/components';
  import '@/components/dynamic/dynamic.scss';

  const formData = ref({
    birthDate: '',
  });
  </script>
  ```

**15. BranchBankSelect（支行下拉选择）**
- **位置**：`src/components/dynamic/widgets/DynamicBranchBankSelect.vue`
- **功能**：支行银行下拉选择器（依赖总行）
- **特性**：
  - 自动调用 `queryBranchBanks()` 接口获取支行列表
  - **依赖总行代码**：必须传入 `bankCode` prop
  - 支持搜索功能（默认启用，接口搜索）
  - 支持清空选择
  - 支持只读模式
  - 使用 NutUI Picker 弹窗交互
- **数据映射**：
  - `label` ← `cnapsName`（支行名称）
  - `value` ← `cnapsCode`（大额行号）
- **使用场景**：会员管理、收款账户等需要选择开户支行的场景（总行与支行级联）
- **示例**：
  ```vue
  <template>
    <view class="form-container">
      <!-- 总行选择 -->
      <view class="dynamic-item">
        <master-bank-select
          v-model="formData.bankInfo"
          :config="{
            status: 0,
            key: 'bankCode',
            label: '开户银行',
            componentType: 'MASTER_BANK_SELECT'
          }"
        />
      </view>

      <!-- 支行选择（依赖总行） -->
      <view class="dynamic-item">
        <branch-bank-select
          v-model="formData.branchInfo"
          :config="{
            status: 0,
            key: 'branchCode',
            label: '开户支行',
            componentType: 'BRANCH_BANK_SELECT'
          }"
          :bank-code="formData.bankInfo?.bankCode"
          :enable-search="true"
        />
      </view>
    </view>
  </template>

  <script setup lang="ts">
  import { ref } from 'vue';
  import { MasterBankSelect, BranchBankSelect } from '@/components';
  import '@/components/dynamic/dynamic.scss';

  const formData = ref({
    bankInfo: null,    // { bankName, bankCode }
    branchInfo: null,  // { cnapsName, cnapsCode }
  });
  </script>
  ```

#### 组件使用原则

1. **优先复用** - 开发前必须检查 `src/components/` 是否已有可用组件
2. **一致性** - 使用统一的公共组件保持 UI 一致性
3. **扩展性** - 如需扩展功能，优先通过 props 或 slots 扩展现有组件
4. **文档化** - 新增公共组件必须添加完整的使用说明

#### 组件索引

| 组件名 | 文件路径 | 主要用途 | 是否支持双向绑定 |
|--------|---------|---------|----------------|
| SearchInput | `src/components/SearchInput.vue` | 搜索输入 | ✅ |
| DateRange | `src/components/DateRange.vue` | 日期范围 | ✅ |
| CustomInput | `src/components/CustomInput.vue` | 表单输入 | ✅ |
| ImageList | `src/components/ImageList.vue` | 图片展示 | ❌ |
| SwiperDetail | `src/components/SwiperDetail.vue` | 轮播图 | ❌ |
| PopupSearch | `src/components/PopupSearch.vue` | 弹出搜索 | ✅ |
| CheckboxButton | `src/components/CheckboxButton.vue` | 选项按钮 | ✅ |
| SmsButton | `src/components/SmsButton.vue` | 短信验证 | ❌ |
| SingleSelect | `src/components/SingleSelect.vue` | 单选下拉 | ✅ |
| MutipleSelect | `src/components/MutipleSelect.vue` | 多选下拉 | ✅ |
| CustomFields | `src/components/CustomFields.vue` | 自定义字段 | ❌ |
| CustomTag | `src/components/CustomTag.vue` | 自定义标签 | ❌ |
| MasterBankSelect | `src/components/dynamic/widgets/DynamicMasterBankSelect.vue` | 总行下拉（动态） | ✅ |
| BranchBankSelect | `src/components/dynamic/widgets/DynamicBranchBankSelect.vue` | 支行下拉（动态） | ✅ |
| DatePicker | `src/components/dynamic/widgets/DynamicDatePicker.vue` | 日期选择（动态） | ✅ |

## TypeScript 和命名规范

### 接口命名
- **使用 `I` 前缀**（如 `ILoginParam`、`IUserDetail`）
- **不使用** vO/DTO 后缀
- 使用清晰的后缀：`Request`、`Response`、`Detail`、`Param`、`List`
- 始终 `export` 接口
- 避免使用 `IPageResult<T>` 和 `ICommonResult<T>`

### 请求/响应模式
- 请求参数：`IXXXParam`（如果分页应继承 `IPageParam`）
- 响应：类型中只包含 `context` 部分
- 为所有接口和字段添加完整的 JSDoc 注释
- 使用 `/** 文档注释 */` 风格，顶层不使用 `//` 注释

### 枚举
- **使用 `E` 前缀**（如 `EStatus`、`EAuditStatus`）
- 创建对应的标签映射：`xxxLabel`、`xxxColor`、`xxxBgColor`
- 始终 `export` 枚举和映射

## API 实现标准

参考：`src/api/login.ts`

### 函数命名
- 查询/获取操作：`queryXXX`（如 `queryMineInfo`）
- 创建操作：`addXXX`
- 编辑操作：`editXXX`
- 切换操作：`toggleXXX`
- 动作操作：`doXXX`（如 `doLogin`）

### 标准模式
```typescript
export async function queryExample(params: IExampleParam) {
  let data = [] as IExample[];

  try {
    const { code, context, message } = await Http.post<IExample[]>('/api/path', { ...params });

    if (code !== EResponseCode.Succeed) {
      throw new Error(message || '服务器异常，请稍后再试~');
    }

    data = context || [] as IExample[];
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }

  return data;
}
```

### 关键要求
1. 使用 `async/await`
2. 在函数开始时初始化返回数据
3. 使用 `try/catch` 配合 `getHttpErrorMessage`
4. 检查 `code === EResponseCode.Succeed`
5. 从 `context` 解构所需数据
6. 返回处理后的数据，而不是原始响应

## Vue 组件标准

### 组合式 API
- 使用 Vue 3 组合式 API（不使用选项式 API）
- 解构导入类型：`import { IType1, IType2 } from '@/types/xxx'`
- 使用 `ref()` 管理响应式数据
- 使用 `computed()` 创建计算属性
- 错误处理：使用 `try/catch` 配合 `Taro.showToast` 显示错误

### 分页和加载
- 使用 `loading` 和 `loadingMore` 状态
- 默认每页数量：`DefaultPageSize`（50）
- 下拉加载阈值：`lowerThreshold`（120）

### 搜索
- 使用 `useDebounce` hook 实现搜索输入防抖

### 自定义 Hooks

#### useDebounce
延迟函数执行直到用户停止输入。用于搜索输入和表单验证。

代码套路参照: src\components\SearchInput.vue

```typescript
import { useDebounce } from '@/hooks';

const { run, cancel, isExecuting } = useDebounce(async (keyword: string) => {
  await queryList({ keyword });
}, 500); // 默认：300ms

// 在搜索输入中使用
function handleSearch(value: string) {
  run(value);
}
```

**返回值：**
- `run`：防抖函数执行器
- `cancel`：取消待执行的操作
- `isExecuting`：响应式 ref，指示执行状态

#### useThrottle
限制函数执行频率。用于按钮点击和表单提交。

代码套路参照: src\pages\settlement\data\widgets\SettlementOrderBtns.vue

```typescript
import { useThrottle } from '@/hooks';

const { run, reset, isThrottled } = useThrottle(async () => {
  await submitForm();
}, 1000); // 默认：600ms

// 在提交按钮中使用
function handleSubmit() {
  run();
}
```

**返回值：**
- `run`：节流函数执行器
- `reset`：重置节流状态（允许立即执行）
- `isThrottled`：响应式 ref，指示节流状态

**使用场景：**
- **useDebounce**：只在用户停止操作后执行 → 搜索、输入验证
- **useThrottle**：限制执行频率 → 按钮点击、滚动事件

## Mock 服务器架构

### 文件结构
```
mocks/
├── index.cjs                    # 主服务器（端口 3003）
├── routes/
│   └── xxx.cjs                  # 路由文件（使用公共路径前缀）
├── controllers/
│   ├── xxx.controller.cjs       # 控制器逻辑
│   └── data/
│       └── xxx.json             # 数据文件
```

### 标准规范
1. **路由**：在路由文件中使用 `router.use('/common-path', controller)`
2. **主应用**：使用 `app.use('/api/module', require('./routes/xxx.cjs'))` 挂载路由
3. **控制器**：移除公共路径前缀，保留具体的端点路径
4. **分页**：支持 `page` 和 `size` 参数
5. **搜索**：支持关键词过滤
6. **响应格式**：`{ code: 0, message: null, context: { total, data } }`

### Mock API 模块

Mock 服务器提供以下 API 模块（在 `mocks/index.cjs` 中挂载）：

1. **`/api/luxmall-staff`** - 员工端和小程序 APIs
   - 登录、认证
   - 用户信息（我的）
   - 店铺管理
   - 客户端管理

2. **`/api/luxmall-product`** - 商品管理
   - 商品/库存管理
   - 品牌、型号、系列
   - 配件、品质评级

3. **`/api/luxmall-settlement`** - 结算管理
   - 结算单
   - 付款处理
   - 结算审批

4. **`/api/luxmall-invoice`** - 发票管理
   - 发票详情
   - 发票处理

5. **`/api/luxmall-operation`** - 运营管理

6. **`/api/luxmall-org`** - 组织管理
   - 会员管理

7. **`/api/luxmall-infra`** - 基础设施服务
   - 文件上传
   - 短信发送

### JSON 数据文件
- 只包含 `context` 部分（无注释）
- 生成真实的测试数据（约 20 条记录）
- 完全匹配接口定义

## 本地小程序配置

运行 `npm run dev` 时：
1. **不要**启用"启用代码自动热重载"（禁用自动热重载）- Taro 自行处理热重载
2. **要**启用"不校验合法域名"（禁用域名验证）以便本地 API 调试

## 工具函数

`src/utils/index.ts` 中的关键工具：
- `formatMoneyString()` - 格式化货币，添加千分位
- `desensitizePhone()` - 手机号脱敏
- `showToast()`、`showLoading()` - Taro 提示/加载包装器
- `formatCountValue()` - 格式化大数字，使用万/亿单位
- `foramtDateStrToZhcn()` - 格式化日期为中文样式

## 重要常量

来自 `src/types/common.ts`：
- `GlobalKeys` - token、客户端、店铺信息的存储键
- `EAuditStatus` - 审批工作流状态
- `ESmsType` - 短信验证码类型
- `IPageParam` - 标准分页接口

## 构建配置

- **NutUI** 通过 `unplugin-vue-components` 自动导入
- 通过 `tsconfig-paths-webpack-plugin` 解析路径
- 设计稿宽度：NutUI 使用 375，Taro 默认使用 750
- 源码：`src/`，输出：`dist/`

## 图标使用规范

### IconFont 组件

**重要：项目中禁止使用 `<nut-icon>` 组件，必须使用 `IconFont` 组件。**

#### 导入方式

```typescript
import { IconFont } from '@nutui/icons-vue-taro';
```

#### 使用示例

```vue
<template>
  <view class="icon-container">
    <!-- ✅ 正确：使用 IconFont -->
    <IconFont name="search" />
    <IconFont name="close" size="20" />
    <IconFont name="arrow-right" color="#333" />

    <!-- ❌ 错误：禁止使用 nut-icon -->
    <!-- <nut-icon name="search" /> -->
  </view>
</template>

<script setup lang="ts">
import { IconFont } from '@nutui/icons-vue-taro';
</script>
```

#### 常用属性

| 属性 | 类型 | 说明 | 默认值 |
|------|------|------|--------|
| `name` | `string` | 图标名称（必填） | - |
| `size` | `string \| number` | 图标大小 | - |
| `color` | `string` | 图标颜色 | - |

#### 常用图标

- `search` - 搜索图标
- `close` - 关闭图标
- `arrow-right` - 右箭头
- `arrow-left` - 左箭头
- `arrow-down` - 下箭头
- `arrow-up` - 上箭头
- `circle-close` - 圆形关闭
- `check` - 勾选
- `plus` - 加号
- `minus` - 减号

#### 参考文件

- 搜索图标：`src/components/SearchInput.vue:10`
- 返回按钮：`src/layout/SafeLayout.vue`
- 更多示例：`src/pages/mine/index.vue`

## 技术亮点

### 1. 类型安全架构
- 全面的 TypeScript 覆盖，包含 20+ 类型定义文件
- 严格的命名规范（接口使用 I 前缀，枚举使用 E 前缀）
- 所有公共 API 完整的 JSDoc 文档
- 类型定义集中在 `src/types/`

### 2. 标准化 API 层
- 统一的 HTTP 客户端，一致的错误处理
- 所有 API 函数标准的请求/响应模式
- 自动响应验证和错误消息
- API 逻辑与 UI 组件清晰分离

### 3. 可复用组件系统
- 10+ 动态表单组件，快速构建复杂表单
- 10+ 基础公共组件，覆盖常见业务场景
- 基于组件的架构，单一职责原则
- 组件高度可配置，支持 props 和 slots 扩展
- 自动导入 NutUI 组件库
- 完善的组件文档和使用示例

### 4. 性能优化
- 自定义 hooks 用于防抖（搜索）和节流（按钮点击）
- 高效分页，可配置页面大小
- 图片列表懒加载
- 使用 Vue 3 响应式系统优化重渲染

### 5. 开发者体验
- 多层代码检查（OxLint + ESLint + StyleLint）
- 完整的 Mock 服务器，支持独立前端开发
- 热重载，快速迭代
- 清晰的项目结构，基于功能组织

### 6. 代码质量标准
- 一致的函数命名（query/add/edit/do/toggle 前缀）
- 错误优先方法，全面的 try-catch 块
- 标准化响应处理
- 不使用魔法数字或字符串（使用枚举和常量）

## 编码规范和最佳实践

### 标准列表页面实现模板

**参考文件：`src/pages/payment/list/index.vue`**

所有列表页面必须遵循以下标准结构和编码套路：

#### 1. Vue 模板结构

```vue
<!-- eslint-disable vue/v-on-event-hyphenation -->
<template>
  <safe-layout
    bg-type="graybg"
    no-padding
    :empty-placeholder="emptyPlaceholder"
  >
    <template #sub-nav>
      <!-- 搜索栏 -->
      <search-input
        v-model="params.keyword"
        bg-color="#f5f5f5"
        class="datalist-search"
        placeholder="搜索关键词"
        full-width
        allow-clear
        @change="fetchDataList(true)"
      />
    </template>

    <div v-if="!loading && total > 0" class="dlc-container">
      <scroll-view
        class="dlc-scroll"
        :scroll-y="true"
        :scroll-into-view="0"
        :scroll-top="scrollTop"
        :lower-threshold="lowerThreshold"
        :refresher-enabled="true"
        :refresher-triggered="refresherPulling"
        refresher-background="transparent"
        @refresherRefresh="onRefresherPulling"
        @scrolltolower="loadMore"
      >
        <view class="dlc-list">
          <view
            v-for="(item, idx) in datalist"
            :key="idx"
            class="dlc-item"
            @click="toDetail(item)"
          >
            <!-- 列表项内容 -->
          </view>

          <!-- 没有更多数据 -->
          <view v-if="!loadingMore && !hasMore" class="no-more-container">
            <text class="no-more-text">没有更多数据了~</text>
          </view>
        </view>
      </scroll-view>
    </div>
  </safe-layout>
</template>
```

#### 2. Script 标准结构

```typescript
<script lang="ts" setup>
import { ref, computed } from 'vue';
import SafeLayout from '@/layout/SafeLayout.vue';
import Taro, { useLoad } from '@tarojs/taro';
import { SearchInput, CustomTag } from '@/components';
import { IXXXListParam, IXXXItem } from '@/types/xxx';
import { queryXXXList } from '@/api/xxx';
import { DefaultPageSize, showLoading, hideLoading, showToast, lowerThreshold } from '@/utils';
import '@/styles/common-list.scss';
import { useThrottle } from '@/hooks';

// 1. 查询参数
const params = ref<IXXXListParam>({
  page: 1,
  size: DefaultPageSize,
  keyword: undefined,
  // 其他筛选参数设为 undefined
});

// 2. 状态管理
const total = ref(0);
const scrollTop = ref(0);
const datalist = ref<IXXXItem[]>([]);
const loading = ref(false);
const loadingMore = ref(false);
const refresherPulling = ref(false);

// 3. 计算属性
const hasMore = computed(() => datalist.value.length < total.value);
const emptyPlaceholder = computed(() => !loading.value && total.value === 0 ? '暂无数据' : '');

// 4. 节流函数（如有需要）
const { run: handleAction, isThrottled: isLoading } = useThrottle(actionFn, 1000);

// 5. 获取查询参数
function getQueryParams() {
  return {
    ...params.value,
    keyword: params.value.keyword || undefined,
    operatorTypes: {
      // 定义字段的查询运算符
      // keyword: 'like',  // 模糊查询
      // status: 'eq',     // 精确查询
    },
  };
}

// 6. 下拉刷新
async function onRefresherPulling() {
  refresherPulling.value = true;
  await fetchDataList();
  refresherPulling.value = false;
}

// 7. 获取列表数据（核心方法）
async function fetchDataList(isFirst = true) {
  if (loading.value || loadingMore.value) return;

  if (isFirst) {
    params.value.page = 1;
    datalist.value = [];
    total.value = 0;
    scrollTop.value = 0;
  }

  loading.value = isFirst;
  loadingMore.value = !isFirst;
  showLoading(undefined, true);

  try {
    const { data, total: all } = await queryXXXList(getQueryParams());

    if (isFirst) {
      datalist.value = data;
      total.value = all;
    } else {
      datalist.value = [...datalist.value, ...data];
    }
  } catch (error) {
    const errMsg = (error as Error).message;
    showToast(errMsg);

    if (errMsg) {
      throw new Error(errMsg);
    }
  } finally {
    hideLoading();
    loading.value = false;
    loadingMore.value = false;
  }
}

// 8. 加载更多
function loadMore() {
  if (loadingMore.value || !hasMore.value) return;

  params.value.page += 1;
  fetchDataList(false);
}

// 9. 跳转详情
function toDetail(item: IXXXItem) {
  Taro.navigateTo({ url: `/pages/xxx/detail/index?id=${item.id}` });
}

// 10. 页面加载
useLoad(({ status }: { status?: string }) => {
  if (status) {
    params.value.status = status;
  }
  fetchDataList();
});
</script>
```

#### 3. 样式文件

```scss
// 引入公共列表样式
@import '@/styles/common-list.scss';

// 不使用 <style scoped>，直接使用全局样式
// 自定义样式使用 BEM 命名规范
```

### SafeLayout 组件使用规范

#### Props 说明

| 属性 | 类型 | 默认值 | 说明 |
|-----|------|--------|------|
| `bg-type` | `'graybg' \| 'whitebg' \| 'authscale' \| 'minebg' \| 'black' \| 'blacksacle' \| 'shortblack'` | `'graybg'` | 背景类型 |
| `no-padding` | `boolean` | `false` | 是否不显示左右内边距 |
| `empty-placeholder` | `string` | `''` | 空状态占位文本 |
| `custom-nav` | `boolean` | `false` | 是否自定义导航栏 |
| `show-back-button` | `boolean` | `true` | 是否显示返回按钮 |
| `show-footer-tabbar` | `boolean` | `false` | 是否显示底部 TabBar |

#### 插槽说明

| 插槽名 | 说明 | 常见用途 |
|--------|------|----------|
| `#sub-nav` | 子导航区域 | 放置搜索栏、筛选条件 |
| `#footer` | 底部按钮区域 | 放置固定底部按钮 |
| `default` | 主内容区域 | 放置页面主要内容 |

#### 典型使用

```vue
<safe-layout
  bg-type="graybg"
  no-padding
  :empty-placeholder="emptyPlaceholder"
>
  <template #sub-nav>
    <search-input ... />
  </template>

  <!-- 主内容区域 -->
  <div v-if="!loading && total > 0" class="dlc-container">
    <scroll-view class="dlc-scroll" ...>
      <!-- 列表内容 -->
    </scroll-view>
  </div>
</safe-layout>
```

### API 实现规范

#### 参考文件：`src/api/payment/index.ts`

#### 1. 函数命名规范

| 操作类型 | 函数命名 | 示例 |
|----------|----------|------|
| 查询/获取 | `queryXXX` | `queryPayOrders`、`queryMineInfo` |
| 创建 | `addXXX` | `addOrder`、`addProduct` |
| 编辑 | `editXXX` | `editOrder`、`editProduct` |
| 删除 | `deleteXXX` | `deleteOrder` |
| 切换 | `toggleXXX` | `toggleStatus` |
| 动作 | `doXXX` | `doLogin`、`doSubmit` |

#### 2. 标准实现模板

```typescript
/**
 * 查询XXX列表
 * @param params 查询参数
 * @returns 列表数据
 */
export async function queryXXXList(params: IXXXListParam) {
  let total = 0;
  let data = [] as IXXXItem[];

  // 使用 toConditional 转换参数
  params = toConditional(params);

  try {
    const { code, context, message } = await Http.post<{
      total: number;
      data: IXXXItem[];
    }>(`${baseUrl}/page-query`, { ...params });

    if (code !== EResponseCode.Succeed) {
      throw new Error(message || '服务器异常，请稍后再试~');
    }

    total = context?.total || 0;
    data = context?.data || [];
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }

  return {
    total,
    data,
  };
}
```

#### 3. 关键要求

- ✅ 使用 `async/await`
- ✅ 在函数开始时初始化返回数据
- ✅ 使用 `try/catch` 配合 `getHttpErrorMessage`
- ✅ 检查 `code === EResponseCode.Succeed`
- ✅ 从 `context` 解构所需数据
- ✅ 返回处理后的数据，而不是原始响应
- ✅ 列表查询使用 `toConditional` 转换参数

### TypeScript 类型定义规范

#### 参考文件：`src/types/pickup/payment.ts`、`.cursorrules`

#### 1. 命名规范

| 类型 | 前缀 | 示例 |
|------|------|------|
| 接口 | `I` | `IPaymentOrder`、`IUserInfo` |
| 枚举 | `E` | `EPaymentStatus`、`EOrderType` |
| 类型别名 | 无 | `TagType` |

#### 2. 接口定义规范

```typescript
/**
 * 付款单信息
 */
export interface IPaymentOrder {
  /** 主键ID */
  id: number;
  /** 付款单号 */
  paymentNo: string;
  /** 支付金额 */
  payAmount: number;
  /** 状态 PAYING:支付中 SUCCESS:成功 FAILED:失败 */
  status: string;
  /** 创建时间 */
  createTime: string;
}
```

#### 3. 查询参数接口

```typescript
/**
 * 付款单列表查询参数
 */
export interface IPaymentOrderListParam extends IPageParam {
  /** 付款单号（模糊搜索） */
  paymentNo?: string;
  /** 结算单类型 */
  settlementType?: ESettlementType;
  /** 状态 */
  status?: EPaymentOrderStatus;
}
```

#### 4. 枚举和映射

```typescript
/**
 * 付款状态枚举
 */
export enum EPaymentOrderStatus {
  /** 全部 */
  ALL = '',
  /** 支付中 */
  PAYING = 'PAYING',
  /** 成功 */
  SUCCESS = 'SUCCESS',
  /** 失败 */
  FAILED = 'FAILED',
}

/**
 * 付款状态标签映射
 */
export const paymentOrderStatusLabel = {
  [EPaymentOrderStatus.PAYING]: '支付中',
  [EPaymentOrderStatus.SUCCESS]: '付款成功',
  [EPaymentOrderStatus.FAILED]: '付款失败',
};

export const paymentOrderStatusType: Record<string, TagType> = {
  [EPaymentOrderStatus.PAYING]: 'primary',
  [EPaymentOrderStatus.SUCCESS]: 'success',
  [EPaymentOrderStatus.FAILED]: 'danger',
};

export const paymentOrderStatusColor = {
  [EPaymentOrderStatus.PAYING]: '#FF7D00',
  [EPaymentOrderStatus.SUCCESS]: '#00B42A',
  [EPaymentOrderStatus.FAILED]: '#F53F3F',
};
```

#### 5. 类型定义关键要求

- ✅ **生成前先检查是否已有同名且内容一样的定义**
- ✅ 所有接口和字段必须有 JSDoc 注释
- ✅ 注释中不要出现 `@extends`、`@implements`、`@example`
- ✅ 单行注释只在函数内部使用，顶层必须用 `/** */`
- ✅ 请求参数必须 `extends IPageParam`
- ✅ 所有类型必须 `export`
- ✅ 响应类型只包含 `context` 部分
- ✅ 避免使用 `IPageResult<T>` 和 `ICommonResult<T>`

### Mock 数据实现规范

#### 参考文件：`mocks/routes/settlement.cjs`、`mocks/controllers/settlement.controller.cjs`

#### 1. 目录结构

```
mocks/
├── index.cjs                    # 主服务器（挂载所有路由）
├── routes/
│   └── settlement.cjs           # 路由文件
├── controllers/
│   └── settlement.controller.cjs # 控制器文件
└── routes/data/
    ├── payOrders.json           # JSON 数据文件
    └── settlement-detail.json
```

#### 2. 路由挂载（mocks/index.cjs）

```javascript
app.use('/api/luxmall-settlement', require('./routes/settlement.cjs'));
app.use('/api/luxmall-staff', require('./routes/applet.cjs'));
```

#### 3. 路由文件（mocks/routes/xxx.cjs）

```javascript
const express = require('express');
const router = express.Router();
const payOrders = require('./data/payOrders.json');

/**
 * 列表查询 - 支持分页与筛选
 */
router.post('/payment-order/page-query', (req, res) => {
  let all = JSON.parse(JSON.stringify(payOrders));

  const { page = 1, size = 50, conditions = [] } = req.body || {};

  // 支持 conditions 数组筛选
  if (conditions && conditions.length > 0) {
    conditions.forEach((condition) => {
      const { field, operator = 'like', value } = condition;

      if (value !== undefined && value !== null && value !== '') {
        all = all.filter((item) => {
          const fieldValue = item[field];

          switch (operator) {
            case 'like':
              return String(fieldValue).includes(String(value));
            case 'eq':
              return String(fieldValue) === String(value);
            default:
              return true;
          }
        });
      }
    });
  }

  const total = all.length;
  const start = (Number(page) - 1) * Number(size);
  const end = start + Number(size);
  const data = all.slice(start, end);

  res.json({
    code: 0,
    message: null,
    context: { total, data },
    traceId: '',
    spanId: '',
  });
});

module.exports = router;
```

#### 4. JSON 数据文件规范

```json
[
  {
    "id": 1,
    "paymentNo": "FK202501230001",
    "settlementNo": "JS202501230001",
    "payAmount": 12800,
    "actualAmount": 12800,
    "status": "SUCCESS",
    "createTime": "2025-01-23 14:20:00"
  }
]
```

- ✅ 只包含 `context` 部分（数组或对象）
- ✅ 不添加注释
- ✅ 生成约 20 条真实测试数据
- ✅ 完全匹配接口定义

#### 5. Mock 关键要求

- ✅ 支持 `conditions` 数组格式筛选
- ✅ 支持 `page`、`size` 分页参数
- ✅ 返回格式：`{ code: 0, message: null, context: { total, data } }`
- ✅ 支持 `like`（模糊）和 `eq`（精确）查询

### 样式编写规范

#### 关键要求

- ✅ **不使用 `<style scoped>`**
- ✅ 引入公共样式 `@/styles/common-list.scss`
- ✅ 使用 BEM 命名规范（`.dlc-container`、`.dli-header`、`.dli-field`）
- ✅ 使用小程序标签：`view`、`text`、`image`（不用 `div`、`span`、`img`）
- ✅ 单位：rpx（小程序），px（转换后）

#### 公共列表样式类

```scss
.datalist-search       // 搜索栏容器
.dlc-container         // 列表容器
.dlc-scroll            // 滚动区域
.dlc-list              // 列表
.dlc-item              // 列表项
.dli-header            // 列表项头部
.dli-code              // 单号
.dli-field             // 字段行
.dli-field-label       // 字段标签
.dli-field-value       // 字段值
.dli-btns              // 按钮组
.no-more-container     // 没有更多提示
```

### 添加新功能时的步骤

1. **首先定义类型**
   - ✅ **检查是否已有同名且内容一样的类型定义**
   - 在 `src/types/` 中创建接口，遵循命名规范
   - 为所有接口和字段添加 JSDoc 注释
   - 导出所有类型以便复用

2. **实现 API 层**
   - 遵循 `src/api/payment/index.ts` 的标准模式
   - 使用正确的函数命名（queryXXX、addXXX、editXXX、doXXX）
   - 使用 `toConditional` 转换列表查询参数
   - 始终使用 try-catch 处理错误

3. **创建 Mock 数据**
   - 在 `mocks/routes/data/` 中添加 JSON 数据文件
   - 在 `mocks/routes/` 中添加路由文件
   - 支持 `conditions` 数组格式筛选
   - 支持分页和搜索

4. **检查可复用组件**
   - 在 `src/components/` 中查找是否有可复用的组件
   - 优先使用基础组件：SearchInput、DateRange、CustomInput、CustomTag 等
   - 优先使用动态表单组件：DynamicInput、DynamicEnumRadio 等
   - 如无可用组件，参考现有组件风格创建新组件

5. **构建 UI 组件**
   - 使用 `SafeLayout` 作为页面容器
   - 使用 Vue 3 Composition API
   - 使用公共列表样式 `@/styles/common-list.scss`
   - **不使用 `<style scoped>`**
   - 参考 `src/pages/payment/list/index.vue` 的标准结构
   - 正确处理加载状态和空状态

6. **注册页面**
   - 在 `src/app.config.ts` 中添加页面路径
   - 遵循现有的页面结构模式

### 常用模式

**分页列表：**
```typescript
const loading = ref(false);
const loadingMore = ref(false);
const dataList = ref<IDataItem[]>([]);
const page = ref(1);
const hasMore = ref(true);

async function loadData() {
  loading.value = true;
  try {
    const result = await queryDataList({ page: page.value, size: DefaultPageSize });
    dataList.value = page.value === 1 ? result.data : [...dataList.value, ...result.data];
    hasMore.value = result.data.length >= DefaultPageSize;
  } catch (error) {
    Taro.showToast({ title: error.message, icon: 'none' });
  } finally {
    loading.value = false;
    loadingMore.value = false;
  }
}
```

**带防抖的搜索：**
```typescript
const { run: handleSearch } = useDebounce(async (keyword: string) => {
  page.value = 1;
  searchParams.keyword = keyword;
  await loadData();
}, 500);
```

**带节流的提交：**
```typescript
const { run: handleSubmit, isThrottled } = useThrottle(async () => {
  try {
    await submitForm(formData);
    Taro.showToast({ title: '提交成功', icon: 'success' });
  } catch (error) {
    Taro.showToast({ title: error.message, icon: 'none' });
  }
}, 1000);
```

**使用公共组件：**
```vue
<template>
  <view class="page">
    <!-- 搜索组件（自带防抖） -->
    <SearchInput v-model="keyword" @search="handleSearch" placeholder="搜索商品" />

    <!-- 日期范围选择 -->
    <DateRange v-model:startDate="startDate" v-model:endDate="endDate" />

    <!-- 图片列表 -->
    <ImageList :images="productImages" @delete="handleDeleteImage" />

    <!-- 短信验证码按钮 -->
    <SmsButton :phone="phone" @send="handleSendSms" />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SearchInput from '@/components/SearchInput.vue';
import DateRange from '@/components/DateRange.vue';
import ImageList from '@/components/ImageList.vue';
import SmsButton from '@/components/SmsButton.vue';

const keyword = ref('');
const startDate = ref('');
const endDate = ref('');
const productImages = ref<string[]>([]);
const phone = ref('');

// SearchInput 自带防抖，无需手动处理
function handleSearch(value: string) {
  console.log('搜索关键词：', value);
  // 执行搜索逻辑
}

function handleDeleteImage(index: number) {
  productImages.value.splice(index, 1);
}

function handleSendSms() {
  // 发送短信验证码
}
</script>
```

