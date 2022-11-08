import { IState, initialState } from './state';
import { ActionType } from './actions';

export const reducer = (state: IState = initialState, { type, payload }: { type: ActionType; payload: any }) => {
  switch (type) {
    case ActionType.SET_LIST_SUCCESS:
      return { ...state, productsMap: payload.productsList.reduce((total, item) => ({ ...total, [item._id]: item }), state.productsMap) };
    default:
      return state;
  }
};
