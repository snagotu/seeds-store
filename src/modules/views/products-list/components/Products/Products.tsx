import React, { memo,useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet,Image, Dimensions,TouchableOpacity, Modal, Animated } from 'react-native';

import { ProductsModel } from '../../../../models';
import { ErrorBoundary } from '../../../shared/components';
import styles from './styles';

export interface IProductsProps {
  products: ProductsModel.IProducts;
}
const ModalPopup = ({visible, children}) => {
  const [showModal,setShowModal] = useState(visible);
  const scaleValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    toggleModal();
  }, [visible]);

  const toggleModal = () => {
    if(visible) {      
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,        
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue:0,
        duration:300,
        useNativeDriver:true
      }).start();      
    }
  }
  return (
  <Modal transparent visible={showModal}>
    <View style={styles.modalBackGround}>
      <Animated.View 
        style={[styles.modalContainer, {transform:[{scale: scaleValue}]}]}>{children}</Animated.View>
    </View>
  </Modal>
  );
};
const Products = ({ products }: IProductsProps) => {
  const [visible,setVisible] = useState(false);
  return (
    <ErrorBoundary>      
      <View style={inLineStyle.container}>
      <ModalPopup visible={visible}>
        <View style={{alignItems: 'center'}}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setVisible(false)}>
                <Image 
                  source={require('../../../../../assets/x.png')}
                  style={styles.crossMark}
                />
              </TouchableOpacity>
            </View>
        </View>
        <View style={{alignItems: 'center'}}>
        <Text>Product Details</Text>        
        <Image          
          source={{ uri: `${products.image1}` }}      
          style={styles.displayImage}
        />
        <Text>Product Name: {products.title}</Text>
        <Text>Binomial Name: {products.binomialName}</Text>
        <Text>Description: {products.description}</Text>
        <Text>Price: {products.price}</Text>
        </View>
      </ModalPopup>
      <TouchableOpacity onPress={() => setVisible(true)}>
        <View style={{...styles.container,  ...{backgroundColor: products.backgroundColor}}} >        
            <Text style={{ ...styles.title, ...{color: products.textColor}}} >Product Title :{products.title.toUpperCase()}</Text>
            <Text style={{ ...styles.title, ...{color: products.textColor}}}>Product Binomial Name :{products.binomialName}</Text>        
            <Text style={{ ...styles.description, ...{color: products.textColor}}}>{products.description}</Text>
            <Text style={{ ...styles.number, ...{color: products.textColor}}}>price: {String(products.price)}</Text>
            <View style={styles.flagHeader}>
                {products.ukOnly ? <Image source={require('../../../../../assets/uk.png')} style={styles.crossMark} />: <Text />}
            </View>
        </View>      
        </TouchableOpacity> 
      </View>
    </ErrorBoundary>
  );
};

export default memo(Products);

const inLineStyle = StyleSheet.create({
  container: {     
      width: Dimensions.get("window").width,
      height: 200,
      justifyContent: "center",
      alignItems: "center",      
      alignSelf: "center",
      margin: 10
   },
  title: {
      color: "#fff",
      fontSize: 20,
   },
});
