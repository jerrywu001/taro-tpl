# NutUI - Taro Integration Guide

Complete guide for using NutUI with Taro framework for cross-platform mini-program development.

## Overview

NutUI Taro version (`@nutui/nutui-taro`) supports multiple platforms:
- **H5** - Mobile web
- **WeChat Mini Program** (微信小程序)
- **Alipay Mini Program** (支付宝小程序)
- **JD Mini Program** (京东小程序)
- **TikTok Mini Program** (字节跳动小程序)
- **QQ Mini Program** (QQ小程序)

## Installation

```bash
npm install @nutui/nutui-taro
# or
yarn add @nutui/nutui-taro
# or
pnpm add @nutui/nutui-taro
```

## Taro 3.x Configuration

### config/index.js

```javascript
const config = {
  projectName: 'myApp',
  // ... other config

  // IMPORTANT: Configure esnextModules for H5
  h5: {
    esnextModules: ['nutui-taro', '@nutui/nutui-taro'],
    postcss: {
      autoprefixer: {
        enable: true
      }
    }
  },

  // WeChat Mini Program config
  weapp: {
    compile: {
      exclude: [/@nutui[\\/]nutui-taro/]
    }
  },

  // Alipay Mini Program config
  alipay: {
    compile: {
      exclude: [/@nutui[\\/]nutui-taro/]
    }
  }
}

module.exports = config
```

## Usage Patterns

### Full Import

```javascript
// app.js or app.ts
import { createApp } from 'vue'
import NutUI from '@nutui/nutui-taro'
import '@nutui/nutui-taro/dist/style.css'

const App = createApp({
  // ...
})

App.use(NutUI)

export default App
```

### On-Demand Import (Recommended)

```vue
<template>
  <view class="index">
    <nut-button type="primary">Taro Button</nut-button>
    <nut-cell title="Cell Title" desc="Description"></nut-cell>
  </view>
</template>

<script setup lang="ts">
import { Button, Cell } from '@nutui/nutui-taro'
import '@nutui/nutui-taro/dist/style.css'
</script>
```

## Complete Taro App Example

### Project Structure

```
my-taro-app/
├── src/
│   ├── app.config.ts      # App configuration
│   ├── app.ts             # App entry
│   ├── app.scss           # Global styles
│   ├── pages/
│   │   ├── index/
│   │   │   ├── index.vue
│   │   │   └── index.config.ts
│   │   └── profile/
│   │       ├── profile.vue
│   │       └── profile.config.ts
│   └── components/
├── config/
│   └── index.js           # Build config
└── package.json
```

### app.ts

```typescript
import { createApp } from 'vue'
import { Button, Cell, Tabbar, TabbarItem } from '@nutui/nutui-taro'
import '@nutui/nutui-taro/dist/style.css'
import './app.scss'

const App = createApp({
  onShow() {
    console.log('App launched')
  }
})

// Register components globally
App.use(Button)
App.use(Cell)
App.use(Tabbar)
App.use(TabbarItem)

export default App
```

### app.config.ts

```typescript
export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/category/category',
    'pages/cart/cart',
    'pages/profile/profile'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'NutUI Taro App',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#999',
    selectedColor: '#fa2c19',
    backgroundColor: '#fff',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/index/index',
        text: 'Home',
        iconPath: 'assets/home.png',
        selectedIconPath: 'assets/home-active.png'
      },
      {
        pagePath: 'pages/category/category',
        text: 'Category',
        iconPath: 'assets/category.png',
        selectedIconPath: 'assets/category-active.png'
      },
      {
        pagePath: 'pages/cart/cart',
        text: 'Cart',
        iconPath: 'assets/cart.png',
        selectedIconPath: 'assets/cart-active.png'
      },
      {
        pagePath: 'pages/profile/profile',
        text: 'Profile',
        iconPath: 'assets/profile.png',
        selectedIconPath: 'assets/profile-active.png'
      }
    ]
  }
})
```

### Page Example - index.vue

```vue
<template>
  <view class="index-page">
    <!-- Search Bar -->
    <nut-searchbar
      v-model="searchValue"
      placeholder="Search products"
    ></nut-searchbar>

    <!-- Banner Swiper -->
    <nut-swiper :init-page="0" :pagination-visible="true" pagination-color="#426543" auto-play="3000">
      <nut-swiper-item v-for="item in banners" :key="item">
        <image :src="item" mode="aspectFill" class="banner-image" />
      </nut-swiper-item>
    </nut-swiper>

    <!-- Category Grid -->
    <nut-grid :column-num="4">
      <nut-grid-item v-for="item in categories" :key="item.id" :text="item.name">
        <IconFont :name="item.icon" size="40" />
      </nut-grid-item>
    </nut-grid>

    <!-- Product List -->
    <nut-cell-group title="Hot Products">
      <nut-cell
        v-for="product in products"
        :key="product.id"
        :title="product.name"
        :desc="product.description"
        is-link
        @click="viewProduct(product.id)"
      >
        <template #icon>
          <image :src="product.image" class="product-thumb" />
        </template>
        <template #link>
          <text class="product-price">${{ product.price }}</text>
        </template>
      </nut-cell>
    </nut-cell-group>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Taro from '@tarojs/taro'

const searchValue = ref('')

const banners = ref([
  'https://example.com/banner1.jpg',
  'https://example.com/banner2.jpg',
  'https://example.com/banner3.jpg'
])

const categories = ref([
  { id: 1, name: 'Electronics', icon: 'dongdong' },
  { id: 2, name: 'Clothing', icon: 'JD' },
  { id: 3, name: 'Food', icon: 'checklist' },
  { id: 4, name: 'Books', icon: 'star-fill-n' }
])

const products = ref([
  {
    id: 1,
    name: 'Smartphone',
    description: 'Latest model',
    image: 'https://example.com/phone.jpg',
    price: 699
  },
  // ... more products
])

const viewProduct = (id: number) => {
  Taro.navigateTo({
    url: `/pages/product/product?id=${id}`
  })
}
</script>

<style lang="scss">
.index-page {
  background: #f5f5f5;
}

.banner-image {
  width: 100%;
  height: 200px;
}

.product-thumb {
  width: 60px;
  height: 60px;
  margin-right: 10px;
  border-radius: 4px;
}

.product-price {
  color: #fa2c19;
  font-weight: bold;
}
</style>
```

