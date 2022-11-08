import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import ProductsListContainer from './views/products-list';
import LoginContainer from './views/login';

(ProductsListContainer as any).navigationOptions = { title: 'Products List' };

const stackNavigator = createStackNavigator(
  {
    Login: LoginContainer,
    ProductsList: ProductsListContainer
  },
  { initialRouteName: 'Login', headerMode: 'float' }
);

export default createAppContainer(stackNavigator);
