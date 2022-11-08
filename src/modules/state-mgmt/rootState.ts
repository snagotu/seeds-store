import { IProducts } from './../models/products';
import { IState as IAuthState } from './auth/state';
import { IState as IUserState } from './user/state';
import { IState as IProductsState } from './products/state';
import { ApiService } from '../services/ApiService';
import { NavigationService } from '../services/NavigationService';
import { HelperService } from '../services/HelperService';
import { Logger } from '../services/Logger';

export interface IAction {
  type: string;
  payload: any;
}

export interface IRootState {
  auth: IAuthState;
  user: IUserState;
  products: IProductsState;
}

export interface IEpicDependencies {
  apiService: ApiService;
  navigationService: NavigationService;
  helperService: typeof HelperService;
  logger: typeof Logger;
}
