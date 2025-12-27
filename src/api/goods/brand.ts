import { Http } from '../request/Fetch';
import { EResponseCode, getHttpErrorMessage } from '../request/RequestType';
import { IBrandItem } from '@/types/goods/brand';

const microPath = '/luxmall-product';

export async function queryBrandList(leafCategoryId?: string) {
  let data = [] as IBrandItem[];

  try {
    const { code, context, message } = await Http.get<IBrandItem[]>(
      `${microPath}/brand`,
      { leafCategoryId: leafCategoryId || undefined },
    );

    if (code === EResponseCode.Succeed) {
      data = context || [] as IBrandItem[];

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
