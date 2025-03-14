import { ShoppingCart } from "lucide-react";
import CartModal from "../modal/modalCart";
import useCartStore from "@src/stores/cartModalStore";

const HeaderCart = () => {
  const { isCartOpen, openCart, productCount, closeCart } = useCartStore();

  return (
    <>
      <div
        className="relative flex items-center  cursor-pointer"
        onClick={openCart}
      >
        <ShoppingCart className="w-6 h-6 text-gray-700" />
        <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
          {productCount}
        </span>
      </div>
      <CartModal isOpen={isCartOpen} onRequestClose={closeCart} />
    </>
  );
};

export default HeaderCart;
