---
name: nutui
description: NutUI Vue mobile component library for Taro. Use this skill when working with NutUI components, mobile UI development, Taro framework projects, or JD-style mobile interfaces.
---

# NutUI Skill

Comprehensive assistance with NutUI - a JD.com-style mobile Vue component library supporting H5, Taro, and multi-platform mini-programs.

## When to Use This Skill

This skill should be triggered when:
- Working with NutUI Vue components
- Building mobile H5 applications with Vue
- Developing Taro mini-programs
- Implementing JD.com-style mobile interfaces
- Need mobile-optimized UI components
- Building cross-platform mobile apps with Vue

## Quick Reference

### Installation

```bash
# Vue 3 project
npm install @nutui/nutui

# Taro project
npm install @nutui/nutui-taro

# React version
npm install @nutui/nutui-react
```

### Basic Setup (Vue 3 + Vite)

```javascript
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import NutUI from '@nutui/nutui'
import '@nutui/nutui/dist/style.css'

createApp(App).use(NutUI).mount('#app')
```

### On-Demand Import (Recommended)

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

### Common Component Patterns

#### Button Component

```vue
<template>
  <!-- Basic buttons -->
  <nut-button type="primary">Primary Button</nut-button>
  <nut-button type="success">Success Button</nut-button>
  <nut-button type="default">Default Button</nut-button>
  <nut-button type="warning">Warning Button</nut-button>
  <nut-button type="danger">Danger Button</nut-button>

  <!-- Sizes -->
  <nut-button size="large">Large</nut-button>
  <nut-button size="normal">Normal</nut-button>
  <nut-button size="small">Small</nut-button>

  <!-- Shapes and states -->
  <nut-button plain>Plain Button</nut-button>
  <nut-button disabled>Disabled</nut-button>
  <nut-button loading>Loading</nut-button>
  <nut-button block>Block Button</nut-button>
</template>
```

#### Cell Component

```vue
<template>
  <nut-cell-group title="Basic Usage">
    <nut-cell title="Cell Title" desc="Description"></nut-cell>
    <nut-cell title="Cell Title" sub-title="Subtitle" desc="Description"></nut-cell>
    <nut-cell title="Click Event" is-link @click="handleClick"></nut-cell>
    <nut-cell title="Link" is-link to="/path"></nut-cell>
    <nut-cell title="URL Link" url="https://example.com"></nut-cell>
  </nut-cell-group>
</template>

<script setup>
const handleClick = () => {
  console.log('Cell clicked')
}
</script>
```

#### Form Components

```vue
<template>
  <nut-form :model="formData" ref="formRef">
    <nut-form-item label="Username" prop="username" :rules="[{ required: true, message: 'Required' }]">
      <nut-input v-model="formData.username" placeholder="Enter username" />
    </nut-form-item>

    <nut-form-item label="Password" prop="password">
      <nut-input v-model="formData.password" type="password" placeholder="Enter password" />
    </nut-form-item>

    <nut-form-item label="Gender" prop="gender">
      <nut-radio-group v-model="formData.gender">
        <nut-radio label="1">Male</nut-radio>
        <nut-radio label="2">Female</nut-radio>
      </nut-radio-group>
    </nut-form-item>

    <nut-form-item label="Interests" prop="interests">
      <nut-checkbox-group v-model="formData.interests">
        <nut-checkbox label="1">Coding</nut-checkbox>
        <nut-checkbox label="2">Reading</nut-checkbox>
        <nut-checkbox label="3">Sports</nut-checkbox>
      </nut-checkbox-group>
    </nut-form-item>

    <nut-button type="primary" block @click="submitForm">Submit</nut-button>
  </nut-form>
</template>

<script setup>
import { reactive, ref } from 'vue'

const formRef = ref(null)
const formData = reactive({
  username: '',
  password: '',
  gender: '',
  interests: []
})

const submitForm = async () => {
  try {
    await formRef.value.validate()
    console.log('Form data:', formData)
  } catch (error) {
    console.log('Validation failed:', error)
  }
}
</script>
```

#### Picker Component

