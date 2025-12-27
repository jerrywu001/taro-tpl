# NutUI - Common Examples

Real-world usage patterns and complete examples for typical mobile app scenarios.

## Example 1: User Profile Page

```vue
<template>
  <div class="profile-page">
    <!-- Header with Avatar -->
    <div class="profile-header">
      <nut-avatar
        size="large"
        :url="user.avatar"
        @click="changeAvatar"
      ></nut-avatar>
      <h2>{{ user.name }}</h2>
    </div>

    <!-- User Info List -->
    <nut-cell-group title="Personal Information">
      <nut-cell title="Username" :desc="user.username"></nut-cell>
      <nut-cell title="Email" :desc="user.email" is-link @click="editEmail"></nut-cell>
      <nut-cell title="Phone" :desc="user.phone" is-link @click="editPhone"></nut-cell>
      <nut-cell title="Birthday" :desc="user.birthday" is-link @click="selectDate"></nut-cell>
    </nut-cell-group>

    <!-- Settings -->
    <nut-cell-group title="Settings">
      <nut-cell title="Notifications">
        <template #link>
          <nut-switch v-model="settings.notifications"></nut-switch>
        </template>
      </nut-cell>
      <nut-cell title="Dark Mode">
        <template #link>
          <nut-switch v-model="settings.darkMode" @change="toggleDarkMode"></nut-switch>
        </template>
      </nut-cell>
    </nut-cell-group>

    <!-- Action Buttons -->
    <div class="action-buttons">
      <nut-button type="primary" block @click="saveProfile">Save Changes</nut-button>
      <nut-button block @click="logout">Logout</nut-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { showToast } from '@nutui/nutui'

interface User {
  avatar: string
  name: string
  level: string
  username: string
  email: string
  phone: string
  birthday: string
}

const user = reactive<User>({
  avatar: 'https://example.com/avatar.jpg',
  name: 'John Doe',
  level: 'VIP',
  username: 'johndoe',
  email: 'john@example.com',
  phone: '+1 234 567 8900',
  birthday: '1990-01-01'
})

const settings = reactive({
  notifications: true,
  darkMode: false
})

const changeAvatar = () => {
  // Implement avatar change logic
  showToast.text('Avatar change coming soon')
}

const editEmail = () => {
  // Navigate to email edit page
}

const editPhone = () => {
  // Navigate to phone edit page
}

const selectDate = () => {
  // Show date picker
}

const toggleDarkMode = (value: boolean) => {
  document.body.classList.toggle('dark', value)
}

const saveProfile = () => {
  showToast.success('Profile saved successfully!')
}

const logout = () => {
  showToast.text('Logging out...')
  // Implement logout logic
}
</script>

<style scoped>
.profile-page {
  background: #f5f5f5;
  min-height: 100vh;
}

.profile-header {
  background: white;
  padding: 30px;
  text-align: center;
  margin-bottom: 10px;
}

.profile-header h2 {
  margin: 15px 0 5px;
}

.action-buttons {
  padding: 20px;
}

.action-buttons button {
  margin-bottom: 10px;
}
</style>
```

## Example 2: E-commerce Product List

