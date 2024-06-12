import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, Text, StyleSheet } from 'react-native';
import { Entypo, Feather } from '@expo/vector-icons';
import ProductListScreen from './ProductListScreen';
import CartScreen from './CartScreen';
import ProductDetail from './ProductDetail';
import { Provider } from 'react-redux';
import store from './store';

export type RootStackParamList = {
  Home: undefined;
  ProductDetail: { title: string; productId: number };
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const HomeScreen = () => (
  <View style={styles.center}>
    <Text>Ana sayfa ekranı</Text>
  </View>
);

const SettingsScreen = () => (
  <View style={styles.center}>
    <Text>Ayarlar ekranı</Text>
  </View>
);


const Tabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Ana Sayfa"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" color={color} size={size} />
          ),
          tabBarLabel: () => null,
          headerTitleAlign: 'center'

        }}
      />
      <Tab.Screen
        name="Ürün Listesi"
        component={ProductListScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="list" color={color} size={size} />
          ),
          tabBarLabel: () => null,
          headerTitleAlign: 'center'

        }}
      />
      <Tab.Screen
        name="Sepet"
        component={CartScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="shopping-cart" color={color} size={size} />
          ),
          tabBarLabel: () => null,
          headerTitleAlign: 'center'

        }}
      />

      <Tab.Screen
        name="Ayarlar"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="settings" color={color} size={size} />
          ),
          tabBarLabel: () => null,
          headerTitleAlign: 'center'
        }}
      />
    </Tab.Navigator>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Tabs} options={{ headerShown: false }} />
            <Stack.Screen
              name="ProductDetail"
              component={ProductDetail}
              options={({ route }) => ({
                title: route.params?.title ? (route.params.title.length > 20 ? route.params.title.slice(0, 20) + "..." : route.params.title) : 'Null',
              })}

            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
