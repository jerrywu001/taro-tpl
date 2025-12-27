import { Http } from '../request/Fetch';
import { EResponseCode, getHttpErrorMessage } from '../request/RequestType';

const microPath = '/luxmall-infra';

interface ISupportAgent {
  qrCode: string;
  name: string;
  avatar: string;
  phone: string;
}

export async function queryBrandList() {
  let data = [] as ISupportAgent[];

  try {
    const { code, context, message } = await Http.get<any>(
      `${microPath}/support-agent/list`,
    );

    if (code === EResponseCode.Succeed) {
      data = context || [] as ISupportAgent[];
    } else {
      throw new Error(message || '服务器异常，请稍后再试~');
    }
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }

  return data;
}
