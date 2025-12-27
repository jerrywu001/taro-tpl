import { Http } from '../request/Fetch';
import { toConditional } from '@/types/common';
import { IPayeeOrder, IPayeeOrderListParam } from '@/types/payee';
import { EResponseCode, getHttpErrorMessage } from '../request/RequestType';
import { IReceiptOrder, IReceiptOrderCreateParam, IReceiveCapabilityGroup } from '@/types/settlement/payee';

const baseUrl = '/luxmall-settlement/receipt-order';

/**
 * 查询收款单列表
 * @param params 查询参数
 * @returns 收款单列表数据
 */
export async function queryPayeeOrders(params: IPayeeOrderListParam) {
  let total = 0;
  let data = [] as IPayeeOrder[];

  params = toConditional(params);

  try {
    const { code, context, message } = await Http.post<{
      total: number;
      data: IPayeeOrder[];
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

/**
 * 查询收款单详情
 * @param id 收款单ID
 * @returns 收款单详情数据
 */
export async function queryPayeeOrderDetail(id: number) {
  try {
    const { code, context, message } = await Http.get<IPayeeOrder>(`${baseUrl}/detail/${id}`);

    if (code !== EResponseCode.Succeed) {
      throw new Error(message || '服务器异常，请稍后再试~');
    }

    const res = context || {} as IPayeeOrder;

    res.paymentRecords = res.paymentRecords || [];

    return res;
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }
}

/**
 * 查询商户收款能力-按门店分组
 * @param supplierId 商户ID
 * @returns 收款能力列表 {@link IReceiveCapabilityGroup}
 */
export async function queryReceiveCapabilityGroup(supplierId: number) {
  let data = [] as IReceiveCapabilityGroup[];

  try {
    const { code, context, message } = await Http.get<IReceiveCapabilityGroup[]>(`${baseUrl}/receive-capability/group/${supplierId}`, {});

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
 * 创建收款单并发起收款
 * @param param 创建收款单参数 {@link IReceiptOrderCreateParam}
 * @returns 收款单信息 {@link IReceiptOrder}
 * @description 从结算单创建收款单并调用外部收款接口发起收款，返回收款二维码等信息
 */
export async function createAndInitiateReceipt(param: IReceiptOrderCreateParam) {
  let data = {} as IReceiptOrder;

  try {
    const { code, context, message } = await Http.post<IReceiptOrder>(
      `${baseUrl}/create-and-initiate`,
      {
        ...param,
        payType: param.payType || 'ONLINE',
      },
    );

    if (code !== EResponseCode.Succeed) {
      throw new Error(message || '服务器异常，请稍后再试~');
    }

    data = context || {} as IReceiptOrder;
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }

  return data;
}

/**
 * 同步收款单支付状态
 * @param param 同步参数 {@link IReceiptOrderSyncParam}
 * @param amount 待收款金额（可选） mock环境才传
 * @description 调用外部收款接口查询收款单支付状态并更新收款单
 */
export async function syncReceiptOrderPayeeStatus(receiptId: number, amount?: number) {
  let data = {} as IReceiptOrder;

  try {
    const { code, context, message } = await Http.post<IReceiptOrder>(
      `${baseUrl}/sync-payment-status/${receiptId}`,
      { amount: amount || undefined },
    );

    if (code !== EResponseCode.Succeed) {
      throw new Error(message || '服务器异常，请稍后再试~');
    }

    data = context || {} as IReceiptOrder;
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }

  return data;
}

