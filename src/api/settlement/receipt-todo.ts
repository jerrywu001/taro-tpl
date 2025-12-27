import { IReceiptTodoQueryParam, IReceiptTodoOrder } from '@/types/settlement/receipt-todo';
import { EResponseCode, getHttpErrorMessage } from '../request/RequestType';
import { Http } from '../request/Fetch';
import { toConditional } from '@/types/common';

const baseUrl = '/luxmall-settlement/settlement-order';

/**
 * 查询收款待办结算单列表
 * @param param 查询参数 {@link IReceiptTodoQueryParam}
 * @returns 收款待办结算单列表 {@link IReceiptTodoListResponse}
 */
export async function queryReceiptTodoList(param: IReceiptTodoQueryParam) {
  let total = 0;
  let data = [] as IReceiptTodoOrder[];

  try {
    const { code, context, message } = await Http.post<{
      data: IReceiptTodoOrder[];
      total: number;
    }>(
      `${baseUrl}/receipt-todo/page-query`,
      toConditional(param),
    );

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