## Platform-Specific Considerations

### H5 Platform

```javascript
// Use web APIs freely
if (process.env.TARO_ENV === 'h5') {
  // H5-specific code
  window.addEventListener('scroll', handleScroll)
}
```

### WeChat Mini Program

```javascript
// WeChat-specific APIs
if (process.env.TARO_ENV === 'weapp') {
  Taro.login({
    success: (res) => {
      console.log('WeChat login code:', res.code)
    }
  })
}
```

### API Compatibility

```typescript
import Taro from '@tarojs/taro'

// Check platform
const isH5 = process.env.TARO_ENV === 'h5'
const isWeapp = process.env.TARO_ENV === 'weapp'
const isAlipay = process.env.TARO_ENV === 'alipay'

// Use Taro unified APIs
const showToast = (title: string) => {
  Taro.showToast({
    title,
    icon: 'none',
    duration: 2000
  })
}

// Navigation
const navigateToPage = (url: string) => {
  Taro.navigateTo({ url })
}

const redirectToPage = (url: string) => {
  Taro.redirectTo({ url })
}

const navigateBack = () => {
  Taro.navigateBack({ delta: 1 })
}
```

## Storage Example

```typescript
import Taro from '@tarojs/taro'

// Save data
const saveUserInfo = async (userInfo: any) => {
  try {
    await Taro.setStorage({
      key: 'userInfo',
      data: userInfo
    })
  } catch (error) {
    console.error('Save failed:', error)
  }
}

// Load data
const loadUserInfo = async () => {
  try {
    const res = await Taro.getStorage({ key: 'userInfo' })
    return res.data
  } catch (error) {
    console.error('Load failed:', error)
    return null
  }
}

// Remove data
const clearUserInfo = async () => {
  try {
    await Taro.removeStorage({ key: 'userInfo' })
  } catch (error) {
    console.error('Clear failed:', error)
  }
}
```

## Network Requests

```typescript
import Taro from '@tarojs/taro'

const request = async (url: string, method = 'GET', data = {}) => {
  try {
    const res = await Taro.request({
      url: `https://api.example.com${url}`,
      method,
      data,
      header: {
        'Content-Type': 'application/json'
      }
    })
    return res.data
  } catch (error) {
    Taro.showToast({
      title: 'Request failed',
      icon: 'none'
    })
    throw error
  }
}

// Usage
const fetchProducts = async () => {
  const data = await request('/products', 'GET')
  return data
}

const createOrder = async (orderData: any) => {
  const data = await request('/orders', 'POST', orderData)
  return data
}
```

## Component Compatibility

Most NutUI components work across all platforms, but some have limitations:

### ✅ Fully Compatible
- Button, Cell, Icon, Image
- Form, Input, Radio, Checkbox, Switch
- Tabs, Navbar, Grid
- Toast, Dialog, Popup
- Badge, Tag, Avatar

### ⚠️ Platform-Specific Features
- **Swiper**: Auto-play works differently on mini-programs
- **Uploader**: Uses platform-specific upload APIs
- **Video**: Uses native video component on mini-programs
- **Map**: Requires platform-specific setup

## Building & Deployment

### Development

```bash
# H5
npm run dev:h5

# WeChat
npm run dev:weapp

# Alipay
npm run dev:alipay
```

### Production Build

```bash
# H5
npm run build:h5

# WeChat
npm run build:weapp

# Alipay
npm run build:alipay
```

### Multi-Platform Build

```bash
# Build all platforms
npm run build:h5 && npm run build:weapp && npm run build:alipay
```

## Best Practices

### 1. Use Taro APIs
Always use Taro's unified APIs instead of platform-specific ones when possible.

### 2. Conditional Code
Use environment variables for platform-specific code:

```typescript
if (process.env.TARO_ENV === 'weapp') {
  // WeChat-specific code
}
```

### 3. Component Registration
Register frequently-used components globally in app.ts for better DX.

### 4. Style Units
Use Taro's rpx unit for responsive design across platforms.

### 5. Image Optimization
Use appropriate image sizes and formats for different platforms.

## Troubleshooting

### Issue: Components not rendering
**Solution**: Check esnextModules configuration in config/index.js

### Issue: Styles not applying
**Solution**: Ensure you imported '@nutui/nutui-taro/dist/style.css'

### Issue: Build errors on mini-programs
**Solution**: Add NutUI to compile.exclude in platform config

### Issue: H5 build slow
**Solution**: Use on-demand import instead of full import

## Resources

- Taro Documentation: https://taro-docs.jd.com/
- NutUI Taro Demo: https://nutui.jd.com/taro/vue/4x/
- Platform APIs: https://taro-docs.jd.com/docs/apis/about/desc
- Community: https://github.com/NervJS/taro/discussions
