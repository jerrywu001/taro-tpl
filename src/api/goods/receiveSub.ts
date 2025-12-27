import { IImproveProductData, IImproveProductInfo, IImproveProductParams, IImproveStoreAllParam, IOptReceiveSubInvoiceParam, IReceiveGoodsItem, IReceiveProductItem, IReceiveProductListParam, IReceiveSubQueryParams } from '@/types/goods/receiveSub';
import { Http } from '../request/Fetch';
import { EResponseCode, getHttpErrorMessage } from '../request/RequestType';

const microPath = '/luxmall-operation';

export async function queryProductData(receiveSubId: string) {
  let data = {} as IImproveProductData;

  try {
    const { code, context, message } = await Http.get<IImproveProductData>(
      `${microPath}/receive-sub/improve-product-detail`,
      { receiveSubId },
    );

    if (code === EResponseCode.Succeed) {
      data = context || {} as IImproveProductData;
      data.productDetailDTO = data.productDetailDTO || {} as IImproveProductInfo;

      const items = data.receiveDetail?.baseForm?.dynamicFields || [];

      if (items.length > 0) {
        data.productDetailDTO.groupList = data.productDetailDTO.groupList || [];
        data.productDetailDTO.groupList.unshift({
          goodsId: data.receiveDetail?.baseForm?.id,
          groupId: 'baseFormList',
          groupName: '商品基础信息',
          fields: items,
        });
      }
    } else {
      throw new Error(message || '服务器异常，请稍后再试~');
    }
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }

  return data;
}

/**
 * 商品完善列表
 * @param params 查询参数 {@link IReceiveSubQueryParams}
 * @returns 商品完善列表 {@link IReceiveGoodsItem}[]
 */
export async function queryImproveGoodsList(params: IReceiveSubQueryParams) {
  let list = [] as IReceiveGoodsItem[];
  let total = 0;

  try {
    const { code, context, message } = await Http.post<{
      total: number;
      data: IReceiveGoodsItem[];
    }>(`${microPath}/receive-sub/improve-page`, { ...params });

    if (code === EResponseCode.Succeed) {
      list = context?.data || [];
      total = context?.total || 0;
    } else if (message) {
      throw new Error(message);
    }
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }

  return {
    list,
    total,
  };
}

export async function saveImproveProductData(params: IImproveProductParams) {
  try {
    const { code, message } = await Http.post<void>(
      `${microPath}/receive-sub/improve-product-save`,
      { ...params },
    );

    if (code !== EResponseCode.Succeed) {
      throw new Error(message || '服务器异常，请稍后再试~');
    }
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }
}

/**
 * 入库商品
 * @param params
 */
export async function saveImproveStore(params: IImproveProductParams) {
  try {
    const { code, message } = await Http.post<void>(
      `${microPath}/receive-sub/improve-store`,
      { ...params },
    );

    if (code !== EResponseCode.Succeed) {
      throw new Error(message || '服务器异常，请稍后再试~');
    }
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }
}

/**
 * 查询收件商品信息列表
 * @param params 查询参数 {@link IReceiveProductListParam}
 * @returns 收件商品信息列表 {@link IReceiveProductItem}[]
 */
export async function queryReceiveProductList(params: IReceiveProductListParam) {
  let data = [] as IReceiveProductItem[];

  try {
    const { code, context, message } = await Http.post<IReceiveProductItem[]>(
      `${microPath}/receive-sub/list`,
      { ...params },
    );

    if (code === EResponseCode.Succeed) {
      data = context || [];
    } else {
      throw new Error(message || '服务器异常，请稍后再试~');
    }
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }

  return data;
}

/**
 * 一键入库商品
 * @param params 一键入库参数 {@link IImproveStoreAllParam}
 */
export async function saveImproveStoreAll(params: IImproveStoreAllParam) {
  try {
    const { code, message } = await Http.post<void>(
      `${microPath}/receive-sub/improve-store-all`,
      { ...params },
    );

    if (code !== EResponseCode.Succeed) {
      throw new Error(message || '服务器异常，请稍后再试~');
    }
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }
}

/**
 * 申请开票
 * @param params 申请开票参数 {@link IOptReceiveSubInvoiceParam}
 */
export async function applyReceiveSubInvoice(params: IOptReceiveSubInvoiceParam) {
  try {
    const { code, message } = await Http.post<void>(
      `${microPath}/receive-sub/invoice`,
      { receiveSubId: params.receiveSubId },
    );

    if (code !== EResponseCode.Succeed) {
      throw new Error(message || '服务器异常，请稍后再试~');
    }
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }
}
