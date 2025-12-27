import Taro from '@tarojs/taro';
import { GlobalKeys } from '@/types/common';

export const TokenKey = 'sys-token';

export function getToken() {
  const token = Taro.getStorageSync(GlobalKeys.TokenKey);

  if (token) {
    return token;
  }

  return '';
}

export function saveCurrentShop(shop: {
  shopName: string;
  shopId: number;
}) {
  Taro.setStorageSync(GlobalKeys.CurrentShop, JSON.stringify({
    shopName: shop.shopName,
    shopId: shop.shopId,
  }));
}

export function getCurrentShop() {
  const shop = Taro.getStorageSync(GlobalKeys.CurrentShop);

  if (shop) {
    return JSON.parse(shop);
  }

  return {
    shopName: '',
    shopId: undefined,
  };
}

export function saveStaffName(name: string) {
  Taro.setStorageSync(GlobalKeys.StaffName, name);
}

export function getStaffName() {
  const name = Taro.getStorageSync(GlobalKeys.StaffName);

  if (name) {
    return name;
  }

  return '';
}

export function setToken(token: string) {
  Taro.setStorageSync(GlobalKeys.TokenKey, token);
}

export function removeToken() {
  Taro.removeStorageSync(GlobalKeys.TokenKey);
  Taro.removeStorageSync(GlobalKeys.Clients);
  Taro.removeStorageSync(GlobalKeys.CurrentClient);
  Taro.removeStorageSync(GlobalKeys.CurrentShop);
  Taro.removeStorageSync(GlobalKeys.StaffName);
}

console.log('__HTTPS__', __HTTPS__, typeof __HTTPS__);
console.log('__IS_MOCK__', __IS_MOCK__, typeof __IS_MOCK__);
console.log('__API_HOST__', __API_HOST__, typeof __API_HOST__);

export function getHostbaseUrl(): string {
  let apiHost = __API_HOST__;
  const isHttps = [true].includes(__HTTPS__);

  return isHttps ? `https://${apiHost}/api` : `http://${apiHost}/api`;
}
