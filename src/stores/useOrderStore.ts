import { OrderType } from "@src/types/typeOrder";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const NAME_STORAGE_ORDER = "orders";

export const initOrderType: OrderType = {
  id: 0,
  orderItems: [],
};

export interface OrderStore {
  orders: OrderType;
  setOrders: (orders?: OrderType) => void;
  minusQuantity: (itemId: number) => void;
  plusQuantity: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  removeItem: (itemId: number) => void;
}

// Lấy dữ liệu ban đầu từ localStorage (nếu có)
const getInitialState = (): OrderType => {
  try {
    const savedOrders = localStorage.getItem(NAME_STORAGE_ORDER);
    const parsedOrders = savedOrders ? JSON.parse(savedOrders) : null;

    // Đảm bảo orderItems luôn là một mảng
    if (parsedOrders && Array.isArray(parsedOrders.orderItems)) {
      return parsedOrders;
    }
  } catch (error) {
    console.error("Error parsing orders from localStorage:", error);
  }

  // Trả về giá trị mặc định nếu không có dữ liệu hợp lệ
  return initOrderType;
};

const useOrderStore = create<OrderStore>()(
  persist(
    (set) => ({
      orders: getInitialState(),
      setOrders: (orders) => {
        set({ orders });
      },
      minusQuantity: (itemId: number) =>
        set((state) => {
          const orderItems = Array.isArray(state.orders.orderItems)
            ? state.orders.orderItems
            : []; // Đảm bảo orderItems luôn là một mảng

          const updatedItems = orderItems?.map((item) => {
            if (item?.productId === itemId) {
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
          const orderItems = Array.isArray(state.orders.orderItems)
            ? state.orders.orderItems
            : []; // Đảm bảo orderItems luôn là một mảng

          const existingItem = orderItems.find(
            (item) => item?.productId === itemId
          );

          if (existingItem) {
            // Item exists - increment quantity
            return {
              orders: {
                ...state.orders,
                orderItems: orderItems?.map((item) =>
                  item?.productId === itemId
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
                orderItems: [...orderItems, { productId: itemId, quantity: 1 }],
              },
            };
          }
        }),
      updateQuantity: (itemId: number, quantity: number) =>
        set((state) => {
          const orderItems = Array.isArray(state.orders.orderItems)
            ? state.orders.orderItems
            : []; // Đảm bảo orderItems luôn là một mảng
          return {
            orders: {
              ...state.orders,
              orderItems: orderItems?.map((item) =>
                item?.productId === itemId ? { ...item, quantity } : item
              ),
            },
          };
        }),
      removeItem: (itemId: number) =>
        set((state) => {
          const orderItems = Array.isArray(state.orders.orderItems)
            ? state.orders.orderItems
            : []; // Đảm bảo orderItems luôn là một mảng
          return {
            orders: {
              ...state.orders,
              orderItems: orderItems.filter(
                (item) => item?.productId !== itemId
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
