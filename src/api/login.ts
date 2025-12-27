import { IAppletBaseLoginParam, ILoginParam, ILoginResponse, ILoginClient } from '@/types/login';
import { EResponseCode, getHttpErrorMessage } from './request/RequestType';
import { Http } from './request/Fetch';

const baseUrl = '/luxmall-staff/applet';

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
