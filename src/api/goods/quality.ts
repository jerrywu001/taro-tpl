import { IQualityItem } from '@/types/goods/quality';
import { Http } from '../request/Fetch';
import { EResponseCode, getHttpErrorMessage } from '../request/RequestType';

const microPath = '/luxmall-product';

export async function queryQualityList() {
  let data = [] as IQualityItem[];

  try {
    const { code, context, message } = await Http.get<IQualityItem[]>(`${microPath}/product-condition`, {});

    if (code === EResponseCode.Succeed) {
      data = context || [] as IQualityItem[];

      for (const item of data) {
        item.id = String(item.id);
      }
    } else {
      throw new Error(message || '服务器异常，请稍后再试~');
    }
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }

  return data;
}
