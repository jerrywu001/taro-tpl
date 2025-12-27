/**
 * 操作类型
 */
export enum EOperateType {
  /** 保存草稿 */
  Draft = 0,
  /** 提交审核 */
  Submit = 1,
}

/**
 * 附件信息
 */
export interface IFileInfo {
  /** 主键 */
  id?: number;
  /** 业务id */
  busId?: number;
  /** 附件url */
  fileUrl?: string;
}
