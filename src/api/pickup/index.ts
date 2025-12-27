import { OptReceivePageDTO } from '@/types/pickup/list';
import { IReceiveDetail, IReceiveDetailParam } from '@/types/pickup/detail';
import { ISettlementOrder } from '@/types/pickup/settlement';
import { Http } from '../request/Fetch';
import { EResponseCode, getHttpErrorMessage } from '../request/RequestType';
import { IPaymentOrder } from '@/types/settlement';
import { ISaveRefundParam, IReturnableProductDetail, IRefundDetail, IRefundDetailParam } from '@/types/pickup/refound';
import { IReceiveInvoice, IReceiveInvoiceListParam } from '@/types/pickup/invoice';
import { IReceiveContractInfo, IReceiveContractInfoParam, IReceiveContractListItem } from '@/types/pickup/contract';
import { IPickupCreateParam } from '@/types/pickup';

const microPath = '/luxmall-operation';
const otherPath = '/luxmall-org';
const productPath = '/luxmall-product';
const settlementPath = '/luxmall-settlement';
const invoicePath = '/luxmall-invoice';

/* 收件列表 */
export async function queryPickUpList(params: any) {
  let list = [] as OptReceivePageDTO[];
  let total = 0;

  try {
    const { code, context, message } = await Http.post<{
      total: number;
      data: OptReceivePageDTO[];
    }>(`${microPath}/receive/page`, { ...params });

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

export async function queryOrgListByUser(params: any) {
  let data = [] as any;

  try {
    const { code, context, message } = await Http.post<any>(`${otherPath}/org-info/org-list/by-user`, params);

    if (code === EResponseCode.Succeed) {
      data = context || [] as any[];
    } else {
      throw new Error(message || '服务器异常，请稍后再试~');
    }
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }

  return data;
}

/** 查询叶子类目 */
export async function queryCategoryList(level: string, status: string) {
  let data = [] as Array<{
    id: string;
    name: string;
  }>;

  try {
    const { code, context, message } = await Http.get<any>(`${productPath}/category`, {
      level,
      status,
    });

    if (code === EResponseCode.Succeed) {
      data = context || [];

      for (const v of data) {
        v.id = String(v.id);
      }
    } else {
      throw new Error(message || '服务器异常，请稍后再试~');
    }
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }

  return data;
}

/** 保存收件单 */
export async function saveReceive(params: IPickupCreateParam) {
  let data = 0;

  params = JSON.parse(JSON.stringify(params));

  try {
    const { code, context, message } = await Http.post<number>(
      `${microPath}/receive/save`,
      params,
    );

    if (code === EResponseCode.Succeed) {
      data = context || 0;
    } else {
      throw new Error(message || '服务器异常，请稍后再试~');
    }
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }

  return data;
}

/** 查询收件单详情 */
export async function queryReceiveDetail(params: IReceiveDetailParam) {
  let data = {} as IReceiveDetail;

  try {
    const { code, context, message } = await Http.get<IReceiveDetail>(
      `${microPath}/receive/detail`,
      params,
    );

    if (code === EResponseCode.Succeed) {
      data = context || {} as IReceiveDetail;
      data.productList = data.productList || [];
    } else {
      throw new Error(message || '服务器异常，请稍后再试~');
    }
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }

  return data;
}

/**
 * 根据收件ID查询合同配置及状态
 * @param params 查询参数 {@link IReceiveContractInfoParam}
 * @returns 合同配置详情 {@link IReceiveContractInfo}
 */
export async function queryReceiveContractInfo(params: IReceiveContractInfoParam) {
  let data = {} as IReceiveContractInfo;

  try {
    const { code, context, message } = await Http.get<IReceiveContractInfo>(
      `${microPath}/receive/contract-info`,
      params,
    );

    if (code === EResponseCode.Succeed) {
      data = context || {} as IReceiveContractInfo;
    } else {
      throw new Error(message || '服务器异常，请稍后再试~');
    }
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }

  return data;
}

/** 通过receiveNo查询收件单详情 */
export async function queryReceiveDetailByNo(receiveNo: string | number) {
  let data = {} as IReceiveDetail;

  if (!receiveNo) {
    return data;
  }

  try {
    const { code, context, message } = await Http.get<IReceiveDetail>(
      `${microPath}/receive/detail`,
      { receiveNo: receiveNo || '' },
    );

    if (code === EResponseCode.Succeed) {
      data = context || {} as IReceiveDetail;
    } else {
      throw new Error(message || '服务器异常，请稍后再试~');
    }
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }

  return data;
}

/**
 * 根据收件单号查询付款单列表
 * @param receiptNo 收件单号
 * @returns 付款单列表 {@link IPaymentOrder}[]
 */
export async function queryPaymentOrderList(receiptNo: string) {
  let data = [] as IPaymentOrder[];

  try {
    const { code, context, message } = await Http.get<IPaymentOrder[]>(
      `${settlementPath}/payment-order/list-by-receipt/${receiptNo}`,
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
 * 根据收件单号查询结算单列表
 * @param receiptNo 收件单号
 * @returns 结算单列表 {@link ISettlementOrder}[]
 */
export async function querySettlementOrderList(receiptNo: string) {
  let data = [] as ISettlementOrder[];

  try {
    const { code, context, message } = await Http.get<ISettlementOrder[]>(
      `${settlementPath}/settlement-order/list-by-receipt/${receiptNo}`,
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
 * 作废收件单
 * @param id 收件单ID
 */
export async function cancelReceive(id: number) {
  try {
    const { code, message } = await Http.get<void>(
      `${microPath}/receive/cancel`,
      { id },
    );

    if (code !== EResponseCode.Succeed) {
      throw new Error(message || '服务器异常，请稍后再试~');
    }
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }
}

/**
 * 查询退货单列表
 * @param params 查询参数 {@link IRefoundOrderListParam}
 * @returns 退货单列表 {@link IRefundOrderItem}[]
 */
export async function queryRefundOrderList(params: any) {
  let list = [] as any[];
  let total = 0;

  try {
    const { code, context, message } = await Http.post<{
      total: number;
      data: any[];
    }>(`${microPath}/refund/page`, { ...params });

    if (code === EResponseCode.Succeed) {
      list = context?.data || [];
      total = context?.total || 0;
    } else {
      throw new Error(message || '服务器异常，请稍后再试~');
    }
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }

  return {
    list,
    total,
  };
}

/**
 * 新增退货单
 * @param params 退货单参数 {@link ISaveRefundParam}
 */
export async function addRefundOrder(params: ISaveRefundParam) {
  try {
    const { code, message } = await Http.post<void>(
      `${microPath}/refund/save`,
      params,
    );

    if (code !== EResponseCode.Succeed) {
      throw new Error(message || '服务器异常，请稍后再试~');
    }
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }
}

/**
 * 查询可进行退货的收件单列表
 * @returns 可退货的收件单列表
 */
export async function queryRefundReceiveList() {
  let data = [] as any[];

  try {
    const { code, context, message } = await Http.get<any[]>(
      `${microPath}/refund/receive-no/list`,
    );

    if (code !== EResponseCode.Succeed) {
      throw new Error(message || '服务器异常，请稍后再试~');
    }

    data = context || [];
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }

  return data;
}

/**
 * 根据收件id查询可退货商品信息
 * @param receiveId 收件单id
 */
export async function queryReturnableProductList(receiveId: number) {
  let data = [] as IReturnableProductDetail[];

  try {
    const { code, context, message } = await Http.get<IReturnableProductDetail[]>(
      `${microPath}/refund/returnable-list`,
      { receiveId },
    );

    if (code !== EResponseCode.Succeed) {
      throw new Error(message || '服务器异常，请稍后再试~');
    }

    data = context || [];
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }

  return data;
}

/**
 * 查询退货单详情
 * @param params 查询参数 {@link IRefundDetailParam}
 * @returns 退货单详情 {@link IRefundDetail}
 */
export async function queryRefundDetail(params: IRefundDetailParam) {
  let data = {} as IRefundDetail;

  try {
    const { code, context, message } = await Http.get<IRefundDetail>(
      `${microPath}/refund/detail`,
      params,
    );

    if (code !== EResponseCode.Succeed) {
      throw new Error(message || '服务器异常，请稍后再试~');
    }

    data = context || {} as IRefundDetail;
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }

  return data;
}

/**
 * 作废退款单
 * @param id 退款单id
 */
export async function cancelRefundOrder(id: number) {
  try {
    const { code, message } = await Http.get<void>(
      `${microPath}/refund/cancel`,
      { id },
    );

    if (code !== EResponseCode.Succeed) {
      throw new Error(message || '服务器异常，请稍后再试~');
    }
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }
}

/**
 * 编辑退货单
 * @param params 编辑参数 {@link ISaveRefundParam}
 */
export async function editRefundOrder(params: ISaveRefundParam) {
  let data = 0;

  try {
    const { code, context, message } = await Http.post<number>(
      `${microPath}/refund/edit`,
      params,
    );

    if (code === EResponseCode.Succeed) {
      data = context || 0;
    } else {
      throw new Error(message || '服务器异常，请稍后再试~');
    }
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }

  return data;
}

/**
 * 查询收件单开票信息列表
 * @param params 查询参数 {@link IReceiveInvoiceListParam}
 * @returns 开票信息列表 {@link IReceiveInvoice}[]
 */
export async function queryReceiveInvoiceList(params: IReceiveInvoiceListParam) {
  let data = [] as IReceiveInvoice[];

  try {
    const { code, context, message } = await Http.get<IReceiveInvoice[]>(
      `${invoicePath}/invoice/receive-list`,
      params,
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
 * 查询收件相关合同列表
 * @param params 查询参数 { id: number }
 * @returns 合同列表 {@link IReceiveContractListItem}[]
 */
export async function queryReceiveContractList(params: { id: number }) {
  let list = [] as IReceiveContractListItem[];

  try {
    const { code, context, message } = await Http.get<IReceiveContractListItem[]>(
      `${microPath}/receive/contract-list`,
      params,
    );

    if (code === EResponseCode.Succeed) {
      list = context || [];
    } else {
      throw new Error(message || '服务器异常，请稍后再试~');
    }
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }

  return list;
}

/**
 * 获取批量签署链接
 * @param id 收件单ID
 * @returns 签署链接URL
 */
export async function getBatchSignUrl(id: number) {
  let url = '';

  try {
    const { code, context, message } = await Http.get<string>(
      `${microPath}/receive/batch-url`,
      { id },
    );

    if (code === EResponseCode.Succeed) {
      url = context || '';
    } else {
      throw new Error(message || '服务器异常，请稍后再试~');
    }
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }

  return url;
}