```vue
<template>
  <div class="product-list">
    <!-- Search Bar -->
    <nut-searchbar
      v-model="searchQuery"
      placeholder="Search products"
      @search="handleSearch"
    ></nut-searchbar>

    <!-- Category Tabs -->
    <nut-tabs v-model="activeCategory" @change="handleCategoryChange">
      <nut-tab-pane
        v-for="category in categories"
        :key="category.id"
        :title="category.name"
        :pane-key="category.id"
      >
      </nut-tab-pane>
    </nut-tabs>

    <!-- Product Grid -->
    <div class="product-grid">
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="product-card"
        @click="viewProduct(product)"
      >
        <nut-image
          :src="product.image"
          width="100%"
          height="200px"
          fit="cover"
          lazy
        ></nut-image>

        <div class="product-info">
          <h3>{{ product.name }}</h3>
          <p class="description">{{ product.description }}</p>

          <div class="product-footer">
            <span class="price">${{ product.price }}</span>
            <nut-badge :value="product.stock">
              <nut-button
                type="primary"
                size="small"
                @click.stop="addToCart(product)"
              >
                Add to Cart
              </nut-button>
            </nut-badge>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <nut-empty v-if="filteredProducts.length === 0" description="No products found"></nut-empty>

    <!-- Cart Floating Button -->
    <div class="cart-float" @click="viewCart">
      <nut-badge :value="cartCount">
        <IconFont name="cart" size="24"></IconFont>
      </nut-badge>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconFont } from '@nutui/icons-vue-taro'
import { ref, computed } from 'vue'
import { showToast } from '@nutui/nutui'

interface Product {
  id: number
  name: string
  description: string
  image: string
  price: number
  stock: number
  categoryId: string
}

const searchQuery = ref('')
const activeCategory = ref('all')
const cartCount = ref(0)

const categories = [
  { id: 'all', name: 'All' },
  { id: 'electronics', name: 'Electronics' },
  { id: 'clothing', name: 'Clothing' },
  { id: 'books', name: 'Books' }
]

const products = ref<Product[]>([
  {
    id: 1,
    name: 'Smartphone',
    description: 'Latest model with great features',
    image: 'https://example.com/phone.jpg',
    price: 699,
    stock: 15,
    categoryId: 'electronics'
  },
  // ... more products
])

const filteredProducts = computed(() => {
  let result = products.value

  // Filter by category
  if (activeCategory.value !== 'all') {
    result = result.filter(p => p.categoryId === activeCategory.value)
  }

  // Filter by search query
  if (searchQuery.value) {
    result = result.filter(p =>
      p.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  return result
})

const handleSearch = () => {
  showToast.text(`Searching for: ${searchQuery.value}`)
}

const handleCategoryChange = (categoryId: string) => {
  console.log('Category changed:', categoryId)
}

const viewProduct = (product: Product) => {
  // Navigate to product detail page
  console.log('Viewing product:', product.id)
}

const addToCart = (product: Product) => {
  cartCount.value++
  showToast.success(`${product.name} added to cart`)
}

const viewCart = () => {
  // Navigate to cart page
}
</script>

<style scoped>
.product-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  padding: 10px;
}

.product-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
}

.product-info {
  padding: 10px;
}

.product-info h3 {
  font-size: 14px;
  margin: 5px 0;
}

.description {
  font-size: 12px;
  color: #999;
  margin: 5px 0;
}

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

.price {
  font-size: 16px;
  color: #fa2c19;
  font-weight: bold;
}

.cart-float {
  position: fixed;
  right: 20px;
  bottom: 80px;
  width: 50px;
  height: 50px;
  background: #fa2c19;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
}
</style>
```

## Example 3: Registration Form

```vue
<template>
  <div class="register-page">
    <h1>Create Account</h1>

    <nut-form :model="formData" :rules="rules" ref="formRef">
      <nut-form-item label="Username" prop="username">
        <nut-input
          v-model="formData.username"
          placeholder="Enter username"
          clearable
        />
      </nut-form-item>

      <nut-form-item label="Email" prop="email">
        <nut-input
          v-model="formData.email"
          type="email"
          placeholder="Enter email"
          clearable
        />
      </nut-form-item>

      <nut-form-item label="Password" prop="password">
        <nut-input
          v-model="formData.password"
          type="password"
          placeholder="Enter password"
          clearable
        />
      </nut-form-item>

      <nut-form-item label="Confirm Password" prop="confirmPassword">
        <nut-input
          v-model="formData.confirmPassword"
          type="password"
          placeholder="Confirm password"
          clearable
        />
      </nut-form-item>

      <nut-form-item label="Phone" prop="phone">
        <nut-input
          v-model="formData.phone"
          type="tel"
          placeholder="Enter phone number"
          clearable
        />
      </nut-form-item>

      <nut-form-item label="Gender" prop="gender">
        <nut-radio-group v-model="formData.gender">
          <nut-radio label="male">Male</nut-radio>
          <nut-radio label="female">Female</nut-radio>
          <nut-radio label="other">Other</nut-radio>
        </nut-radio-group>
      </nut-form-item>

      <nut-form-item label="Interests" prop="interests">
        <nut-checkbox-group v-model="formData.interests">
          <nut-checkbox label="tech">Technology</nut-checkbox>
          <nut-checkbox label="sports">Sports</nut-checkbox>
          <nut-checkbox label="music">Music</nut-checkbox>
          <nut-checkbox label="travel">Travel</nut-checkbox>
        </nut-checkbox-group>
      </nut-form-item>

      <nut-form-item label="Birthday" prop="birthday">
        <nut-input
          v-model="formData.birthday"
          placeholder="Select birthday"
          readonly
          @click="showDatePicker = true"
        />
      </nut-form-item>

      <nut-form-item prop="agree">
        <nut-checkbox v-model="formData.agree">
          I agree to the Terms and Conditions
        </nut-checkbox>
      </nut-form-item>
    </nut-form>

    <div class="form-actions">
      <nut-button type="primary" block @click="handleSubmit" :loading="loading">
        Register
      </nut-button>
      <nut-button block @click="handleReset">Reset</nut-button>
    </div>

    <!-- Date Picker Popup -->
    <nut-date-picker
      v-model="showDatePicker"
      v-model:visible="showDatePicker"
      :default-value="new Date()"
      @confirm="handleDateConfirm"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance } from '@nutui/nutui'
import { showToast, showDialog } from '@nutui/nutui'

const formRef = ref<FormInstance>()
const showDatePicker = ref(false)
const loading = ref(false)

const formData = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone: '',
  gender: '',
  interests: [],
  birthday: '',
  agree: false
})

const validatePassword = (value: string) => {
  if (value.length < 6) {
    return 'Password must be at least 6 characters'
  }
  return true
}

const validateConfirmPassword = (value: string) => {
  if (value !== formData.password) {
    return 'Passwords do not match'
  }
  return true
}

const rules = {
  username: [
    { required: true, message: 'Username is required' },
    { min: 3, max: 20, message: 'Length should be 3-20 characters' }
  ],
  email: [
    { required: true, message: 'Email is required' },
    { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email format' }
  ],
  password: [
    { required: true, message: 'Password is required' },
    { validator: validatePassword }
  ],
  confirmPassword: [
    { required: true, message: 'Please confirm password' },
    { validator: validateConfirmPassword }
  ],
  phone: [
    { required: true, message: 'Phone is required' },
    { pattern: /^\d{10,11}$/, message: 'Invalid phone number' }
  ],
  gender: [
    { required: true, message: 'Please select gender' }
  ],
  birthday: [
    { required: true, message: 'Please select birthday' }
  ],
  agree: [
    { validator: (value: boolean) => value === true, message: 'You must agree to terms' }
  ]
}

const handleDateConfirm = ({ selectedValue }: any) => {
  formData.birthday = selectedValue.join('-')
  showDatePicker.value = false
}

const handleSubmit = async () => {
  try {
    await formRef.value?.validate()
    loading.value = true

    // Simulate API call
    setTimeout(() => {
      loading.value = false
      showDialog({
        title: 'Success',
        content: 'Registration successful!',
        onConfirm: () => {
          // Navigate to login or home
        }
      })
    }, 2000)
  } catch (error) {
    showToast.fail('Please fix validation errors')
  }
}

const handleReset = () => {
  formRef.value?.reset()
  showToast.text('Form reset')
}
</script>

<style scoped>
.register-page {
  padding: 20px;
  background: #f5f5f5;
  min-height: 100vh;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
}

.form-actions {
  margin-top: 30px;
}

.form-actions button {
  margin-bottom: 10px;
}
</style>
```

