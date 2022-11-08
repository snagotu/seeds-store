import { StyleSheet } from 'react-native';
import { STYLE } from '../../../constants';

export default StyleSheet.create({
  productsContainer: {
    flex: 1,
    backgroundColor: STYLE.COLOR.QUINARY
  },
  productsBody: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1
  }
});
