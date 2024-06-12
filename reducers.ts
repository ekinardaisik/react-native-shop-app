import { ADD_TO_CART, REMOVE_FROM_CART, CartAction, Product } from './actions';

interface CartState {
  items: Product[];
}

const initialState: CartState = {
  items: [],
};

const cartReducer = (state = initialState, action: CartAction): CartState => {
  switch (action.type) {
    case ADD_TO_CART: {
      const itemIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (itemIndex >= 0) {
        // Ürün zaten sepette var, miktarını artır
        const updatedItems = state.items.map((item, index) =>
          index === itemIndex ? { ...item, quantity: item.quantity + 1 } : item
        );
        return { ...state, items: updatedItems };
      } else {
        // Ürün sepette yok, ekleyelim ve miktarını 1 yapalım
        return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] };
      }
    }
    case REMOVE_FROM_CART: {
      const itemIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (itemIndex >= 0 && state.items[itemIndex].quantity > 1) {
        // Ürün sepette var ve miktarı 1'den fazla, miktarını azalt
        const updatedItems = state.items.map((item, index) =>
          index === itemIndex ? { ...item, quantity: item.quantity - 1 } : item
        );
        return { ...state, items: updatedItems };
      } else {
        // Ürün sepette 1 adet var, ürünü sepette tamamen kaldır
        const updatedItems = state.items.filter(item => item.id !== action.payload.id);
        return { ...state, items: updatedItems };
      }
    }
    default:
      return state;
  }
};

export default cartReducer;