## Example 4: Bottom Tab Navigation App

```vue
<template>
  <div class="app-container">
    <!-- Main Content -->
    <div class="content-area">
      <component :is="currentComponent"></component>
    </div>

    <!-- Bottom Tabbar -->
    <nut-tabbar v-model="activeTab" @tab-switch="handleTabSwitch">
      <nut-tabbar-item tab-title="Home" icon="home"></nut-tabbar-item>
      <nut-tabbar-item tab-title="Category" icon="category"></nut-tabbar-item>
      <nut-tabbar-item tab-title="Cart" icon="cart" :badge="cartBadge"></nut-tabbar-item>
      <nut-tabbar-item tab-title="Profile" icon="my"></nut-tabbar-item>
    </nut-tabbar>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, shallowRef } from 'vue'
import HomePage from './pages/Home.vue'
import CategoryPage from './pages/Category.vue'
import CartPage from './pages/Cart.vue'
import ProfilePage from './pages/Profile.vue'

const activeTab = ref(0)
const cartBadge = ref(3)

const pages = [HomePage, CategoryPage, CartPage, ProfilePage]

const currentComponent = computed(() => pages[activeTab.value])

const handleTabSwitch = (index: number) => {
  console.log('Switched to tab:', index)
  // You can add analytics tracking here
}
</script>

<style scoped>
.app-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.content-area {
  flex: 1;
  overflow-y: auto;
}
</style>
```

## Best Practices Demonstrated

### 1. Type Safety
- Use TypeScript for better type checking
- Define interfaces for data structures
- Type form refs and component instances

### 2. Form Validation
- Use built-in validation rules
- Create custom validators for complex logic
- Provide clear error messages

### 3. User Feedback
- Use Toast for quick notifications
- Use Dialog for important confirmations
- Show loading states during async operations

### 4. Performance
- Use lazy loading for images
- Implement proper component splitting
- Use computed properties for derived data

### 5. Accessibility
- Provide clear labels and placeholders
- Use semantic HTML structure
- Ensure proper focus management

## More Examples

For additional examples, check:
- Official Demo: https://nutui.jd.com/demo/
- GitHub Examples: https://github.com/jd-opensource/nutui/tree/v4/src/packages
- Community Examples: Search "NutUI examples" on GitHub
