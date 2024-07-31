export interface User {
  name: string;
  email: string;
  photo: string;
  dob: string;
  gender: string;
  role: string;
  _id: string;
}

export type Product = {
  name: string;
  photo: string;
  stock: number;
  category: string;
  price: number;
  _id: string;
};

export type shippingInfo = {
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
};

export type cartItem = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  quantity: number;
  stock: number;
};

export type OrderItem = Omit<cartItem, "stock"> & { _id: string };

export type Order = {
  orderItems: OrderItem[];
  shippingInfo: shippingInfo;
  subtotal: number;
  tax: number;
  ShippingCharges: number;
  discount: number;
  total: number;
  status: string;
  user: {
    name: string;
    _id: string;
  };
  _id: string;
};
