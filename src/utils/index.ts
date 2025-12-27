import { hideGlobalLoading, showGlobalLoading } from '@/hooks/useGlobalLoading';
import Taro, { EventChannel } from '@tarojs/taro';

export function isNull(val: any) {
  return val === null || val === undefined || val === '';
}

export function groupBy<T>(array: T[], key: string): Record<string, T[]> {
  return array.reduce((result, item) => {
    const groupKey = item[key];

    if (!result[groupKey]) {
      result[groupKey] = [];
    }

    result[groupKey].push(item);

    return result;
  }, {});
}

export function getFileExt(url: string) {
  return url ? url.substring(url.lastIndexOf('.') + 1) : '';
}

/** 20200514 - > 2020-05-14 */
export function changeFormatToDate(str: string) {
  return !str || str.includes('-') ? str : str.replace(/(.{4})(.{2})/, '$1-$2-');
}

/**
 * 格式化日期字符串为中文, 2025-05-03 12:12:12 -> 2025年05月03日 12:12:12
 * @param str 日期字符串
 * @returns 格式化后的日期字符串
 */
export function foramtDateStrToZhcn(str: string) {
  if (!str) return '';

  const date = new Date(str.replace(/-/g, '/'));
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  let hour = date.getHours() as string | number;
  let minute = date.getMinutes() as string | number;
  let second = date.getSeconds() as string | number;

  // 时分秒补零
  hour = String(hour).length < 2 ? `0${hour}` : hour;
  minute = String(minute).length < 2 ? `0${minute}` : minute;
  second = String(second).length < 2 ? `0${second}` : second;

  return `${year}年${month}月${day}日 ${hour}:${minute}:${second}`;
}

export function imageToBase64(url: string) {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.crossOrigin = 'Anonymous'; // 处理跨域问题
    img.onload = function() {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      canvas.width = img.width;
      canvas.height = img.height;
      if (ctx) ctx.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL(); // 转换为 Base64

      resolve(dataURL);
    };
    img.onerror = function(err) {
      reject(err);
    };
    img.src = url;
  });
}

/**
 * 格式化金额, 保留3位小数
 * @param cash 金额
 * @returns 格式化后的金额
 */
export function formatCountValue(cash: number, parseFloat = true) {
  if (cash < 10000) {
    return {
      value: cash,
      unit: '',
    };
  }

  // 存在亿单位
  if (cash >= 100000000) {
    const val = (cash / 100000000).toFixed(parseFloat ? 3 : 0);

    // 小数点后两位是000，则不显示小数点
    if (val.endsWith('000')) {
      return {
        value: val.slice(0, -4),
        unit: '亿',
      };
    }

    return {
      value: val,
      unit: '亿',
    };
  }

  const val = (cash / 10000).toFixed(parseFloat ? 3 : 0);

  // 小数点后两位是00，则不显示小数点
  if (val.endsWith('00')) {
    return {
      value: val.slice(0, -4),
      unit: '万',
    };
  }

  return {
    value: val,
    unit: '万',
  };
}

