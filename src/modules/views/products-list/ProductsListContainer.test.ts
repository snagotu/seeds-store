import { mapStateToProps, mapDispatchToProps } from './ProductsListContainer';
import { productsState } from '../..//state-mgmt/products';
import { getState, getUser_1 } from '../../../test/entities';

describe('TodoListContainer', () => {
  it('should mapStateToProps, ', () => {
    const state = getState();
    expect(mapStateToProps(getState())).toEqual({
      todoMap: getState().products.productsMap,
      currentUser: getUser_1()
    });
  });
  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      fetchTodoList: expect.any(Function)
    });
  });

  it('should dispatch todoState setListStart on fetchTodoList', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    const query = { page: 1, limit: 1 };
    props.fetchProductsList(query);
    expect(dispatch).toBeCalledWith(productsState.actions.setListStart(query));
  });
});
