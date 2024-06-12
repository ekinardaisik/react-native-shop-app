import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { addToCart } from './actions';
import { Product } from './actions';

interface Props {
  navigation: NavigationProp<any>;
}

const ProductListScreen: React.FC<Props> = ({ navigation }) => {

  const dispatch = useDispatch();

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then((data: Product[]) => {
        setProducts(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);


  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }: { item: Product }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('ProductDetail', { title: item.title, productId: item.id })}
          >
            <View style={{ margin: 10 }}>
              <Image source={{ uri: item.image }} style={styles.image} />
            </View>
            <View style={{ display: 'flex', width: '100%', paddingHorizontal: 10, paddingBottom: 10 }}>
              <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
                <Text style={styles.price}>${item.price}</Text>
                <TouchableOpacity onPress={() => {
                  dispatch(addToCart(item));

                  Alert.alert('Başarılı', 'Ürün başarıyla sepetinize eklendi.', [
                    { text: 'Tamam', onPress: () => { } }
                  ]);
                }}>
                  <AntDesign name="hearto" size={24} color="black" />
                </TouchableOpacity>
              </View>
              <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  card: {
    flex: 1,
    marginVertical: 12,
    marginHorizontal: 6,
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 'auto',
    aspectRatio: 1,
  },
  price: {
    color: 'red',
    fontWeight: 'bold',
  },
  title: {
    width: '100%'
  },
});

export default ProductListScreen;
