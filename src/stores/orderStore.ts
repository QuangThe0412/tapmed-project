import { OrderType } from "@src/types/typeOrder";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const NAME_STORAGE_ORDER = "order";

export interface OrderStore {
  orders: OrderType;
  minusQuantity: (itemId: number) => void;
  plusQuantity: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  removeItem: (itemId: number) => void;
}

// Lấy dữ liệu ban đầu từ localStorage (nếu có)
const getInitialState = (): OrderType => {
  const savedOrders = localStorage.getItem(NAME_STORAGE_ORDER);
  return savedOrders ? JSON.parse(savedOrders) : { id: 0, orderItems: [] };
};

const useOrderStore = create<OrderStore>()(
  persist(
    (set) => ({
      orders: getInitialState(),

      minusQuantity: (itemId: number) =>
        set((state) => {
          const updatedItems = state.orders.orderItems.map((item) => {
            if (item.id === itemId) {
              // Don't go below zero
              const newQuantity = Math.max(0, item.quantity - 1);
              return { ...item, quantity: newQuantity };
            }
            return item;
          });

          // Lọc bỏ các item có quantity = 0
          const filteredItems = updatedItems.filter(
            (item) => item.quantity > 0
          );

          return {
            orders: {
              ...state.orders,
              orderItems: filteredItems,
            },
          };
        }),

      plusQuantity: (itemId: number) =>
        set((state) => {
          const existingItem = state.orders.orderItems.find(
            (item) => item.id === itemId
          );

          if (existingItem) {
            // Item exists - increment quantity
            return {
              orders: {
                ...state.orders,
                orderItems: state.orders.orderItems.map((item) =>
                  item.id === itemId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
                ),
              },
            };
          } else {
            // Item doesn't exist - add new item
            return {
              orders: {
                ...state.orders,
                orderItems: [
                  ...state.orders.orderItems,
                  { id: itemId, quantity: 1 },
                ],
              },
            };
          }
        }),
      updateQuantity: (itemId: number, quantity: number) =>
        set((state) => {
          return {
            orders: {
              ...state.orders,
              orderItems: state.orders.orderItems.map((item) =>
                item.id === itemId ? { ...item, quantity: quantity } : item
              ),
            },
          };
        }),
      removeItem: (itemId: number) =>
        set((state) => {
          return {
            orders: {
              ...state.orders,
              orderItems: state.orders.orderItems.filter(
                (item) => item.id !== itemId
              ),
            },
          };
        }),
    }),
    {
      name: NAME_STORAGE_ORDER, // Tên key trong localStorage
      partialize: (state) => ({ orders: state.orders }), // Chỉ lưu trữ trường orders
    }
  )
);

export default useOrderStore;
