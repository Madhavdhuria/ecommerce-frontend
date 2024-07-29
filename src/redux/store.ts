import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./api/productApi";
import { userAPI } from "./api/userAPI";
import { cartReducer } from "./reducer/cartReducer";
import { userReducer } from "./reducer/userReducer";
export const server = import.meta.env.VITE_SERVER;

export const store = configureStore({
  reducer: {
    [userAPI.reducerPath]: userAPI.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [userReducer.name]: userReducer.reducer,
    [cartReducer.name]: cartReducer.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userAPI.middleware, productApi.middleware),
});
