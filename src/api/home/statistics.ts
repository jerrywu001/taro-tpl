import { Http } from '../request/Fetch';
import { EResponseCode, getHttpErrorMessage } from '../request/RequestType';
import { IMiniHomeStatistics } from '@/types/home/statistics';

const microPath = '/luxmall-operation';

/**
 * 获取小程序首页统计数据
 * @returns 首页统计数据 {@link IMiniHomeStatistics}
 */
export async function queryMiniHomeStatistics() {
  let data = {} as IMiniHomeStatistics;

  try {
    const { code, context, message } = await Http.get<IMiniHomeStatistics>(`${microPath}/receive/mini-statistics`, {});

    if (code === EResponseCode.Succeed) {
      data = context || {} as IMiniHomeStatistics;
    } else if (code === EResponseCode.Unauthorized) {
      throw new Error('401');
    } else if (message) {
      throw new Error(message || '服务器异常，请稍后再试~');
    }
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }

  return data;
}
