//generate order store by zustand
import { create } from "zustand";

export type OrderItem = {
  id: number;
  name: string;
  quantity: number;
  price: number;
};

export type OrderType = {
  id: number;
  orderItems: OrderItem[];
};

export interface OrderStore {
  orders: OrderType[];
  minusItem: (id: number, itemId: number) => void;
  plusItem: (id: number, itemId: number) => void;
}

const useOrderStore = create<OrderStore>((set) => ({
  orders: [],
  minusItem: (id, itemId) =>
    set((state) => ({
      orders: state.orders.map((order) => {
        if (order.id === id) {
          const orderItems = order.orderItems.map((item) => {
            if (item.id === itemId) {
              return { ...item, quantity: item.quantity - 1 };
            }
            return item;
          });
          return { ...order, orderItems };
        }
        return order;
      }),
    })),
  plusItem: (id, itemId) =>
    set((state) => ({
      orders: state.orders.map((order) => {
        if (order.id === id) {
          const orderItems = order.orderItems.map((item) => {
            if (item.id === itemId) {
              return { ...item, quantity: item.quantity + 1 };
            }
            return item;
          });
          return { ...order, orderItems };
        }
        return order;
      }),
    })),
}));

export default useOrderStore;
