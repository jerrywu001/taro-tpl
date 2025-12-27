import { IInvoiceApplyDetail } from '@/types/invoice/index';
import { EResponseCode, getHttpErrorMessage } from '../request/RequestType';
import { Http } from '../request/Fetch';

const baseUrl = '/luxmall-invoice';

/**
 * 查询发票申请详情
 * @param id 发票申请ID
 * @returns 发票申请详情 {@link IInvoiceApplyDetail}
 */
export async function queryInvoiceDetail(id: number) {
  let data = {} as IInvoiceApplyDetail;

  try {
    const { code, context, message } = await Http.get<IInvoiceApplyDetail>(`${baseUrl}/invoice-apply/detail/${id}`);

    if (code !== EResponseCode.Succeed) {
      throw new Error(message || '服务器异常，请稍后再试~');
    }

    data = context || {} as IInvoiceApplyDetail;
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }

  return data;
}
