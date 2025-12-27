import {
  IOfficialPriceBrandGroup,
  IOfficialPriceProductCommonSearchReq,
  IPageResultOfficialPriceProductCommonVO,
  IOfficialPriceProductDTO,
  ICategorySearchItemVO,
  IPageResultSeriesDTO,
  IPageResultModelDTO,
} from '@/types/public-price';
import { EResponseCode, getHttpErrorMessage } from '../request/RequestType';
import { Http } from '../request/Fetch';

const baseUrl = '/luxmall-product/official-price-product';

/**
 * 查询小程序公价品牌列表（按首字母分组）
 * @returns 按首字母分组的品牌列表 {@link IOfficialPriceBrandGroup[]}
 */
export async function queryOfficialPriceBrands() {
  let data = [] as IOfficialPriceBrandGroup[];

  try {
    const { code, context, message } = await Http.get<IOfficialPriceBrandGroup[]>(`${baseUrl}/mini/brands`, {});

    if (code !== EResponseCode.Succeed) {
      throw new Error(message || '服务器异常，请稍后再试~');
    }

    data = context || ([] as IOfficialPriceBrandGroup[]);
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }

  return data;
}

/**
 * 搜索小程序公价商品
 * @param params 搜索参数
 * @returns 公价商品分页结果 {@link IPageResultOfficialPriceProductCommonVO}
 */
export async function searchOfficialPriceProducts(params: IOfficialPriceProductCommonSearchReq) {
  let data = {
    data: [],
    total: 0,
  } as IPageResultOfficialPriceProductCommonVO;

  try {
    const { code, context, message } = await Http.post<IPageResultOfficialPriceProductCommonVO>(
      `${baseUrl}/mini/search`,
      params,
    );

    if (code !== EResponseCode.Succeed) {
      throw new Error(message || '服务器异常，请稍后再试~');
    }

    data = context || ({
      data: [],
      total: 0,
    } as IPageResultOfficialPriceProductCommonVO);
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }

  return data;
}

/**
 * 查看公价商品详情
 * @param id 商品ID
 * @returns 公价商品详情 {@link IOfficialPriceProductDTO}
 */
export async function getOfficialPriceProductDetail(id: number) {
  let data = {} as IOfficialPriceProductDTO;

  try {
    const { code, context, message } = await Http.get<IOfficialPriceProductDTO>(
      `${baseUrl}/detail/${id}`,
      {},
    );

    if (code !== EResponseCode.Succeed) {
      throw new Error(message || '服务器异常，请稍后再试~');
    }

    data = context || ({} as IOfficialPriceProductDTO);
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }

  return data;
}

/**
 * 根据品牌查询关联叶子类目
 * @param brandId 品牌ID
 * @returns 类目搜索项列表 {@link ICategorySearchItemVO[]}
 */
export async function searchCategoriesByBrand(brandId: number) {
  let data = [] as ICategorySearchItemVO[];

  try {
    const { code, context, message } = await Http.get<ICategorySearchItemVO[]>(
      '/luxmall-product/category/search-by-brand',
      { brandId },
    );

    if (code !== EResponseCode.Succeed) {
      throw new Error(message || '服务器异常，请稍后再试~');
    }

    data = context || ([] as ICategorySearchItemVO[]);
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }

  return data;
}

/**
 * 查询系列列表
 * @param params 分页查询参数
 * @returns 系列分页结果 {@link IPageResultSeriesDTO}
 */
export async function querySeries(params?: {
  page?: number;
  size?: number;
  brandId?: number;
  leafCategoryId?: number;
}) {
  let data = {
    data: [],
    total: 0,
  } as IPageResultSeriesDTO;

  try {
    const { code, context, message } = await Http.post<IPageResultSeriesDTO>(
      '/luxmall-product/series/page',
      params,
    );

    if (code !== EResponseCode.Succeed) {
      throw new Error(message || '服务器异常，请稍后再试~');
    }

    data = context || {
      data: [],
      total: 0,
    } as IPageResultSeriesDTO;
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }

  return data;
}

/**
 * 查询型号列表
 * @param params 分页查询参数
 * @returns 型号分页结果 {@link IPageResultModelDTO}
 */
export async function queryModels(params?: {
  page?: number;
  size?: number;
  brandId?: number;
  seriesId?: number;
  leafCategoryId?: number;
}) {
  let data = {
    data: [],
    total: 0,
  } as IPageResultModelDTO;

  try {
    const { code, context, message } = await Http.post<IPageResultModelDTO>(
      '/luxmall-product/model/page',
      params,
    );

    if (code !== EResponseCode.Succeed) {
      throw new Error(message || '服务器异常，请稍后再试~');
    }

    data = context || {
      data: [],
      total: 0,
    } as IPageResultModelDTO;
  } catch (error) {
    throw new Error(getHttpErrorMessage(error));
  }

  return data;
}
