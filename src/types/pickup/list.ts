
// 文件类型
export interface OptFileDTO {
  id: number;
  busId: number;
  fileUrl: string;
}

// 商品信息类型
export interface ReceiveProductSaveDTO {
  receiveSubId: number;
  fileList: OptFileDTO[];
  productName: string;
  categoryCheckId: number;
  categoryName: string;
  categoryTopId: number;
  num: number;
  expectedPrice: number;
  needAppraisal: number;
}

// 请求参数类型
export interface OptReceivePageRequestDTO {
  page: number;
  size: number;
  receiveNo?: string;
  filterStatus?: string;
}

// 收件分页项类型
export interface OptReceivePageDTO {
  id: number;
  receiveNo: string;
  categoryNum: number;
  num: number;
  expectedTotalPrice: number;
  settlementTotalPrice: number;
  supplyCompany: string;
  shopName: string;
  memberName: string;
  phone: string;
  receiveStatus: number;
  paymentStatus: number;
  invoiceStatus: number;
  contractStatus: number;
  productList: ReceiveProductSaveDTO[];
}

// 分页结果类型
export interface PageResultOptReceivePageDTO {
  data: OptReceivePageDTO[];
  total: number;
}

// 通用响应类型
export interface CommonResultPageResultOptReceivePageDTO {
  code: number;
  message: string;
  context: PageResultOptReceivePageDTO;
  traceId: string;
  spanId: string;
}