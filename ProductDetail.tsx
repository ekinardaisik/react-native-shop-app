import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from './App';
import { Product } from './actions';
import { useDispatch } from 'react-redux';
import { addToCart } from './actions';

type ProductDetailProps = StackScreenProps<RootStackParamList, 'ProductDetail'>;


const ProductDetail: React.FC<ProductDetailProps> = ({ route }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState<Product>();
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/' + productId)
      .then(response => response.json())
      .then(data => {
        setProduct(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [productId]);

  return (
    <View style={styles.container}>
      {product && (
        <>
          <Image source={{ uri: product.image }} style={styles.image} />
          <Text style={styles.title}>{product.title}</Text>
          <ScrollView style={{}}>
            <Text style={styles.description}>{product.description}</Text>
          </ScrollView>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              dispatch(addToCart(product));
              Alert.alert('Başarılı', 'Ürün başarıyla sepetinize eklendi.', [
                { text: 'Tamam', onPress: () => { } }
              ]);
            }}
          >
            <Text style={styles.buttonText}>Sepete Ekle - ${product.price}</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    height: undefined
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 14,
    textAlign: 'left'
  },
  description: {
    fontSize: 15,
    textAlign: 'left',
    marginTop: 12,
    paddingBottom: 15
  },
  button: {
    backgroundColor: 'red',
    padding: 7,
    borderRadius: 5,
    fontSize: 16,
    marginTop: 'auto',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default ProductDetail;