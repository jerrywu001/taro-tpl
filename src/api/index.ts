import { ICnapsCode, IMasterBank, IReceiveRefundOption } from '@/types/common';
import { getHostbaseUrl } from './request/auth';
import { Http } from './request/Fetch';
import { EResponseCode, getHttpErrorMessage } from './request/RequestType';
import { ESettlementType } from '@/types/pickup/settlement';

export const UploadFileUrls = {
  normal: getHostbaseUrl() + '/luxmall-infra/files/upload',
  idNoFront: getHostbaseUrl() + '/luxmall-infra/tool/id-no/front/pic',
  idNoBack: getHostbaseUrl() + '/luxmall-infra/tool/id-no/back/pic',
};

export const UploadBgs = {
  idNoFront: 'https://lg5-prod-1314932667.cos.ap-nanjing.myqcloud.com/applet/erso-applet/iocn/ssn-front-bg.png',
  idNoBack: 'https://lg5-prod-1314932667.cos.ap-nanjing.myqcloud.com/applet/erso-applet/iocn/ssn-back-bg.png',
};

const microPath = '/luxmall-infra';

/**
 * 查询总行列表
 */
export async function queryMasterBanks(bankName = '', bankCode?: string) {
  let banks = [] as IMasterBank[];

  try {
    const { code, context, message } = await Http.post<IMasterBank[]>(
      `${microPath}/yop/base/master-bank-list`,
      {
        bankName,
        bankCode,
      },
    );

    if (code === EResponseCode.Succeed) {
      banks = context || [];
    } else {
      throw new Error(message || '服务器异常，请稍后再试~');
    }
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }

  return banks;
}

/**
 * 查询支行&&大额行号列表
 */
export async function queryBranchBanks(param?: {
  bankCode: string;
  cnapsName?: string;
  cnapsCode?: string;
  provinceCode?: string;
  cityCode?: string;
}) {
  let items: Array<ICnapsCode> = [];

  try {
    const { code, context, message } = await Http.post<ICnapsCode[]>(`${microPath}/yop/base/bankcode`, param);

    if (code === EResponseCode.Succeed) {
      items = context || [];
    } else {
      throw new Error(message || '服务器异常，请稍后再试~');
    }
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }

  return items;
}

/**
 * 收件单-退货单列表查询
 */
export async function queryReceiveRefundOptions(type: ESettlementType) {
  let items: Array<IReceiveRefundOption> = [];

  try {
    const { code, context, message } = await Http.get<IReceiveRefundOption[]>(
      '/luxmall-operation/receive/receive-refund/list',
      {
        type,
        scope: 0,
      },
    );

    if (code === EResponseCode.Succeed) {
      items = context || [];

      for (const v of items) {
        if (typeof v.busId === 'number') continue;
        v.busId = Number(v.busId);
      }
    } else {
      throw new Error(message || '服务器异常，请稍后再试~');
    }
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }

  return items;
}
