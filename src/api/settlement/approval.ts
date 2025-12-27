import { toConditional } from '@/types/common';
import { Http } from '../request/Fetch';
import { EResponseCode, getHttpErrorMessage } from '../request/RequestType';
import { ISettlementApprovalListParams, ISettlementApprovalParams, ISettlementApprovalRes } from '@/types/settlement/approval';

const microPath = '/luxmall-settlement';

/**
 * 分页查询审批中的结算单
 * @param params 查询参数 {@link ISettlementApprovalListParams}
 * @returns 结算单审批列表 {@link ISettlementApprovalRes}
 */
export async function querySettlementApprovalList(params: ISettlementApprovalListParams) {
  let data = {} as ISettlementApprovalRes;

  params = toConditional(params);

  try {
    const { code, context, message } = await Http.post<ISettlementApprovalRes>(`${microPath}/settlement-order/auditing/page-query`, params);

    if (code === EResponseCode.Succeed) {
      data = context || {} as ISettlementApprovalRes;
    } else if (message) {
      throw new Error(message || '服务器异常，请稍后再试~');
    }
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }

  return data;
}

/**
 * 审核结算单
 * @param params 审批参数 {@link ISettlementApprovalParams}
 */
export async function settlementApproval(params: ISettlementApprovalParams) {
  try {
    const { code, message } = await Http.post<void>(`${microPath}/settlement-order/audit`, params);

    if (code !== EResponseCode.Succeed) {
      throw new Error(message || '服务器异常，请稍后再试~');
    }
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }
}
