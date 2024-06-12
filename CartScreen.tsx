import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { AntDesign } from '@expo/vector-icons';
import { Product, addToCart, removeFromCart } from './actions';
import { NavigationProp } from '@react-navigation/native';


interface Props {
  navigation: NavigationProp<any>;
}
const CartScreen: React.FC<Props> = ({ navigation }) => {
  const cartItems = useSelector((state: RootState) => state.cart.items);


  const dispatch = useDispatch();

  const confirmButton = (item: Product) =>

    Alert.alert('Emin misiniz?', 'Bu ürün sepetinizden kaldırılacaktır. Onaylıyor musunuz?', [
      { text: 'İptal', onPress: () => { } },
      {
        text: 'Evet',
        onPress: () => dispatch(removeFromCart(item))
      },

    ]);
  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { title: item.title, productId: item.id })} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View>
                <Text
                  style={styles.title}
                  numberOfLines={1}
                  ellipsizeMode='tail'
                >
                  {item.title || 'Null'}
                </Text>
                <Text style={{ marginVertical: 5, width: 135, fontSize: 13, color: '#888888' }} numberOfLines={1}
                  ellipsizeMode='tail'>{item.category}</Text>
                <Text style={styles.price}>${item.price}</Text>

              </View>

            </TouchableOpacity>
            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 5 }}>

              <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginLeft: 10 }}>
                <TouchableOpacity onPress={
                  () => {
                    if (item.quantity == 1) {
                      confirmButton(item)
                    } else {
                      dispatch(removeFromCart(item))

                    }
                  }
                }>
                  <AntDesign name={item.quantity == 1 ? "delete" : "minuscircleo"} size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.quantity}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => dispatch(addToCart(item))}>
                  <AntDesign name="pluscircleo" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
      <View style={styles.footer}>
        <Text style={styles.total}>Toplam: ${cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}</Text>
        <TouchableOpacity style={styles.payNow}>
          <Text style={styles.payText}>Siparişi Tamamla</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cartItem: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5
  },
  image: {
    width: 80,
    height: 80,
    objectFit: 'contain',
    backgroundColor: "#f2f2f2",
    marginRight: 15,
  },
  title: {
    width: 135,
    fontSize: 15,
  },
  quantity: {
    marginHorizontal: 10
  },
  footer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 13,
    fontWeight: 'bold'
  },
  payNow: {
    backgroundColor: 'red',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 7,
    alignItems: 'center',
  },
  payText: {
    fontSize: 15,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CartScreen;
