
import { Http } from '../request/Fetch';
import { toConditional } from '@/types/common';
import { EResponseCode, getHttpErrorMessage } from '../request/RequestType';
import { ISettlementPayParam, IPaymentOrder, IPaymentTodoQueryParam, IPaymentStatusQueryParam, IPaymentStatusResponse, ISettlementOrderPageQueryParam } from '@/types/settlement';
import { ESettlementType, ISettlementOrder, ISettlementOrderCancelParam, ISettlementOrderSaveParam } from '@/types/pickup/settlement';

const baseUrl = '/luxmall-settlement/settlement-order';
const paymentBaseUrl = '/luxmall-settlement/payment-order';

/**
 * 分页查询结算单列表
 * @param params 查询参数 {@link ISettlementOrderPageQueryParam}
 * @returns 结算单列表
 */
export async function querySettlementOrderList(params: ISettlementOrderPageQueryParam) {
  let data = {
    data: [] as ISettlementOrder[],
    total: 0,
  };

  try {
    const { code, context, message } = await Http.post<{
      data: ISettlementOrder[];
      total: number;
    }>(`${baseUrl}/page-query`, toConditional(params));

    if (code !== EResponseCode.Succeed) {
      throw new Error(message || '服务器异常，请稍后再试~');
    }

    data = context || {
      data: [],
      total: 0,
    };
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }

  return data;
}

/**
 * 查询结算单详情
 * @param id 结算单ID
 * @param opts 查询参数 {@link ISettlementOrderDetailQueryParam} mock 环境下才传
 * @returns 结算单详情 {@link ISettlementOrder}
 */
export async function querySettlementDetail(id: number, opts?: {
  actualAmount?: number;
  settlementType?: ESettlementType;
  doPayee?: boolean;
}) {
  let data = {} as ISettlementOrder;

  try {
    const { code, context, message } = await Http.get<ISettlementOrder>(
      `${baseUrl}/detail/${id}`,
      {
        actualAmount: __IS_MOCK__ ? opts?.actualAmount || undefined : undefined,
        settlementType: __IS_MOCK__ ? opts?.settlementType || undefined : undefined,
        doPayee: __IS_MOCK__ ? opts?.doPayee || undefined : undefined,
      },
    );

    if (code !== EResponseCode.Succeed) {
      throw new Error(message || '服务器异常，请稍后再试~');
    }

    data = context || {} as ISettlementOrder;
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }

  return data;
}

/**
 * 结算单付款
 * @param param 付款参数 {@link ISettlementPayParam}
 * @returns 付款单信息 {@link IPaymentOrder}
 */
export async function addSettlementPay(param: ISettlementPayParam) {
  let data = {} as IPaymentOrder;

  try {
    const { code, context, message } = await Http.post<IPaymentOrder>(`${paymentBaseUrl}/do-pay`, param);

    if (code !== EResponseCode.Succeed) {
      throw new Error(message || '服务器异常，请稍后再试~');
    }

    data = context || {} as IPaymentOrder;
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }

  return data;
}

/**
 * 查询付款待办结算单列表
 * @param param 查询参数 {@link IPaymentTodoQueryParam}
 * @returns 结算单列表
 */
export async function queryPaymentTodoList(param: IPaymentTodoQueryParam) {
  let data = {
    data: [] as ISettlementOrder[],
    total: 0,
  };

  try {
    const { code, context, message } = await Http.post<{
      data: ISettlementOrder[];
      total: number;
    }>(`${baseUrl}/payment-todo/page-query`, toConditional(param));

    if (code !== EResponseCode.Succeed) {
      throw new Error(message || '服务器异常，请稍后再试~');
    }

    data = context || {
      data: [],
      total: 0,
    };
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }

  return data;
}

/**
 * 保存结算单
 * @param param 结算单参数 {@link ISettlementOrder}
 * @description 若结算单ID不存在则创建，若存在则更新
 */
export async function saveSettlementOrder(param: ISettlementOrderSaveParam) {
  let data = {} as ISettlementOrder;

  try {
    const { code, context, message } = await Http.post<ISettlementOrder>(`${baseUrl}/edit`, param);

    if (code !== EResponseCode.Succeed) {
      throw new Error(message || '服务器异常，请稍后再试~');
    }

    data = context || {} as ISettlementOrder;
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }

  return data;
}

/**
 * 保存并提交结算单
 * @param param 结算单参数 {@link ISettlementOrder}
 * @description 若结算单ID不存在则创建，若存在则更新
 */
export async function submitSettlementOrder(param: ISettlementOrderSaveParam) {
  let data = {} as ISettlementOrder;

  try {
    const { code, context, message } = await Http.post<ISettlementOrder>(`${baseUrl}/submit`, param);

    if (code !== EResponseCode.Succeed) {
      throw new Error(message || '服务器异常，请稍后再试~');
    }

    data = context || {} as ISettlementOrder;
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }

  return data;
}

/**
 * 作废结算单
 * @param id 结算单ID
 * @description 作废结算单，若结算单ID不存在则抛出异常
 */
export async function voidOrderSettlementOrder(param: ISettlementOrderCancelParam) {
  try {
    const { code, message } = await Http.post(`${baseUrl}/void`, param);

    if (code !== EResponseCode.Succeed) {
      throw new Error(message || '服务器异常，请稍后再试~');
    }
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }
}

/**
 * 查询支付状态
 * @param param 查询参数 {@link IPaymentStatusQueryParam}
 * @returns 支付状态信息 {@link IPaymentStatusResponse}
 */
export async function queryPaymentStatus(param: IPaymentStatusQueryParam) {
  let data = {} as IPaymentStatusResponse;

  try {
    const { code, context, message } = await Http.post<IPaymentStatusResponse>(`${paymentBaseUrl}/pay-status/fetch`, param);

    if (code !== EResponseCode.Succeed) {
      throw new Error(message || '服务器异常，请稍后再试~');
    }

    data = context || {} as IPaymentStatusResponse;
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }

  return data;
}
