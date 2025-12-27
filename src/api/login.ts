import { IAppletBaseLoginParam, ILoginParam, ILoginResponse, IFindPasswordParams, ILoginClient, IVerifyCodeLoginParams, IMyAppletInfo, IShop, ILoginAuthParam } from '@/types/login';
import { EResponseCode, getHttpErrorMessage } from './request/RequestType';
import { Http } from './request/Fetch';
import { ESmsType } from '@/types/common';
import { getCurrentShop } from './request/auth';

const baseUrl = '/luxmall-staff/applet';
const smsUrl = '/luxmall-infra';

/**
 * 小程序账号密码登录
 * @param params 登录参数 {@link ILoginParam}
 * @returns 登录结果 {@link ILoginResponse}
 */
export async function doLogin(params: ILoginParam) {
  let data = {} as ILoginResponse;

  try {
    const { code, context, message } = await Http.post<ILoginResponse>(`${baseUrl}/login`, { ...params });

    if (code !== EResponseCode.Succeed) {
      throw new Error(message || '服务器异常，请稍后再试~');
    }

    data = context || {} as ILoginResponse;
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }

  return data;
}

/**
 * 小程序微信授权登录
 * @param params 登录参数 {@link ILoginAuthParam}
 * @returns 登录结果 {@link ILoginResponse}
 */
export async function doAuthLogin(params: ILoginAuthParam) {
  let data = {} as ILoginResponse;

  try {
    const { code, context, message } = await Http.post<ILoginResponse>(`${baseUrl}/todo-auth-login`, { ...params });

    if (code !== EResponseCode.Succeed) {
      throw new Error(message || '服务器异常，请稍后再试~');
    }

    data = context || {} as ILoginResponse;
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }

  return data;
}

/**
 * 获取可登录客户端列表
 * @param params 登录参数 {@link IAppletBaseLoginParam}
 * @returns 客户端列表 {@link ILoginClient[]}
 */
export async function queryClients(params: IAppletBaseLoginParam) {
  let data = [] as ILoginClient[];

  try {
    const { code, context, message } = await Http.post<ILoginClient[]>(`${baseUrl}/get-login-clients`, { ...params });

    if (code !== EResponseCode.Succeed) {
      throw new Error(message || '服务器异常，请稍后再试~');
    }

    data = context || [] as ILoginClient[];
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }

  return data;
}

/**
 * * 未登录发送验证码
 * @param sendType
 * @param phone
 */
export async function sendNotLoginSmscode(phone: string, sendType: ESmsType) {
  try {
    const { code, message } = await Http.post<void>('/iam/sms/send/not-login', {
      sendType,
      phone,
      isCheck: false,
    });

    if (code !== EResponseCode.Succeed) {
      throw new Error(message || '发送失败，请稍后再试~');
    }
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }
}

/**
 * 退出登录
 */
export async function logout() {
  try {
    const { code, message } = await Http.post<void>('/luxmall-staff/auth/logout', {});

    if (code !== EResponseCode.Succeed) {
      throw new Error(message || '服务器异常');
    }
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }
}

/**
 * 切换店铺
 * @param shopId 店铺ID
 */
export async function changeShop(shopId: number) {
  try {
    const { code, message } = await Http.post<void>('/luxmall-staff/applet/switch-shop', { shopId });

    if (code !== EResponseCode.Succeed) {
      throw new Error(message || '服务器异常');
    }
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }
}

/**
 * 找回密码验证（第一步）
 * @param phone 登录手机号
 * @returns 用户名和授权令牌
 */
export async function findPassword(params: IVerifyCodeLoginParams) {
  let username = '';
  let token = '';

  try {
    const { code, context, message } = await Http.post<{
      username: string;
      token: string;
    }>(`${baseUrl}/find-pwd-apply`, { ...params });

    if (code !== EResponseCode.Succeed) {
      throw new Error(message || '服务器异常');
    }

    const res = context || {};

    username = res.username || '';
    token = res.token || '';
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }

  return {
    username,
    token,
  };
}

/**
 * 找回密码提交
 */
export async function verifyFindPassword(params: IFindPasswordParams) {
  try {
    const { code, message } = await Http.post<void>(`${baseUrl}/find-pwd-verify`, { ...params });

    if (code !== EResponseCode.Succeed) {
      throw new Error(message || '服务器异常');
    }
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }
}

/**
 * 获取小程序我的信息
 * @returns 我的信息 {@link IMyAppletInfo}
 */
export async function queryMineInfo() {
  let data = {} as IMyAppletInfo;

  try {
    const { code, context, message } = await Http.get<IMyAppletInfo>(`${baseUrl}/mine`, { shopId: __IS_MOCK__ ? getCurrentShop()?.shopId : undefined });

    if (code !== EResponseCode.Succeed) {
      throw new Error(message || '服务器异常，请稍后再试~');
    }

    data = context || ({} as IMyAppletInfo);
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }

  return data;
}

/**
 * 获取可登录店铺列表
 * @param tenantId 租户ID
 * @returns 店铺列表 {@link IShop[]}
 */
export async function queryStoreList() {
  let data = [] as IShop[];

  try {
    const { code, context, message } = await Http.get<IShop[]>(`${baseUrl}/my-shops`, {});

    if (code !== EResponseCode.Succeed) {
      throw new Error(message || '服务器异常，请稍后再试~');
    }

    data = context || [] as IShop[];
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }

  return data;
}

/**
 * * 登录发送验证码
 * @param phone
 */
export async function sendSmscode(phone: string) {
  try {
    const { code, message } = await Http.post<void>(`${smsUrl}/sms/send`, { phone });

    if (code !== EResponseCode.Succeed) {
      throw new Error(message || '发送失败，请稍后再试~');
    }
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }
}

/**
 * 更新密码
 * @param params 更新密码参数
 * @returns 更新结果
 */
export async function updatePassword(newPassword: string) {
  try {
    const { code, message } = await Http.post<void>('/luxmall-staff/staff-info/update-password', { newPassword });

    if (code !== EResponseCode.Succeed) {
      throw new Error(message || '密码修改失败，请稍后再试~');
    }
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }
}
