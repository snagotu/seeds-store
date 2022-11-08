import React from 'react';
import { create } from 'react-test-renderer';
import { mount } from 'enzyme';

import Todo, { IProductsProps } from './Products';
import { getProducts_1 } from '../../../../../test/entities';

describe('Login', () => {
  let props: IProductsProps;
  let wrapper;

  global.console.error = () => null;
  beforeEach(() => {
    props = { products: getProducts_1() };
    wrapper = mount(<Todo {...props} />);
  });

  it('should render', () => {
    expect(create(wrapper).toJSON()).toMatchSnapshot();
  });
});
