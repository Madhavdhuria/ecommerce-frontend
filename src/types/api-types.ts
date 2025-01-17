import { Bar, cartItem, Line, Order, Pie, Product, shippingInfo, Stats, User } from "./types";

export type customerror = {
  status: number;
  data: {
    success: boolean;
    message: string;
  };
};

export type MessageResponse = {
  success: boolean;
  message: string;
};

export type UserResponse = {
  success: boolean;
  user: User;
};

export type AllUsersResponse = {
  success: boolean;
  users: User[];
};

export type AllProductsResponse = {
  success: boolean;
  products: Product[];
};

export type SearchProductsResponse = {
  success: boolean;
  products: Product[];
  totalPages: number;
};

export type AllCategoriesResponse = {
  success: boolean;
  categories: string[];
};

export type AllOrdersResponse = {
  success: boolean;
  orders: Order[];
};

export type OrderDetailsResponse = {
  success: boolean;
  order: Order;
};

export type statsResponse = {
  success: boolean;
  stats: Stats;
};

export type PieResponse = {
  success: boolean;
  charts: Pie;
};

export type BarResponse = {
  success: boolean;
  charts: Bar;
};

export type LineResponse = {
  success: boolean;
  charts: Line;
};

export type SearchProductsParams = {
  price: number;
  page: number;
  search: string;
  category: string;
  sort: string;
};

export type newproductrequest = {
  id: string;
  formData: FormData;
};

export type updateproductrequest = {
  Productid: string;
  Userid: string;
  formData: FormData;
};

export type deleteproductrequest = {
  Productid: string;
  Userid: string;
};

export type NewOrderRequest = {
  shippingInfo: shippingInfo;
  orderItems: cartItem[];
  subtotal: number;
  tax: number;
  ShippingCharges: number;
  discount: number;
  total: number;
  user: string;
};

export type UpdateOrderRequest = {
  userId: string;
  orderId: string;
};

export type DeleteUserRequest = {
  userId: string;
  adminUserId: string;
};
