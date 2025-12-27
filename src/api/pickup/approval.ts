import { Http } from '../request/Fetch';
import { EResponseCode, getHttpErrorMessage } from '../request/RequestType';
import { IPickUpApproval, IPickUpApprovalListParams, IPickUpApprovalParams, IPickUpRefundApproval, IPickUpRefundApprovalsParam } from '@/types/pickup/approval';

const microPath = '/luxmall-operation';

/** 收件审批列表 */
export async function queryPickUpApprovalList(params: IPickUpApprovalListParams) {
  let data = [] as IPickUpApproval[];
  let total = 0;

  try {
    const { code, context, message } = await Http.post<{
      data: IPickUpApproval[];
      total: number;
    }>(`${microPath}/approve/page`, params);

    if (code === EResponseCode.Succeed) {
      data = context?.data || [];
      total = context?.total || 0;
    } else if (message) {
      throw new Error(message || '服务器异常');
    }
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }

  return {
    data,
    total,
  };
}

/** 收件退货审批列表 */
export async function queryPickUpRefundApprovals(params: IPickUpRefundApprovalsParam) {
  let data = [] as IPickUpRefundApproval[];
  let total = 0;

  try {
    const { code, context, message } = await Http.post<{
      data: IPickUpRefundApproval[];
      total: number;
    }>(`${microPath}/approve/refund-page`, params);

    if (code === EResponseCode.Succeed) {
      data = context?.data || [];
      total = context?.total || 0;
    } else if (message) {
      throw new Error(message || '服务器异常');
    }
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }

  return {
    data,
    total,
  };
}

export async function pickUpApproval(params: IPickUpApprovalParams) {
  try {
    const { code, message } = await Http.post<void>(`${microPath}/approve/operate`, params);

    if (code !== EResponseCode.Succeed) {
      throw new Error(message || '服务器异常');
    }
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }
}

/**
 * 根据收件单id直接审批
 * @param params 审批参数 {@link IPickUpApprovalParams}
 */
export async function approveReceiveById(params: IPickUpApprovalParams) {
  try {
    const { code, message } = await Http.post<void>(`${microPath}/approve/operate-receive-id`, params);

    if (code !== EResponseCode.Succeed) {
      throw new Error(message || '服务器异常');
    }
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }
}
