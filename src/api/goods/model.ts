import { IModelItem } from '@/types/goods/model';
import { Http } from '../request/Fetch';
import { EResponseCode, getHttpErrorMessage } from '../request/RequestType';

const microPath = '/luxmall-product';

export async function queryModelList(brandId?: string, seriesId?: string) {
  let data = [] as IModelItem[];

  try {
    const { code, context, message } = await Http.get<IModelItem[]>(`${microPath}/model`, {
      brandId: brandId || undefined,
      seriesId: seriesId || undefined,
    });

    if (code === EResponseCode.Succeed) {
      data = context || [] as IModelItem[];

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
