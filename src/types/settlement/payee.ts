/**
 * 收款方式枚举
 */
export enum ERcptMethod {
  /** 二维码 （面对面） */
  QR_CODE = 'QR_CODE',
  /** 远程收款码 */
  EASYPAY = 'EASYPAY',
  /** POS终端 */
  POS_TERMINAL = 'POS_TERMINAL',
  /** 公户提现 */
  PUBLIC_WITHDRAWAL = 'PUBLIC_WITHDRAWAL',
  /** 开放接口 */
  OPENAPI = 'OPENAPI',
  /** 台账 */
  ACCOUNT_BOOK = 'ACCOUNT_BOOK',
  /** 商户转账 */
  MCH_TRANSFER = 'MCH_TRANSFER',
}

/**
 * 收款方式标签映射
 */
export const rcptMethodLabel = {
  [ERcptMethod.QR_CODE]: '二维码',
  [ERcptMethod.PUBLIC_WITHDRAWAL]: '公户提现',
  [ERcptMethod.OPENAPI]: '开放接口',
  [ERcptMethod.POS_TERMINAL]: 'POS终端',
  [ERcptMethod.ACCOUNT_BOOK]: '台账',
  [ERcptMethod.EASYPAY]: '易缴费远程收款码',
  [ERcptMethod.MCH_TRANSFER]: '商户转账',
};

export const payeeMethodLabel = {
  [ERcptMethod.QR_CODE]: '面对面收款码收款',
  [ERcptMethod.EASYPAY]: '远程收款码收款',
  [ERcptMethod.POS_TERMINAL]: 'POS终端收款',
  [ERcptMethod.PUBLIC_WITHDRAWAL]: '公户提现收款',
  [ERcptMethod.OPENAPI]: '开放接口收款',
  [ERcptMethod.ACCOUNT_BOOK]: '台账收款',
  [ERcptMethod.MCH_TRANSFER]: '商户转账收款',
};

/**
 * 收款能力信息
 */
export interface IReceiveCapability {
  /**
   * 收款方式
   * @description {@link ERcptMethod}
   */
  rcptMethod: ERcptMethod;
  /** 门店ID */
  storeId: string;
  /** 门店名称 */
  storeName: string;
  /** 收款终端编号 */
  receiveTerminalNo: string;
  /** 收款终端名称 */
  receiveTerminalName: string;
}

/**
 * 收款能力分组信息（按门店分组）
 */
export interface IReceiveCapabilityGroup {
  /** 门店ID */
  storeId: string;
  /** 门店名称 */
  storeName: string;
  /**
   * 收款能力列表
   * @description {@link IReceiveCapability}
   */
  capabilities: IReceiveCapability[];
}

export interface IPaymentMethodOption {
  /**
   * 收款方式
   * @description {@link ERcptMethod}
   */
  rcptMethod: ERcptMethod;
  name: string;
  desc: string;
  icon: string;
}

export const payeeMethodConfig: Record<string, IPaymentMethodOption> = {
  [ERcptMethod.QR_CODE]: {
    rcptMethod: ERcptMethod.QR_CODE,
    name: '面对面',
    desc: '收款码收款',
    icon: 'https://lg5-prod-1314932667.cos.ap-nanjing.myqcloud.com/applet/erso-applet/payee/qrcode.png',
  },
  [ERcptMethod.EASYPAY]: {
    rcptMethod: ERcptMethod.EASYPAY,
    name: '远程',
    desc: '收款码收款',
    icon: 'https://lg5-prod-1314932667.cos.ap-nanjing.myqcloud.com/applet/erso-applet/payee/qrcode.png',
  },
  [ERcptMethod.POS_TERMINAL]: {
    rcptMethod: ERcptMethod.POS_TERMINAL,
    name: 'POS机',
    desc: '终端收款',
    icon: 'https://lg5-prod-1314932667.cos.ap-nanjing.myqcloud.com/applet/erso-applet/payee/pos.png',
  },
};

/**
 * 收款渠道枚举
 */
export enum EReceiptChannel {
  /** 面对面二维码收款 */
  FACE_TO_FACE = 'FACE_TO_FACE',
  /** 远程二维码收款 */
  REMOTE_QR = 'REMOTE_QR',
  /** POS终端收款 */
  POS_MACHINE = 'POS_MACHINE',
  /** 第三方收款 */
  THIRD_PARTY = 'THIRD_PARTY',
  /** 其他渠道 */
  OTHER = 'OTHER',
}

/**
 * 收款状态枚举
 */
export enum EReceiptStatus {
  /** 待收款 */
  PENDING = 'PENDING',
  /** 收款中 */
  PROCESSING = 'PROCESSING',
  /** 已收款 */
  SUCCESS = 'SUCCESS',
  /** 收款失败 */
  FAILED = 'FAILED',
}

export const receiptStatusLabel = {
  [EReceiptStatus.PENDING]: '待收款',
  [EReceiptStatus.PROCESSING]: '收款中',
  [EReceiptStatus.SUCCESS]: '收款成功',
  [EReceiptStatus.FAILED]: '收款失败',
};

/**
 * 创建收款单请求参数
 */
export interface IReceiptOrderCreateParam {
  /** 结算单ID */
  settlementOrderId: number;
  /**
   * 收款方式
   * @description {@link ERcptMethod}
   */
  rcptMethod?: ERcptMethod;
  /** 收款终端编号 */
  receiveTerminalNo?: string;
  /** 收款金额（如果不传，默认使用结算单的待收款金额） */
  amount?: number;
  /** 备注信息 */
  memo?: string;
  /** 收款凭证 */
  voucherFileUrls?: string[];
  /** 收款类型 */
  payType?: string;
}

/**
 * 收款单信息
 */
export interface IReceiptOrder {
  /** 收款单ID */
  id: number;
  /** 收款单号 */
  receiptNo: string;
  /** 结算单ID */
  settlementId: number;
  /** 结算单号 */
  settlementNo: string;
  /** 结算类型 */
  settlementType: string;
  /** 关联业务单号（退货单号等） */
  relatedOrderNo: string;
  /** 供应商ID */
  supplierId: number;
  /** 供应商名称 */
  supplierName: string;
  /** 应收金额 */
  receivableAmount: number;
  /** 实收金额 */
  actualAmount: number;
  /**
   * 收款渠道
   * @description {@link EReceiptChannel}
   */
  channel: EReceiptChannel;
  /**
   * 收款状态
   * @description {@link EReceiptStatus}
   */
  status: EReceiptStatus;
  /** 收款时间 */
  receiptTime: string;
  /** 收款凭证 */
  voucherFileUrls: string[];
  /** 资金流水号 */
  transactionNo: string;
  /** 备注 */
  remark: string;
  /** 付款方姓名（退货会员） */
  payerName: string;
  /** 付款方手机号 */
  payerPhone: string;
  /** 支付订单号 */
  tpOrderNo: string;
  /** 收款二维码地址 */
  qrCodeUrl: string;
  /** 收款人（实际收款操作人） */
  receiver: string;
  /** 退货商品数量（关联结算单商品总数） */
  itemCount: number;
  /** 创建人 */
  creator: string;
  /** 创建时间 */
  createTime: string;
  /** 更新人 */
  updater: string;
  /** 更新时间 */
  updateTime: string;
  /**
   * 收款方式枚举
   * @description {@link ERcptMethod}
   */
  rcptMethod: ERcptMethod;
}
