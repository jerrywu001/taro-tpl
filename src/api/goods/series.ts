import { ISeriesItem } from '@/types/goods/series';
import { Http } from '../request/Fetch';
import { EResponseCode, getHttpErrorMessage } from '../request/RequestType';

const microPath = '/luxmall-product';

export async function querySeriesList(brandId?: string) {
  let data = [] as ISeriesItem[];

  try {
    const { code, context, message } = await Http.get<ISeriesItem[]>(
      `${microPath}/series`,
      { brandId: brandId || undefined },
    );

    if (code === EResponseCode.Succeed) {
      data = context || [] as ISeriesItem[];

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
