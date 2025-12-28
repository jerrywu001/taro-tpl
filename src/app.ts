
import { createApp } from 'vue';
import { ConfigProvider, Form, FormItem } from '@nutui/nutui-taro';
import './layout/custom_theme.scss';
import './layout/layout.scss';
import './layout/h5.scss';

// https://docs.taro.zone/docs

const App = createApp({
  onShow(options) {
    console.log('App onShow.', options);
  },
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
});

App.use(ConfigProvider);
App.use(Form);
App.use(FormItem);

export default App;
