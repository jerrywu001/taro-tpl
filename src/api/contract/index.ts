import { Http } from '../request/Fetch';
import { IContractTodoItem, IContractTodoParam, IContractCreateParam, IContractCreateResult, IContractDetailParam, IContractDetailResponse, IContractActorSignParam, IContractRevokeParam } from '@/types/contract';
import { EResponseCode, getHttpErrorMessage } from '../request/RequestType';

const contractMicroPath = '/luxmall-contract';

export async function queryContractTodoList(params: IContractTodoParam, showSignCompleted = false) {
  let total = 0;
  let data = [] as IContractTodoItem[];

  try {
    const { code, context, message } = await Http.post<{
      data: IContractTodoItem[];
      total: number;
    }>(`${contractMicroPath}/contract/to-do-contract`, {
      ...params,
      showSignCompleted,
    });

    if (code === EResponseCode.Succeed) {
      data = context?.data || [];
      total = context?.total || 0;
    } else {
      throw new Error(message || '服务器异常，请稍后再试~');
    }
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }

  return {
    data,
    total,
  };
}

/**
 * 创建合同
 */
export async function addContract(params: IContractCreateParam) {
  let result = {} as IContractCreateResult;

  try {
    const { code, context, message } = await Http.post<IContractCreateResult>(
      `${contractMicroPath}/contract/create`,
      params,
    );

    if (code === EResponseCode.Succeed) {
      result = context || {} as IContractCreateResult;
    } else {
      throw new Error(message || '服务器异常，请稍后再试~');
    }
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }

  return result;
}

/**
 * 查询合同详情
 */
export async function queryContractDetail(params: IContractDetailParam) {
  let data = {} as IContractDetailResponse;

  try {
    const { code, context, message } = await Http.get<IContractDetailResponse>(
      `${contractMicroPath}/contract/detail`,
      { id: params.id },
    );

    if (code === EResponseCode.Succeed) {
      data = context || {} as IContractDetailResponse;
    } else {
      throw new Error(message || '服务器异常，请稍后再试~');
    }
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }

  return data;
}

/**
 * 获取签署方签署链接
 */
export async function queryActorSignLink(params: IContractActorSignParam) {
  let data = '';

  try {
    const { code, context, message } = await Http.post<string>(
      `${contractMicroPath}/contract/actor-sign`,
      { id: params.id },
    );

    if (code === EResponseCode.Succeed) {
      data = context || '';
    } else {
      throw new Error(message || '服务器异常，请稍后再试~');
    }
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }

  return data;
}

/**
 * 撤销合同
 */
export async function revokeContract(params: IContractRevokeParam) {
  try {
    const { code, message } = await Http.get<void>(
      `${contractMicroPath}/contract/revoke`,
      {
        id: params.id,
        revokeReason: encodeURIComponent(params.revokeReason),
      },
    );

    if (code !== EResponseCode.Succeed) {
      throw new Error(message || '服务器异常，请稍后再试~');
    }
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }
}
