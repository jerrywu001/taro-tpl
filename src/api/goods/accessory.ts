import { IAccessoryItem } from '@/types/goods/accessory';
import { Http } from '../request/Fetch';
import { EResponseCode, getHttpErrorMessage } from '../request/RequestType';

const microPath = '/luxmall-product';

export async function queryAccessoryList() {
  let data = [] as IAccessoryItem[];

  try {
    const { code, context, message } = await Http.get<IAccessoryItem[]>(`${microPath}/accessory`, {});

    if (code === EResponseCode.Succeed) {
      data = context || [] as IAccessoryItem[];

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
