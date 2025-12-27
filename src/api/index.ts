import { getHostbaseUrl } from './request/auth';

export const UploadFileUrls = {
  normal: getHostbaseUrl() + '/luxmall-infra/files/upload',
  idNoFront: getHostbaseUrl() + '/luxmall-infra/tool/id-no/front/pic',
  idNoBack: getHostbaseUrl() + '/luxmall-infra/tool/id-no/back/pic',
};

export const UploadBgs = {
  idNoFront: 'https://lg5-prod-1314932667.cos.ap-nanjing.myqcloud.com/applet/erso-applet/iocn/ssn-front-bg.png',
  idNoBack: 'https://lg5-prod-1314932667.cos.ap-nanjing.myqcloud.com/applet/erso-applet/iocn/ssn-back-bg.png',
};
