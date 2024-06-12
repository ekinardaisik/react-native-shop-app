// actions.ts
export const ADD_TO_CART = 'ADD_TO_CART' as const;
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART' as const;

export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  description:string;
  category:string;
}

export type CartAction = {
  type: typeof ADD_TO_CART | typeof REMOVE_FROM_CART;
  payload: Product;
}

export const addToCart = (product: Product): CartAction => ({
  type: ADD_TO_CART,
  payload: product,
});

export const removeFromCart = (product: Product): CartAction => ({
  type: REMOVE_FROM_CART,
  payload: product,
});
