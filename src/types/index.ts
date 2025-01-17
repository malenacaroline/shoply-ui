export enum DiscountType {
  GET_3_FOR_2_DISCOUNT = "get3For2Discount",
  VIP_DISCOUNT = "vipDiscount",
}
export enum UserType {
  VIP = "vip",
  COMMON = "common",
}
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  type: UserType;
  discounts: DiscountType[];
}

export interface CartItem {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
  price: number;
  subtotal: number;
  createdAt: string;
  updatedAt: string;
  product: Product;
}

export interface Cart {
  id: number;
  userId: number;
  total: number;
  createdAt: string;
  updatedAt: string;
  items: CartItem[];
}
