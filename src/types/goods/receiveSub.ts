import { IDynamicComponent } from '@/components/dynamic';
import { IImageData, IPageParam } from '../common';

/**
 * 商品完善数据详情响应（context）
 * 对应接口返回的主体数据结构
 */
export interface IImproveProductData {
  /** 收件信息 */
  receiveDetail: IImproveReceiveDetail;
  /**
   * 商品表单数据
   */
  productDetailDTO: IImproveProductInfo;
}

export interface IImproveReceiveDetail {
  /** 收件单号 */
  receiveNo: string;
  /** 子收件单号 */
  receiveSubNo: string;
  /** 商品类目 */
  categoryName?: string;
  /** 商品标题 */
  productName: string;
  /** 收件成本 */
  expectedPrice: number;
  /** 收件图片 */
  fileList: IImageData[];
  baseForm: {
    /** 商品id */
    id: string;
    /** 商品基础信息 */
    dynamicFields: IDynamicComponent[];
  };
}

export interface IReceiveSubQueryParams extends IPageParam {
  /** 收件单号 */
  receiveNo: string;
}

export interface IReceiveGoodsItem {
  /** 收件头像 https://lg5-prod-1314932667.cos.ap-nanjing.myqcloud.com/applet/erso-applet/list-wendang */
  receiveAvatar?: string;
  /** 子收件单id */
  receiveSubId: string;
  /** 收件单号 */
  receiveNo: string;
  /** 子收件单号 */
  receiveSubNo: string;
  /** 收件人员 */
  receivePerson: string;
  /** 店铺名称 */
  shopName: string;
  /** 收件时间 */
  createTime: string;
  /** 商品标题 */
  productName: string;
  /** 商品类目 */
  categoryName?: string;
  /** 商品图片 */
  fileList: IImageData[];
}

export interface IGroupInfo {
  /** 商品分组ID */
  groupId: string;
  /** 商品分组名称 */
  groupName: string;
  /** 商品id */
  goodsId?: string;
  /** 商品分组字段 */
  fields: IDynamicComponent[];
}

export interface IImproveProductInfo {
  /** 库存唯一码ID */
  inventoryId?: number;
  /** 类目ID */
  leafCategoryId?: string;
  /** 商品表单发布哈希值 */
  formPublishedHash?: string;
  /** 消费凭证 */
  voucherPicUrl?: string[];
  /** 商品分组 */
  groupList?: IGroupInfo[];
}

export interface IImproveProductParams {
  /** 子收件单id */
  receiveSubId: string;
  /** 商品完善数据详情 */
  productDetailDTO: IImproveProductInfo;
}

/**
 * 一键入库请求参数
 */
export interface IImproveStoreAllParam {
  /** 子收件id数组 */
  receiveSubId: number[];
}

/**
 * 申请开票请求参数
 */
export interface IOptReceiveSubInvoiceParam {
  /** 勾选的子收件单id */
  receiveSubId: number[];
}

/**
 * 查询收件商品列表请求参数
 */
export interface IReceiveProductListParam {
  /** 收件单id数组 */
  receiveId: number[];
  /** 查询范围 0:全部 1:待入库商品 */
  scope: number;
}

/**
 * 附件信息
 */
export interface IOptFileDTO {
  /** 主键 */
  id: number;
  /** 业务id */
  busId: number;
  /** 附件url */
  fileUrl: string;
}

/**
 * 收件商品信息
 */
export interface IReceiveProductItem {
  /** 收件单id */
  receiveId: number;
  /** 子收件单id */
  receiveSubId: number;
  /** 收件图片 */
  fileList: IOptFileDTO[];
  /** 商品标题 */
  productName: string;
  /** 商品类目 */
  categoryName: string;
  /** 商品数量 */
  num: number;
  /** 期望金额 */
  expectedPrice: number;
  /** 结算总金额 */
  settlementTotalPrice: number;
  /** 商品完善状态 0:未完善 1:已完善 */
  improveProductStatus: number;
  /** 品牌名 */
  brandName: string;
  /** 成色 */
  conditionName: string;
  /** 付款状态 */
  paymentStatus?: number;
}