```vue
<template>
  <nut-picker
    v-model="selectedValue"
    :columns="columns"
    title="Select Option"
    @confirm="onConfirm"
    @cancel="onCancel"
  >
  </nut-picker>
</template>

<script setup>
import { ref } from 'vue'

const selectedValue = ref([])
const columns = [
  { text: 'Option 1', value: '1' },
  { text: 'Option 2', value: '2' },
  { text: 'Option 3', value: '3' }
]

const onConfirm = ({ selectedValue, selectedOptions }) => {
  console.log('Selected:', selectedValue, selectedOptions)
}

const onCancel = () => {
  console.log('Cancelled')
}
</script>
```

#### Toast & Dialog

```vue
<template>
  <nut-button @click="showToast">Show Toast</nut-button>
  <nut-button @click="showDialog">Show Dialog</nut-button>
</template>

<script setup>
import { showToast, showDialog } from '@nutui/nutui'

const showToast = () => {
  showToast.text('This is a toast message')
}

const showDialogFunc = () => {
  showDialog({
    title: 'Dialog Title',
    content: 'This is the dialog content',
    onConfirm: () => {
      console.log('Confirmed')
    },
    onCancel: () => {
      console.log('Cancelled')
    }
  })
}
</script>
```

#### Popup Component

```vue
<template>
  <nut-button @click="visible = true">Open Popup</nut-button>

  <nut-popup v-model:visible="visible" position="bottom" :style="{ height: '50%' }">
    <div class="popup-content">
      <h3>Popup Title</h3>
      <p>Popup content goes here</p>
      <nut-button block @click="visible = false">Close</nut-button>
    </div>
  </nut-popup>
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)
</script>
```

#### Tab Navigation

```vue
<template>
  <nut-tabs v-model="activeTab" @change="handleTabChange">
    <nut-tab-pane title="Tab 1" pane-key="1">
      <div>Tab 1 Content</div>
    </nut-tab-pane>
    <nut-tab-pane title="Tab 2" pane-key="2">
      <div>Tab 2 Content</div>
    </nut-tab-pane>
    <nut-tab-pane title="Tab 3" pane-key="3">
      <div>Tab 3 Content</div>
    </nut-tab-pane>
  </nut-tabs>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('1')

const handleTabChange = (paneKey) => {
  console.log('Active tab:', paneKey)
}
</script>
```

## Component Categories

### Basic Components
- **Button** - Buttons with multiple types, sizes, and states
- **Cell** - List cell items for navigation and display
- **Icon** - Icon component with extensive icon library
- **Image** - Image component with lazy loading
- **Overlay** - Overlay mask layer

### Layout Components
- **Layout** - Row and Col grid layout system
- **Grid** - Grid layout for icons or content
- **Sticky** - Sticky positioning component
- **Divider** - Content divider

### Navigation Components
- **Navbar** - Top navigation bar
- **Tabbar** - Bottom tab navigation
- **Tabs** - Tab switching component
- **Menu** - Dropdown menu
- **Pagination** - Page navigation
- **Elevator** - Quick index navigation

### Form Components
- **Input** - Text input field
- **Textarea** - Multi-line text input
- **Radio** - Radio button selection
- **Checkbox** - Checkbox selection
- **Switch** - Toggle switch
- **Rate** - Star rating component
- **Stepper** - Number input stepper
- **Range** - Slider range selector
- **Uploader** - File upload component
- **Picker** - Multi-column picker
- **DatePicker** - Date picker
- **TimePicker** - Time picker
- **Form** - Form validation container

### Feedback Components
- **Toast** - Toast message notifications
- **Dialog** - Modal dialog
- **ActionSheet** - Action menu from bottom
- **Notify** - Notification bar
- **Loading** - Loading indicators
- **Popup** - Popup layer
- **Swipe** - Swipe actions

### Display Components
- **Badge** - Badge and dot indicators
- **Tag** - Label tags
- **Avatar** - User avatar
- **Progress** - Progress bar
- **Circle Progress** - Circular progress
- **Skeleton** - Content placeholder
- **Empty** - Empty state
- **NoticeBar** - Notice bar
- **Collapse** - Collapsible panel
- **Steps** - Step indicator
- **Swiper** - Image/content carousel

### Business Components
- **Address** - Address selection
- **Card** - Content card
- **Invoice** - Invoice component
- **Signature** - Signature canvas
- **Barrage** - Barrage comments
- **Video** - Video player

## Taro Integration

### Installation for Taro

```bash
npm install @nutui/nutui-taro
```

