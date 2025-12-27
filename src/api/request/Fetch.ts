import qs from 'qs';
import { Request } from './Request';
import { postContentType, EParamsSendType, RequestConfig } from './RequestType';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

export class Http extends Request {
  /**
   * get 方法
   * @param url 接口地址
   * @param query get 对应的query
   * @param opts request-config [{@link RequestConfig}]
   */
  static async get<T>(url: string, query: object = {}, opts = {} as RequestConfig) {
    delete opts.paramsSendType;
    const res = await Http.common<T>({
      method: 'GET',
      url,
      data: query,
      ...opts,
    });

    return res;
  }

  /**
   * post 方法
   * @param url 接口地址
   * @param data post 对应的参数
   * @param opts request-config [{@link RequestConfig}]
   */
  static post<T>(
    url: string,
    data: object = {},
    opts = {} as RequestConfig,
  ) {
    opts.paramsSendType = opts.paramsSendType || EParamsSendType.RequestPayload;
    return Http.commonHandler<T>('POST', url, data, opts);
  }

  /**
   * put 方法
   * @param url 接口地址
   * @param data put 对应的参数
   * @param opts request-config [{@link RequestConfig}]
   */
  static put<T>(
    url: string,
    data: object = {},
    opts = {} as RequestConfig,
  ) {
    return Http.commonHandler<T>('PUT', url, data, opts);
  }

  /**
   * delete 方法
   * @param url 接口地址
   * @param data delete 对应的参数
   * @param opts request-config [{@link RequestConfig}]
   */
  static delete<T>(
    url: string,
    data: object = {},
    opts = {} as RequestConfig,
  ) {
    return Http.commonHandler<T>('DELETE', url, data, opts);
  }

  /**
   * post/put/delete 方法
   * @param url 接口地址
   * @param body post/put/delete 对应的参数
   * @param opts request-config [{@link RequestConfig}]
   */
  static async commonHandler<T>(
    method: Method,
    url: string,
    data: object = {},
    opts = {} as RequestConfig,
  ) {
    const { paramsSendType, headers: customHeaders, ...restOptions } = opts;
    const isFormDatadMode = paramsSendType === EParamsSendType.FormData;

    const headers = customHeaders || {};
    const contentType = headers['Content-Type'] || postContentType[paramsSendType || EParamsSendType.RequestPayload];
    let params: RequestConfig = {
      method,
      url,
      headers: {
        ...headers,
        'Content-Type': contentType,
      },
      ...restOptions,
      data: isFormDatadMode ? qs.stringify(data) : data,
    };

    const res = await Http.common<T>(params);

    return res;
  }
}
