import { ProductsModel } from '../../models';
import { IEntityMap } from '../../../types';

export interface IState {
  productsMap: IEntityMap<ProductsModel.IProducts>;
}

export const initialState = {
  productsMap: {}
};
