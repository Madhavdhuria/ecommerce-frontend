import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartReducerInitialState } from "../../types/reducer-types";
import { cartItem } from "../../types/types";

const initialState: CartReducerInitialState = {
  loading: false,
  cartItems: [],
  subtotal: 0,
  tax: 0,
  discount: 0,
  ShippingCharges: 0,
  total: 0,
  shippingInfo: {
    address: "",
    city: "",
    country: "",
    pincode: "",
    state: "",
  },
};

export const cartReducer = createSlice({
  name: "cartReducer",
  initialState,
  reducers: {
    addtocart: (state, action: PayloadAction<cartItem>) => {
      state.loading = true;
      let index = state.cartItems.findIndex(
        (cartitem) => cartitem.productId === action.payload.productId
      );
      if (index !== -1) state.cartItems[index] = action.payload;
      else state.cartItems.push(action.payload);
      state.loading = false;
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.cartItems = state.cartItems.filter(
        (e) => e.productId !== action.payload
      );
      state.loading = false;
    },
    calculatePrice: (state) => {
      let subtotal = state.cartItems.reduce(
        (total, currentItem) =>
          total + currentItem.quantity * currentItem.price,
        0
      );
      state.subtotal = subtotal;
      state.ShippingCharges = state.subtotal > 1000 ? 200 : 0;
      state.tax = Math.round(subtotal * 0.18);
      state.total =
        state.subtotal + state.ShippingCharges + state.tax - state.discount;
    },
    discountapplied: (state, action: PayloadAction<number>) => {
      state.discount = action.payload;
    },
  },
});

export const { addtocart, removeFromCart, calculatePrice ,discountapplied} =
  cartReducer.actions;
