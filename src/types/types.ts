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

type CountAndChange = {
  revenue: number;
  product: number;
  user: number;
  order: number;
};

type LatestTransaction = {
  _id: string;
  amount: number;
  discount: number;
  quantity: number;
  status: string;
};

export type Stats = {
  categoryCount: Record<string, number>[];
  ChangePercent: CountAndChange;
  count: CountAndChange;
  chart: {
    order: number[];
    revenue: number[];
  };
  userRatio: {
    male: number;
    female: number;
  };
  latestTransaction: LatestTransaction[];
};

type OrderFullfillment = {
  Processing: number;
  Shipped: number;
  Delivered: number;
};

type RevenueDistribution = {
  netMargin: number;
  discount: number;
  productionCost: number;
  burnt: number;
  marketingCost: number;
};

type UsersAgeGroup = {
  teen: number;
  adult: number;
  old: number;
};

export type Pie = {
  orderFullfillment: OrderFullfillment;
  productCategories: Record<string, number>[];
  stockAvailablity: {
    InStock: number;
    OutOfStack: number;
  };
  revenueDistribution: RevenueDistribution;
  usersAgeGroup: UsersAgeGroup;
  adminCustomer: {
    admin: number;
    customer: number;
  };
};


// {
//   "success": true,
//   "charts": {
//       "orderFullfillment": {
//           "Processing": 0,
//           "Shipped": 0,
//           "Delivered": 0
//       },
//       "productCategories": [
//           {
//               "laptop": 100
//           }
//       ],
//       "stockAvailablity": {
//           "InStock": 1,
//           "OutOfStack": 0
//       },
//       "revenueDistribution": {
//           "netMargin": 0,
//           "discount": 0,
//           "productionCost": 0,
//           "burnt": 0,
//           "marketingCost": 0
//       },
//       "usersAgeGroup": {
//           "teen": 0,
//           "adult": 1,
//           "old": 0
//       },
//       "adminCustomer": {
//           "admin": 1,
//           "customer": 0
//       }
//   }
// }