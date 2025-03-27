import { ProductItemType } from "./typeProduct";

export type OrderItem = {
  id: number;
  quantity: number;
  idProduct: number;
  product: ProductItemType;
};

export type OrderType = {
  id: number;
  orderItems: OrderItem[];
};