### Configuration (Taro 3.x)

```javascript
// config/index.js
const config = {
  // ...
  h5: {
    esnextModules: ['nutui-taro', '@nutui/nutui-taro']
  }
}
```

### Usage in Taro

```vue
<template>
  <view class="index">
    <nut-button type="primary">Taro Button</nut-button>
  </view>
</template>

<script setup>
import { Button } from '@nutui/nutui-taro'
</script>
```

## TypeScript Support

NutUI has full TypeScript support with complete type definitions:

```typescript
import { ref } from 'vue'
import type { FormInstance } from '@nutui/nutui'

const formRef = ref<FormInstance>()

interface FormData {
  username: string
  email: string
  age: number
}

const formData = ref<FormData>({
  username: '',
  email: '',
  age: 0
})
```

## Theme Customization

### CSS Variables

```css
:root {
  --nut-primary-color: #fa2c19;
  --nut-primary-color-end: #fa6419;
  --nut-help-color: #909ca4;
  --nut-title-color: #1a1a1a;
  --nut-text-color: #808080;
  --nut-disable-color: #cccccc;
  --nut-border-color: #f0f0f0;
  --nut-white: #fff;
  --nut-black: #000;
}
```

### Using SCSS

```scss
// variables.scss
$primary-color: #1989fa;
$success-color: #07c160;
$warning-color: #ff976a;
$danger-color: #fa3f3f;

@import '@nutui/nutui/dist/styles/variables.scss';
```

## Best Practices

### 1. On-Demand Loading
Always use on-demand loading to reduce bundle size:

```javascript
import { Button, Cell } from '@nutui/nutui'
```

### 2. Mobile Viewport
Set proper viewport meta tag:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
```

### 3. Responsive Units
Use NutUI's built-in px to rem conversion for responsive design.

### 4. Form Validation
Always use Form component's built-in validation instead of manual validation:

```javascript
const rules = {
  username: [
    { required: true, message: 'Username is required' },
    { min: 3, max: 15, message: 'Length should be 3-15' }
  ]
}
```

### 5. Component Communication
Use proper event handling and v-model for two-way binding:

```vue
<nut-input v-model="value" @change="handleChange" />
```

## Reference Files

This skill includes organized documentation in `references/`:

- **getting_started.md** - Installation and setup guide
- **components.md** - Complete component reference
- **taro.md** - Taro framework integration
- **theming.md** - Theme customization guide
- **examples.md** - Common usage patterns

Use `view` to read specific reference files when detailed information is needed.

## Working with This Skill

### For Beginners
1. Start with getting_started.md for setup instructions
2. Review basic components: Button, Cell, Icon
3. Explore form components for interactive features
4. Check examples.md for common patterns

### For Specific Features
1. Use the component categories above to find what you need
2. Review the quick reference examples
3. Check reference files for detailed documentation
4. Customize themes using CSS variables

### For Taro Projects
1. Review taro.md for Taro-specific setup
2. Use @nutui/nutui-taro package
3. Configure esnextModules in Taro config
4. Test on multiple mini-program platforms

## Resources

### Official Links
- Documentation: https://nutui.jd.com/
- GitHub: https://github.com/jd-opensource/nutui
- Taro Docs: https://nutui.jd.com/taro/vue/4x/
- NPM: @nutui/nutui

### Community
- GitHub Issues: Report bugs and feature requests
- GitHub Discussions: Community support
- Unit Test Coverage: 80%+
- Weekly Downloads: 3,000+

## Version Information

- **Current Version**: 4.x (Vue 3)
- **Vue 2 Support**: 2.x branch available
- **React Version**: @nutui/nutui-react
- **Taro Version**: @nutui/nutui-taro
- **React Native**: @nutui/nutui-react-native

## Notes

- NutUI is optimized for mobile H5 and mini-programs
- Supports Vue 3 Composition API and Options API
- Full TypeScript support with complete type definitions
- JD.com design language and component style
- Extensive unit test coverage (80%+)
- Active maintenance by JD.com open source team
- Cross-platform support: H5, WeChat, Alipay, Taro

## Updating

To get the latest NutUI version:

```bash
npm update @nutui/nutui

# Or for Taro
npm update @nutui/nutui-taro
```

Check the changelog at: https://github.com/jd-opensource/nutui/releases
