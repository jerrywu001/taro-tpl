# NutUI - Getting Started

Complete guide to installing and setting up NutUI in your project.

## Prerequisites

- Node.js 14+
- Vue 3.x (for @nutui/nutui)
- Taro 3.x (for @nutui/nutui-taro)

## Installation

### Vue 3 Project

```bash
npm install @nutui/nutui
# or
yarn add @nutui/nutui
# or
pnpm add @nutui/nutui
```

### Taro Project

```bash
npm install @nutui/nutui-taro
# or
yarn add @nutui/nutui-taro
```

### React Project

```bash
npm install @nutui/nutui-react
```

## Basic Setup

### Full Import (Vue 3 + Vite)

```javascript
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import NutUI from '@nutui/nutui'
import '@nutui/nutui/dist/style.css'

const app = createApp(App)
app.use(NutUI)
app.mount('#app')
```

### Full Import (Vue 3 + Webpack)

```javascript
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import NutUI from '@nutui/nutui'
import '@nutui/nutui/dist/style.css'

createApp(App).use(NutUI).mount('#app')
```

### On-Demand Loading (Recommended) - Vite

This approach significantly reduces bundle size.

**Step 1: Install plugin**

```bash
npm install unplugin-vue-components -D
```

**Step 2: Configure Vite**

```javascript
// vite.config.js
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import NutUIResolver from '@nutui/nutui/dist/resolver'

export default {
  plugins: [
    vue(),
    Components({
      resolvers: [NutUIResolver()]
    })
  ]
}
```

**Step 3: Use components directly**

```vue
<template>
  <!-- No import needed! Auto-imported by plugin -->
  <nut-button type="primary">Click Me</nut-button>
</template>
```

### On-Demand Loading - Webpack

**Step 1: Install babel plugin**

```bash
npm install babel-plugin-import -D
```

**Step 2: Configure babel**

```javascript
// babel.config.js
module.exports = {
  plugins: [
    [
      'import',
      {
        libraryName: '@nutui/nutui',
        libraryDirectory: 'dist/packages/_es',
        camel2DashComponentName: false
      },
      'nutui'
    ]
  ]
}
```

**Step 3: Import components manually**

```javascript
import { Button, Cell } from '@nutui/nutui'
import '@nutui/nutui/dist/packages/button/style'
import '@nutui/nutui/dist/packages/cell/style'
```

## Taro Setup

### Step 1: Install

```bash
npm install @nutui/nutui-taro
```

### Step 2: Configure Taro

```javascript
// config/index.js
const config = {
  // ... other config
  h5: {
    esnextModules: ['nutui-taro', '@nutui/nutui-taro']
  },
  weapp: {
    compile: {
      exclude: [/@nutui[\\/]nutui-taro/]
    }
  }
}
```

### Step 3: Use in Taro Component

```vue
<template>
  <view class="index">
    <nut-button type="primary">Taro Button</nut-button>
    <nut-cell title="Cell Title" desc="Description"></nut-cell>
  </view>
</template>

<script setup>
import { Button, Cell } from '@nutui/nutui-taro'
import '@nutui/nutui-taro/dist/style.css'
</script>
```

## Mobile Viewport Configuration

Add to your HTML:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
  <title>NutUI App</title>
</head>
<body>
  <div id="app"></div>
</body>
</html>
```

## TypeScript Configuration

NutUI has built-in TypeScript support. For proper type checking:

```typescript
// env.d.ts or shims-vue.d.ts
declare module '@nutui/nutui'
```

Or for component imports:

```typescript
import type { ButtonProps, FormInstance } from '@nutui/nutui'

const formRef = ref<FormInstance>()
```

## Complete Example - Vite + Vue 3 + TypeScript

**1. Create project**

```bash
npm create vite@latest my-nutui-app -- --template vue-ts
cd my-nutui-app
npm install
```

**2. Install NutUI**

```bash
npm install @nutui/nutui
npm install unplugin-vue-components -D
```

**3. Configure vite.config.ts**

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import NutUIResolver from '@nutui/nutui/dist/resolver'

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [NutUIResolver()]
    })
  ]
})
```

**4. Create App.vue**

```vue
<template>
  <div class="app">
    <nut-button type="primary" @click="count++">
      Count: {{ count }}
    </nut-button>

    <nut-cell-group title="Settings">
      <nut-cell title="Username" desc="John Doe"></nut-cell>
      <nut-cell title="Email" desc="john@example.com"></nut-cell>
    </nut-cell-group>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
</script>

<style scoped>
.app {
  padding: 20px;
}
</style>
```

**5. Run**

```bash
npm run dev
```

## CDN Usage (Quick Testing)

```html
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@nutui/nutui/dist/style.css">
</head>
<body>
  <div id="app">
    <nut-button type="primary">CDN Button</nut-button>
  </div>

  <script src="https://unpkg.com/vue@3"></script>
  <script src="https://cdn.jsdelivr.net/npm/@nutui/nutui/dist/nutui.umd.js"></script>
  <script>
    const { createApp } = Vue
    const app = createApp({
      template: `
        <div>
          <nut-button type="primary">Hello NutUI</nut-button>
        </div>
      `
    })
    app.use(NutUI)
    app.mount('#app')
  </script>
</body>
</html>
```

## Verification

After setup, verify the installation:

```vue
<template>
  <nut-button type="primary">Test Button</nut-button>
</template>
```

If you see a styled button, the setup is successful!

## Troubleshooting

### Components not found
- **Full Import**: Ensure you imported NutUI in main.js
- **On-Demand**: Check unplugin-vue-components is configured correctly

### Styles not loading
- **Full Import**: Import '@nutui/nutui/dist/style.css'
- **On-Demand**: Ensure auto-import of styles is enabled in plugin config

### TypeScript errors
- Add type declarations in env.d.ts
- Install @types/node if needed
- Check tsconfig.json includes proper paths

### Taro build errors
- Verify esnextModules configuration
- Check Taro version compatibility (3.x required)
- Ensure @nutui/nutui-taro is installed, not @nutui/nutui

## Next Steps

After successful setup:

1. Explore components in **components.md**
2. Check **examples.md** for common patterns
3. Customize theme in **theming.md**
4. For Taro, read **taro.md** for platform specifics

## Resources

- Official Setup Guide: https://nutui.jd.com/docs/guide/start
- Vite Plugin: https://github.com/antfu/unplugin-vue-components
- Taro Docs: https://taro-docs.jd.com/
