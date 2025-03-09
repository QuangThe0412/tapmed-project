import React from "react";
import { ShoppingCart } from "lucide-react";

interface HeaderCartProps {
  itemCount: number;
}

const HeaderCart: React.FC<HeaderCartProps> = ({ itemCount }) => {
  return (
    <div className="relative flex items-center">
      <ShoppingCart className="w-6 h-6 text-gray-700" />
      {itemCount > 0 && (
        <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
          {itemCount}
        </span>
      )}
    </div>
  );
};

export default HeaderCart;
