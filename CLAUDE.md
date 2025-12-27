# CLAUDE.md

本文件为 Claude Code (claude.ai/code) 在此代码仓库中工作时提供指导。

## 项目概述

这是一个基于 Taro 框架的微信小程序项目，使用 Vue 3、TypeScript 和 NutUI 组件库。项目名称为 `sales-applet`。

## 常用命令

```bash
# 开发
pnpm dev                    # 构建并监听微信小程序
pnpm dev:mock               # 带 Mock 服务器的开发模式（运行在 3003 端口）

# 构建
pnpm build                  # 微信小程序生产构建
pnpm build:preview          # 使用生产网关的预览构建

# 代码检查
pnpm lint                   # 运行所有检查器（oxlint、eslint、stylelint）
pnpm lint:fix               # 自动修复所有检查问题
pnpm eslint                 # 仅运行 ESLint
pnpm stylelint              # 仅运行 Stylelint

# Mock 服务器
pnpm mock-server            # 单独启动 Mock 服务器
```

## 架构

### 目录结构
- `src/pages/` - 主页面（首页、登录、我的、消息）
- `src/package-common/` - 分包页面（协议、隐私）
- `src/components/` - 可复用 Vue 组件
- `src/components/dynamic/` - 动态表单组件系统
- `src/api/` - API 层及请求工具
- `src/types/` - TypeScript 类型定义
- `src/hooks/` - Vue 组合式钩子
- `src/layout/` - 布局组件（SafeLayout、Tabbars）
- `mocks/` - 基于 Express 的 Mock 服务器

### 核心架构模式

**API 层** (`src/api/`):
- `request/Fetch.ts` 中的 `Http` 类提供 `get`、`post`、`put`、`delete` 方法
- 所有 API 响应遵循 `IResponse<T>` 格式：`{ code, context, message }`
- 成功状态码是 `EResponseCode.Succeed` (0)，而非 200
- API 函数应：初始化返回值、检查响应码、从 `context` 提取数据、错误时抛出异常

**动态表单系统** (`src/components/dynamic/`):
- `DynamicContainer.vue` - 根据 `componentType` 动态加载表单组件的容器
- `component-map.ts` - 组件类型到懒加载 Vue 组件的映射
- 支持类型：TEXT_LONG、TEXT_SHORT、TEXTAREA、NUMBER、ENUM_RADIO、SELECT_SINGLE、ENUM_CHECKBOX、SELECT_MULTI、IMAGE_UPLOAD、DATE_PICKER、AREA_PICKER

**布局系统**:
- `SafeLayout.vue` - 主布局容器，包含自定义导航栏、安全区域处理、自定义标签栏和全局加载状态
- 使用 `useNavHeight` 钩子计算导航栏高度
- 支持插槽：`nav-left`、`nav-tabs`、`nav-title`、`sub-nav`、`footer`

**Mock 服务器** (`mocks/`):
- 运行在 3003 端口的 Express 服务器
- 路由在 `routes/*.cjs`，控制器在 `controllers/*.controller.cjs`
- 数据文件在 `controllers/data/*.json`
- 标准响应格式：`{ code: 0, message: null, context: { ... } }`

## 编码规范

### TypeScript
- 接口前缀：`I`（如 `ILoginParam`、`ILoginResponse`）
- 枚举前缀：`E`（如 `EStatus`、`EResponseCode`）
- 分页请求参数继承 `IPageParam`
- 为枚举创建标签映射：`statusLabel`、`statusStyle`
- 所有接口必须导出并添加 JSDoc 注释

### API 函数
- 命名：`queryXXX`（查询）、`addXXX`（创建）、`editXXX`（更新）、`toggleXXX`（切换）
- 使用 `async/await` 配合 `try/catch`
- 提取数据前检查 `code === EResponseCode.Succeed`
- 错误处理：`throw new Error(getHttpErrorMessage(error))`

### Vue 组件
- 使用 `<script lang="ts" setup>` 组合式 API
- Props 需显式声明类型和默认值
- 使用 `ref` 定义响应式状态，`computed` 定义计算属性
- NutUI 组件通过 `unplugin-vue-components` 自动导入
- template中不要出现div这些h5的标签，小程序是view,text,image等标签
- 单文件vue中style不支持scoped
- 因为不支持scoped, 页面都需要套xxx-container类名，防止冲突

  代码请这样写:

  ```html
  <template>
    <SafeLayout ...>
      <view class="xxx-container">
        <text>Hello World</text>
      </view>
    </SafeLayout>
  </template>

  <script setup lang="ts">
  import SafeLayout from '@/layout/SafeLayout.vue';
  </script>

  <style lang="scss">
  .xxx-container {
    color: #333;
  }
  </style>
  ```

### 样式
- 使用 SCSS，NutUI 自定义主题在 `layout/custom_theme.scss`
- 设计宽度：750rpx（Taro 默认），NutUI 组件使用 375rpx
- 公共样式在 `styles/` 目录
- 单文件vue中style不支持scoped，代码请这样写:

  ```html
  <template>
    <SafeLayout ...>
      <view class="header">
        <text>Hello World</text>
      </view>
    </SafeLayout>
  </template>

  <script setup lang="ts">
  import SafeLayout from '@/layout/SafeLayout.vue';
  </script>

  <style lang="scss">
  .header {
    color: red;
  }
  </style>
  ```

## 配置文件

- `config/index.ts` - Taro 构建配置
- `tsconfig.json` - TypeScript 配置，`@/*` 路径别名指向 `./src/*`
- `eslint.config.js` - ESLint 配置，包含 Vue 和 Stylistic 规则
- `.cursorrules` - 额外编码规范

## 详细规则参考 .claude/rules/*.md