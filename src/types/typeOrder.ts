import { ProductItemType } from "./typeProduct";

export type OrderItem = ProductItemType & {
  quantity: number;
};

export type OrderType = {
  id: number;
  orderItems: OrderItem[];
};
