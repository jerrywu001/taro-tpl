import { ref, onMounted } from 'vue';

function getNavHeight() {
  if (typeof wx === 'undefined' && typeof window !== 'undefined') {
    return {
      safeHeight: window.innerHeight,
      statusBarHeight: 0,
      navHeight: 56,
      totalNavHeight: 56,
    };
  }

  const menuButtonObject = wx.getMenuButtonBoundingClientRect(); // 获取胶囊对象
  const sysinfo = wx.getSystemInfoSync(); // 获取设备系统对象

  const statusBarHeight = sysinfo.statusBarHeight; // 获取状态栏高度
  const menuBottonHeight = menuButtonObject.height; // 获取胶囊顶部高度
  const menuBottonTop = menuButtonObject.top; // 获取胶囊距离顶部的高度

  return {
    safeHeight: sysinfo.safeArea.bottom,
    statusBarHeight,
    navHeight: menuBottonHeight + (menuBottonTop - statusBarHeight) * 2,
    totalNavHeight: statusBarHeight + menuBottonHeight + (menuBottonTop - statusBarHeight) * 2,
  };
}

export function useNavHeight() {
  const statusBarHeight = ref(0);
  const navHeight = ref(0);
  const totalNavHeight = ref(0);
  const safeHeight = ref(0);

  onMounted(() => {
    const data = getNavHeight();

    statusBarHeight.value = data.statusBarHeight;
    navHeight.value = data.navHeight;
    totalNavHeight.value = data.totalNavHeight;
    safeHeight.value = data.safeHeight;
  });

  return {
    statusBarHeight,
    navHeight,
    totalNavHeight,
    safeHeight,
  };
}
