import React from 'react';
import { mount } from 'enzyme';
import { create } from 'react-test-renderer';

import Products, { IProductsListProps } from './ProductsList';
import { ENV } from '../../../constants';
import { getState, getUser_1, getProducts_1 } from '../../../test/entities';

describe('Products', () => {
  let props: IProductsListProps;
  let wrapper;

  global.console.error = () => null;
  beforeEach(() => {
    props = {
      currentUser: getUser_1(),
      productsMap: getState().products.productsMap,
      fetchProductsList: jest.fn()
    };
    wrapper = mount(<Products {...props} />);
  });

  it('should render', () => {
    expect(create(wrapper).toJSON()).toMatchSnapshot();
  });

  it('should onEndReached', () => {
    props.productsMap = { [getProducts_1()._id]: getProducts_1() };
    wrapper = mount(<Products {...props} />);
    wrapper
      .find('FlatList')
      .props()
      .onEndReached();
    expect(props.fetchProductsList).toBeCalledWith({ page: 1, limit: ENV.PAGINATION.LIMIT, q: { createdAt$ls: getProducts_1().createdAt } });
  });
});