export function formatMoneyString(moneyString: string | number | null) {
  if (isNull(moneyString)) {
    return '';
  }

  return String(parseFloat(String(moneyString)).toFixed(2)).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * 手机号脱敏
 * @param phone 手机号
 * @returns 脱敏后的手机号
 */
export function desensitizePhone(phone: string) {
  if (isNull(phone)) return '';

  return String(phone).replace(/(\d{3})(\d{4})(\d{4})/, '$1 **** $3');
}

/**
 * 身份证号托敏，保留前三位和后四位
 */
export function processSSNId(ssnId: string) {
  if (isNull(ssnId)) return '';

  return String(ssnId).replace(/(\d{3})\d*(\d{4})/, '$1 ******** $2');
}

/**
 * 银行卡号每四位插入空格
 */
export function addBlankToCardNumber(cardNumber: string) {
  if (isNull(cardNumber)) return '';

  return String(cardNumber).replace(/(\d{4})(?=\d)/g, '$1 ');
}

/**
 * 银行卡号脱敏
 * @param cardNumber 银行卡号
 * @description 6217****6608 -> 6217 **** 6608
 * @returns 脱敏后的银行卡号
 */
export function processCardNumber(cardNumber: string) {
  if (isNull(cardNumber)) return '';

  return String(cardNumber).replace(/(\d{4})\d*(\d{4})/, '$1 **** **** $2');
}

export function getH5BaseUrl() {
  switch (__API_HOST__) {
    /** 测试 */
    case 'getway.upfreework.com':
      return 'https://acc-h5.upfreework.com';
    /** UAT */
    case 'gateway-uat.upfreework.com':
      return 'https://acc-uat-h5.upfreework.com';
    /** 101 */
    case '192.168.2.101:5001':
      return 'http://192.168.2.101:5002';
    /** 生产 */
    case 'getway.ninghuoban.com':
      return 'https://h5.ninghuoban.com';
    /** 其他*/
    default:
      return 'https://acc-h5.upfreework.com';
  }
}

export function getDeltaByPagePath(pagePath: string) {
  pagePath = pagePath.startsWith('/') ? pagePath : `/${pagePath}`;
  const pages = Taro.getCurrentPages();
  const index = pages.findIndex((item) => `/${item.route}` === pagePath);

  return {
    /** 实际返回的层级 */
    delta: index > -1 ? pages.length - index - 1 : -1,
    /** 页面栈 */
    pages,
    /** 目标页面在当前页面栈中的索引 */
    index,
  };
}

export function getEventChannel() {
  const pages = Taro.getCurrentPages();
  const current = pages[pages.length - 1];
  const eventChannel = current.getOpenerEventChannel();

  return eventChannel as EventChannel;
}

/**
 * 长期时间格式
 * @description 这边顺序不要改
 * @default 2999-12-31
 */
export const longTimeValues = [
  '9999-12-31',
  '99991231',
  '2999-12-31',
  '29991231',
];

export function showToast(title: string, icon = 'none' as 'none' | 'success' | 'loading', duration = 2000) {
  Taro.showToast({
    title,
    icon,
    duration,
  });
}

export function hideToast() {
  Taro.hideToast();
}

export function showLoading(title = '', mask = false) {
  showGlobalLoading(title, mask);
}

export function hideLoading() {
  hideGlobalLoading();
}

export const DefaultPageSize = 50;

export const lowerThreshold = 120;

export function getPayIcon() {
  return new Promise((resolve) => {
    Taro.getImageInfo({
      src: 'https://lg5-prod-1314932667.cos.ap-nanjing.myqcloud.com/applet/aplit-app/home/qrcode-icon.png',
      success: (res) => {
        resolve(res.path);
      },
      fail: () => {
        resolve(null);
      },
    });
  });
}

export function queryNodeById(id: string): Promise<any> {
  return new Promise((resolve) => {
    Taro.createSelectorQuery()
      .select(id)
      .boundingClientRect((rect: any) => {
        resolve(rect);
      })
      .exec();
  });
}

export const shareConfig = {
  title: '只做放心交易，只做全链合规',
  path: '/pages/index/index',
};

/**
 * 生成自定义选项的随机 value 值
 * @description 格式为 attr_12345678（attr固定，后跟8位随机数字）
 * @returns 随机字符串
 * @example generateRandomOptionValue() // 'attr_12345678'
 */
export function generateRandomOptionValue(): string {
  let randomDigits = '';

  for (let i = 0; i < 8; i++) {
    randomDigits += Math.floor(Math.random() * 10);
  }

  return `attr_${randomDigits}`;
}

export function downloadImageLink(url: string) {
  Taro.downloadFile({
    url,
    success: (res) => {
      Taro.showShareImageMenu({ path: res.tempFilePath });
    },
    fail: (err) => {
      console.log(err);
      showToast('下载失败');
    },
  });
}

export function isiOS() {
  const { platform, system } = Taro.getSystemInfoSync();

  return (platform || '').toLowerCase() === 'ios' || (system || '').toLowerCase().includes('ios');
}

export * from './areaCodes';
