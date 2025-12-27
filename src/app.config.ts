export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/mine/index',
    'pages/login/index',
    'pages/messages/index',
  ],
  subPackages: [
    {
      root: 'package-common',
      name: 'common',
      pages: [
        'protocol/index',
        'privacy/index',
      ],
    },
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
  tabBar: {
    custom: true,
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
      },
      {
        pagePath: 'pages/messages/index',
        text: '消息',
      },
      {
        pagePath: 'pages/mine/index',
        text: '我的',
      },
    ],
  },
});
