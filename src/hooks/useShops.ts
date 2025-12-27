// oxlint-disable max-lines-per-function
import { computed, onUnmounted, ref } from 'vue';
import { IMyAppletInfo } from '@/types/login';
import Taro, { useDidHide, useDidShow } from '@tarojs/taro';
import { hideLoading, showLoading, showToast } from '@/utils';
import { IMiniHomeStatistics } from '@/types/home/statistics';
import { queryMiniHomeStatistics } from '@/api/home/statistics';
import { getHttpErrorMessage } from '@/api/request/RequestType';
import { changeShop, queryMineInfo, queryStoreList } from '@/api/login';
import { removeToken, saveCurrentShop, saveStaffName } from '@/api/request/auth';

export function toLoginPage() {
  if (entryState.value.isLogin) return;
  Taro.navigateTo({ url: '/pages/login/index' });
}

export const entryState = ref({
  isLogin: false,
  shops: [] as IShopPickerItem[],
  statistics: {} as IMiniHomeStatistics,
});

export interface IShopPickerItem {
  text: string;
  value: number;
}

export function useLoginState() {
  const isLogin = computed(() => entryState.value.isLogin);

  return {
    isLogin,
    toLoginPage,
  };
}

export function useShops({
  loadStaticData = false,
  loadShops = false,
  enableLoading = true,
}: {
  loadStaticData?: boolean;
  loadShops?: boolean;
  enableLoading?: boolean;
}) {
  let isFirstShow = ref(true);
  let pollingTimer = ref<NodeJS.Timeout | null>(null);
  const showShops = ref(false);

  const statistics = ref({} as IMiniHomeStatistics);
  const currShop = ref({} as IShopPickerItem);
  const shops = ref<Array<IShopPickerItem>>([]);

  const loading = ref(false);
  const isLogin = ref(false);
  const info = ref({} as IMyAppletInfo);

  function showShopPicker() {
    if (!isLogin.value) {
      toLoginPage();
      return;
    }

    if (shops.value.length === 0) {
      showToast('请先绑定店铺');
      return;
    }

    if (shops.value.length <= 1) return;

    showShops.value = true;
  }

  async function chooseShop({ selectedOptions }, onSuccess: () => void) {
    const shop = selectedOptions[0] as {
      text: string;
      value: number;
    };

    if (currShop.value.value === shop.value) {
      showShops.value = false;
      return;
    }

    try {
      showLoading('切换中...');
      await changeShop(shop.value);

      onSuccess();

      saveCurrentShop({
        shopName: shop.text,
        shopId: shop.value,
      });
      currShop.value = { ...shop };
      showShops.value = false;
    } catch (error) {
      showToast((error as Error).message);
    } finally {
      hideLoading();
    }
  }

  async function fetchMineInfo() {
    if (enableLoading) showLoading();
    try {
      const data = await queryMineInfo();

      info.value = data;
      isLogin.value = !!data.phone;
      entryState.value.isLogin = isLogin.value;
      saveStaffName(data.staffName);

      if (!isLogin.value) {
        shops.value = [];
        entryState.value.shops = [];
        // @ts-ignore
        entryState.value = {};
        info.value = {} as IMyAppletInfo;
        currShop.value = {} as IShopPickerItem;
        statistics.value = {} as IMiniHomeStatistics;
        stopPolling();
        hideLoading();
        return;
      }

      if (loadStaticData) {
        await fetchHomeStatistics();
        startPolling();
      }
    } catch (error) {
      removeToken();
      console.log(error);
    }

    hideLoading();
  }

  async function fetchStoreList() {
    try {
      const res = await queryStoreList();

      const items = res.map((item) => ({
        text: item.shopName,
        value: item.shopId,
      }));

      shops.value = [...items];
      entryState.value.shops = [...items];

      if (res.length > 0) {
        currShop.value = items.find((item) => item.value === info.value.shopId) || items[0];

        saveCurrentShop({
          shopName: currShop.value.text,
          shopId: currShop.value.value,
        });
      }
    } catch (error) {
      console.log(error);
    }

    hideLoading();
  }

  async function fetchData() {
    loading.value = true;
    try {
      if (loadShops) fetchStoreList();
      await fetchMineInfo();
    } catch (error) {
      console.log(error);
    }
    loading.value = false;
  }

  async function fetchHomeStatistics() {
    if (!isLogin.value) return;

    if (isFirstShow.value) {
      isFirstShow.value = false;
      if (enableLoading) showLoading();
    }

    await fetchHomeStatisticsInternal();

    hideLoading();
  }

  async function fetchHomeStatisticsInternal() {
    try {
      statistics.value = await queryMiniHomeStatistics();
      entryState.value.statistics = JSON.parse(JSON.stringify(statistics.value));
    } catch (error) {
      const msg = getHttpErrorMessage(error);

      if (msg === '401') {
        isLogin.value = false;
        entryState.value.isLogin = false;
        removeToken();
      }
    }
  }

  function startPolling() {
    stopPolling();
    pollingTimer.value = setInterval(() => {
      fetchHomeStatisticsInternal();
    }, 60 * 1000);
  }

  function stopPolling() {
    hideLoading();

    if (pollingTimer.value) {
      clearInterval(pollingTimer.value);
      pollingTimer.value = null;
    }
  }

  useDidShow(() => {
    fetchData();
  });

  useDidHide(() => {
    stopPolling();
  });

  onUnmounted(() => {
    stopPolling();
  });

  return {
    info,
    shops,
    isLogin,
    currShop,
    statistics,
    showShops,
    loading,
    chooseShop,
    showShopPicker,
    toLoginPage,
    fetchHomeStatistics,
  };
}
