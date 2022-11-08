import React, { useRef,  memo, useMemo, useCallback } from 'react';
import { View, FlatList, Animated } from 'react-native';

import { ENV } from '../../../constants';
import { GeneralModel, ProductsModel, UserModel } from '../../models';
import { IEntityMap } from '../../../types';
import Products from './components/Products';
import styles from './styles';

export interface IProductsListProps {
  currentUser: UserModel.IUser;
  productsMap: IEntityMap<ProductsModel.IProducts>;
  fetchProductsList: (query: GeneralModel.IApiQuery) => void;
}

const ProductsList = ({ currentUser, productsMap, fetchProductsList }: IProductsListProps) => {
  const productsList = useMemo(() => Object.values(productsMap).sort((a, b) => (a.order > b.order ? -1 : 1)), [productsMap]);

  const keyExtractor = useCallback((item: ProductsModel.IProducts): string => item._id, []);
  const renderProducts = useCallback(({ item }: { item: ProductsModel.IProducts }) => <Products products={item} />, []);
  const onEndReached = useCallback(() => {
    fetchProductsList({ page: 1, limit: ENV.PAGINATION.LIMIT, q: { order$ls: productsList[productsList.length - 1].order } });
  }, [productsList, fetchProductsList]);
  
  const pan = useRef(new Animated.ValueXY()).current;
  return (
    <View style={styles.productsContainer}>
      <View style={styles.productsBody}>       
        <FlatList
            horizontal
            data={productsList}
            style={{ backgroundColor: '#6b6b6b', height: 250 }}
            contentContainerStyle={{ paddingVertical: 16 }}
            contentInsetAdjustmentBehavior="never"
            automaticallyAdjustContentInsets={false}
            showsHorizontalScrollIndicator={true}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={1}
            snapToAlignment="start"
            decelerationRate={"fast"}            
            renderItem={renderProducts} keyExtractor={keyExtractor} onEndReached={onEndReached} onEndReachedThreshold={0.5}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: pan.x } } }],
              {
                useNativeDriver: false,
              },
            )}  
            //onPress={() => navigate(DetailsScreen)}         
           />        
      </View>
    </View>
  );
};

export default memo(ProductsList);
