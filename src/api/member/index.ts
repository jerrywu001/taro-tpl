import { Http } from '../request/Fetch';
import { EResponseCode, getHttpErrorMessage } from '../request/RequestType';
import { IMemberQueryParam, ISystemMember, IMemberAddParam, IMemberUpdateParam, IMemberDetail, IMemberCertParam, IMemberBankCardAddParam, IMemberBankCard } from '@/types/member';

const microPath = '/luxmall-staff';

/**
 * 会员列表
 * @param params 查询参数
 */
export async function queryMemberList(params: IMemberQueryParam) {
  let list = [] as ISystemMember[];
  let total = 0;

  try {
    const { code, context, message } = await Http.post<{
      total: number;
      data: ISystemMember[];
    }>(`${microPath}/member/applet-page`, params);

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

/**
 * 会员详情
 * @param id 会员ID
 */
export async function queryMemberDetail(id: number) {
  let data = {} as IMemberDetail;

  try {
    const { code, context, message } = await Http.get<IMemberDetail>(`${microPath}/member/detail`, { id });

    if (code === EResponseCode.Succeed) {
      data = context || {} as IMemberDetail;

      data.base = data.base || {};
      data.certification = data.certification || {};
      data.bankCards = data.bankCards || [];
    } else if (message) {
      throw new Error(message);
    }
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }

  return data;
}

/**
 * 新增会员
 * @param params 会员信息
 */
export async function addMember(params: IMemberAddParam) {
  let rs = {} as IMemberDetail;

  try {
    const { code, context, message } = await Http.post<IMemberDetail>(`${microPath}/member/add`, params);

    if (code !== EResponseCode.Succeed) {
      throw new Error(message || '新增会员失败');
    }

    rs = context || {} as IMemberDetail;
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }

  return rs;
}

/**
 * 编辑会员
 * @param params 会员信息
 */
export async function editMember(params: IMemberUpdateParam) {
  try {
    const { code, message } = await Http.post(`${microPath}/member/edit`, params);

    if (code !== EResponseCode.Succeed) {
      throw new Error(message || '编辑会员失败');
    }
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }
}

/**
 * 会员实名认证
 * @param params 认证信息
 * @returns 认证结果
 */
export async function memberCertification(params: IMemberCertParam) {
  let data = {} as IMemberDetail;

  try {
    const { code, context, message } = await Http.post<IMemberDetail>(`${microPath}/member/certification`, params);

    if (code !== EResponseCode.Succeed) {
      throw new Error(message || '提交实名认证失败');
    }

    data = context || {} as IMemberDetail;
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }

  return data;
}

/**
 * 删除会员绑定的银行卡
 * @param id 银行卡ID
 */
export async function deleteBankCard(bankAccountId: number) {
  try {
    const { code, message } = await Http.post(`${microPath}/member/bank-card/delete?id=${bankAccountId}`, {});

    if (code !== EResponseCode.Succeed) {
      throw new Error(message || '删除银行卡失败');
    }
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }
}

/**
 * 新增会员绑定的银行卡
 * @param params 银行卡信息 {@link IMemberBankCardAddParam}
 */
export async function addBankCard(params: IMemberBankCardAddParam) {
  let data = {} as IMemberBankCard;

  try {
    const { code, context, message } = await Http.post<IMemberBankCard>(`${microPath}/member/bank-card/add`, params);

    if (code !== EResponseCode.Succeed) {
      throw new Error(message || '新增银行卡失败');
    }

    data = context || {} as IMemberBankCard;
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }

  return data;
}
