import { getHostbaseUrl, getToken, removeToken, setToken } from './auth';
import Taro from '@tarojs/taro';
import {
  EResponseCode,
  IResponse,
} from './RequestType';
import { isNull, showToast } from '@/utils';

const isMock = __IS_MOCK__;
const defaultTimeout = 200000;

function filterUndefinedParam(params: Record<string, any>) {
  const newParams = { ...params };

  Object.keys(params).forEach((key) => {
    if (params[key] === undefined) {
      delete newParams[key];
    }
  });

  return newParams;
}

/**
 * 接口请求封装类
 * @see 关于接口调用时，检测身份认证逻辑，请参照useInterceptors变量
 */
export class Request {
  /**
   * get 方法
   * @param url 接口地址
   * @param query get 对应的query
   * @param opts request-config [{@link RequestConfig}]
   */
  static common<T>(options: Record<string, any>): Promise<IResponse<T>> {
    const hostUrl = getHostbaseUrl();
    const token = getToken();

    const showToast = options.showToast;

    options.needLogin = isNull(options.needLogin) ? false : options.needLogin;

    if (!isMock && !token && options.needLogin) {
      toLoginPage();
      return new Promise((resolve) => {
        resolve({
          code: 401,
          message: '未登录',
        } as IResponse<T>);
      });
    }

    return new Promise((resolve) => {
      const header = { ...options.header };

      header['accept-language'] = 'zh-CN,zh;q=0.9';

      if (token) {
        header.Authorization = `Bearer ${token}`;
      }

      if (!__IS_MOCK__) console.log('header', header);

      Taro.request({
        ...options,
        data: filterUndefinedParam(options.data || {}),
        url: hostUrl + options.url,
        timeout: options.timeout || defaultTimeout,
        header,
        success: function(res) {
          const statusCode = res.statusCode;
          const data = res.data as IResponse<T> || {};
          const responseHeaders = res.header || {};

          const newTkn = responseHeaders['x-new-access-token'];

          if (newTkn) {
            setToken(newTkn);
          }

          if (statusCode !== 200) {
            resolve({
              code: statusCode,
              message: data.message || res.errMsg || '服务器异常',
              context: null,
            } as IResponse<T>);
            return;
          }

          if (data.code === EResponseCode.Succeed) {
            resolve({
              code: data.code,
              message: data.message,
              context: data.context,
            } as IResponse<T>);
            return;
          }

          resolve({
            code: data.code,
            message: data.message || res.errMsg || '服务器异常',
            context: null,
          } as IResponse<T>);

          resolveHttpStatus(data.code as number, {
            url: options.url,
            needLogin: options.needLogin,
            showToast,
          } as any);

        },
        fail: function(err) {
          resolve({
            code: 500,
            message: err.errMsg || '服务器异常',
            context: null,
          } as IResponse<T>);
        },
      });
    });
  }
}

function toLoginPage() {
  const currentPage = Taro.getCurrentInstance().page || {} as Taro.PageInstance;
  // @ts-ignore
  const routePath = currentPage?.route || '';

  removeToken();

  if (routePath.includes('pages/login/index')) return;

  Taro.navigateTo({ url: '/pages/login/index' });
}

/**
 * 服务器原始状态处理
 */
function resolveHttpStatus(status: number, url = '', opts = {} as any) {
  switch (status) {
    case EResponseCode.Succeed:
      break;
    case EResponseCode.OriginalSucceed:
      break;
    case EResponseCode.Unauthorized:
      if (!isMock && opts.needLogin) {
        toLoginPage();
        printErrorMsg('身份验证过期，需要重新登录', opts.showToast);
      }
      break;

    case EResponseCode.Rejected:
      printErrorMsg('无权限：', opts.showToast);
      break;

    case EResponseCode.NotFound:
      printErrorMsg(`请求地址不存在：${url}`, opts.showToast);
      break;

    case EResponseCode.TimeOut:
      printErrorMsg(`请求超时：${url}`, opts.showToast);
      break;

    default:
      logError(`code: ${status} -> ${url}`);
  }
}

function printErrorMsg(message = '', showMsg = true) {
  logError(message);
  if (showMsg) showToast(message);
}

function logError(errorMessage = '') {
  console.log('服务异常：', errorMessage);
}
