import { cartItem, shippingInfo, User } from "./types";

export interface UserReducerInitialState {
  user: User | null;
  loading: boolean;
}
export interface CartReducerInitialState {
  loading: boolean;
  cartItems: cartItem[];
  subtotal: number;
  tax: number;
  ShippingCharges: number;
  discount: number;
  total: number;
  shippingInfo: shippingInfo;
}
