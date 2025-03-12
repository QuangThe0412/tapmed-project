import { ShoppingCart } from "lucide-react";
import useOrderStore from "../../stores/orderStore";

const HeaderCart = () => {
  const { orders } = useOrderStore();
  let totalItems = 0;

  if (orders) {
    totalItems = orders.orderItems.length;
  }

  return (
    <div className="relative flex items-center">
      <ShoppingCart className="w-6 h-6 text-gray-700" />
      <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
        {totalItems}
      </span>
    </div>
  );
};

export default HeaderCart;
