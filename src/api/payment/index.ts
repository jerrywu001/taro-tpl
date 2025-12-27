import { IPaymentOrderDetail, IPaymentOrderListParam } from '@/types/pickup/payment';
import { EResponseCode, getHttpErrorMessage } from '../request/RequestType';
import { Http } from '../request/Fetch';
import { toConditional } from '@/types/common';
import { IPaymentOrder } from '@/types/settlement';

const baseUrl = '/luxmall-settlement/payment-order';

/**
 * 查询付款单详情
 * @param id 付款单ID
 * @returns 付款单详情数据
 */
export async function queryPaymentDetail(id: number) {
  let data = {} as IPaymentOrderDetail;

  try {
    const { code, context, message } = await Http.get<IPaymentOrderDetail>(`${baseUrl}/detail/${id}`, {});

    if (code === EResponseCode.Succeed) {
      data = context || {} as IPaymentOrderDetail;
    } else {
      throw new Error(message || '服务器异常，请稍后再试~');
    }
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }

  return data;
}

/**
 * 查询付款单列表
 * @param params 查询参数
 * @returns 付款单列表数据
 */
export async function queryPayOrders(params: IPaymentOrderListParam) {
  let total = 0;
  let data = [] as IPaymentOrder[];

  params = toConditional(params);

  try {
    const { code, context, message } = await Http.post<{
      total: number;
      data: IPaymentOrder[];
    }>(`${baseUrl}/page-query`, { ...params });

    if (code !== EResponseCode.Succeed) {
      throw new Error(message || '服务器异常，请稍后再试~');
    }

    total = context?.total || 0;
    data = context?.data || [];
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }

  return {
    total,
    data,
  };
}

