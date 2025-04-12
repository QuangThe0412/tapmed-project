export type OrderItem = {
  id: number;
  quantity: number;
  productId: number;
  imageUrls: string[];
  productName: string;
  priceAfterDiscount: number;
  priceBeforeDiscount: number;
  discountAmount: number;
  unit: string;
};

export type OrderType = {
  id: number;
  orderItems: OrderItem[];
};
