import { GeneralModel, ProductsModel } from '../../models';

export enum ActionType {
  SET_LIST_START = '[products] set list start',
  SET_LIST_SUCCESS = '[products] set list success'
}

export const actions = {
  setListStart: (query: GeneralModel.IApiQuery) => ({ type: ActionType.SET_LIST_START, payload: { query } }),
  setListSuccess: (productsList: ProductsModel.IProducts[]) => ({ type: ActionType.SET_LIST_SUCCESS, payload: { productsList } })
};
