import { connect } from 'react-redux';

import { GeneralModel } from '../../models';
import { IRootState } from '../../state-mgmt/rootState';
import { productsState } from '../..//state-mgmt/products';
import ProductsList from './ProductsList';

export const mapStateToProps = (state: IRootState) => ({
  productsMap: state.products.productsMap,
  currentUser: state.user.userMap[state.auth.currentUserId]
});

export const mapDispatchToProps = dispatch => ({
  fetchProductsList: (query: GeneralModel.IApiQuery) => dispatch(productsState.actions.setListStart(query))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsList);
