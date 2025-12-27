import { IInventoryItem, IInventoryListParam, InventoryItemQueryDTO, PageResultInventoryItemDTO } from '@/types/goods/inventory';
import { Http } from '../request/Fetch';
import { EResponseCode, getHttpErrorMessage } from '../request/RequestType';

const microPath = '/luxmall-product';

/**
 * 查询库存列表
 * @param params 查询参数
 * @returns 库存列表数据
 */
export async function queryInventoryList(params: IInventoryListParam) {
  let data = [] as IInventoryItem[];

  try {
    const { code, context, message } = await Http.post<IInventoryItem[]>(`${microPath}/inventory-item/list`, params);

    if (code === EResponseCode.Succeed) {
      data = context || [] as IInventoryItem[];
    } else {
      throw new Error(message || '服务器异常，请稍后再试~');
    }
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }

  return data;
}

/**
 * 分页查询库存列表
 * @param params 分页查询参数
 * @returns 分页库存列表数据
 */
export async function queryInventoryPage(params: InventoryItemQueryDTO) {
  try {
    const { code, context, message } = await Http.post<PageResultInventoryItemDTO>(
      `${microPath}/inventory-item/page`,
      params,
    );

    if (code === EResponseCode.Succeed) {
      return context || {
        data: [],
        total: 0,
      };
    }

    throw new Error(message || '服务器异常，请稍后再试~');
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }
}

/**
 * 商品上架
 * @param params 上架参数
 */
export async function onShelfInventory(params: { inventoryIdList: number[] }) {
  try {
    const { code, message } = await Http.post<void>(`${microPath}/inventory-item/on-shelf`, params);

    if (code !== EResponseCode.Succeed) {
      throw new Error(message || '服务器异常，请稍后再试~');
    }
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }
}

