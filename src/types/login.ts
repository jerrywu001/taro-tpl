
export interface IVerifyCodeLoginParams {
  /** 用户名 */
  username: string;
  /** 验证码 */
  code: string;
}

export interface ILoginParam {
  /** 手机号 */
  phone: string;
  /** 密码 */
  password: string;
  /** 客户端ID */
  clientId: string;
}

export interface ILoginResponse {
  /** 登录token */
  token: string;
  /** 租户名称 */
  tenantName: string;
  /** 店铺名称 */
  shopName: string;
  /** 店铺ID（int64） */
  shopId?: number;
  /** 员工姓名 */
  staffName: string;
  /** 错误信息 */
  msg?: string;
  /** 链接 */
  redirectUri?: string;
}

export interface IAppletBaseLoginParam {
  /** 手机号 */
  phone: string;
  /** 密码 */
  password: string;
}

export interface ILoginClient {
  /** 登录客户端ID */
  clientId: string;
  /** 登录租户名称 */
  tenantName: string;
}

export interface IFindPasswordParams {
  /** 用户名 */
  username: string;
  /** 授权令牌 */
  token: string;
  /** 新密码 */
  newPassword: string;
}

/**
 * 小程序我的信息响应体
 */
export interface IMyAppletInfo {
  /** 手机号 */
  phone: string;
  /** 租户名称 */
  tenantName: string;
  /** 店铺名称 */
  shopName: string;
  /** 店铺ID（int64） */
  shopId: number;
  /** 员工姓名 */
  staffName: string;
  /** 职位名称 */
  postName: string;
}

export interface IShop {
  /** 店铺ID（int64） */
  shopId: number;
  /** 店铺名称 */
  shopName: string;
}

export interface ILoginAuthParam {
  /** AppId */
  appid: string;
  /** 手机号授权code */
  code: string;
}