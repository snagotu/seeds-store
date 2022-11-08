import { reducer } from './reducer';
import { epics } from './epics';
import { initialState } from './state';
import { actions, ActionType } from './actions';

export { IState as IProductsstate } from './state';
export const productsState = { actions, ActionType, reducer, epics, initialState };
