import { IOrgInfo, EOrgType } from '@/types/org';
import { EResponseCode, getHttpErrorMessage } from '../request/RequestType';
import { Http } from '../request/Fetch';

const baseUrl = '/luxmall-org/org-info';

/**
 * 查询组织列表
 * @param params 查询参数
 * @returns 组织列表数据
 */
export async function queryOrgList(type: EOrgType) {
  let data = [] as IOrgInfo[];

  try {
    const { code, context, message } = await Http.post<IOrgInfo[]>(`${baseUrl}/list`, { type });

    if (code !== EResponseCode.Succeed) {
      throw new Error(message || '服务器异常，请稍后再试~');
    }

    data = context || [];
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }

  return data;
}
