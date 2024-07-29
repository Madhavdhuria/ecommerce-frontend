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
  pincode: string;
};

export type cartItem = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  quantity: number;
  stock:number;
};
