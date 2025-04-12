import React from "react";
import useOrderStore from "../../stores/useOrderStore";
import "./quickOrder.css";
import { ProductItemType } from "@src/types/typeProduct";
import { generateSlug, parsePrice } from "@src/utils/common";
import { Minus, Plus } from "lucide-react";
import ButtonCustom from "@src/component/button/buttonCustom";
import { Link } from "react-router-dom";
import imageEx from "@src/assets/image/image-ex.jpg";
import { OrderItem } from "@src/types/typeOrder";

type OrderItemProps = {
  product: ProductItemType;
};

const QuickOrderItem: React.FC<OrderItemProps> = ({ product }) => {
  const { id, name, imageUrls, unit, price } = product;
  const image = imageUrls?.[0] || imageEx;

  const { orders, setOrders, plusQuantity, minusQuantity, updateQuantity } =
    useOrderStore();

  const orderItem =
    orders && orders.orderItems
      ? orders.orderItems.find((item) => item.productId === id)
      : undefined;

  const quantity = orderItem?.quantity || 0;

  const handleAddToCart = () => {
    const cartItem: OrderItem = {
      id: 0,
      quantity: 1,
      productId: id,
      imageUrls: imageUrls || [],
      productName: name,
      priceAfterDiscount: price || 0,
      priceBeforeDiscount: price || 0,
      discountAmount: 0,
      unit: unit || "",
    };

    setOrders({ ...orders, orderItems: [...orders?.orderItems, cartItem] });
  };

  const updateQuantityProduct = (id: number, newQuantity: number) => {
    const validValue = Math.max(
      1,
      Math.min(999, isNaN(newQuantity) ? 1 : newQuantity)
    );
    updateQuantity(id, validValue);
  };

  const slug = generateSlug(name);
  const productUrl = `/products/${slug}-${id}.html`;

  return (
    <div className="product-row">
      <div className="order-product">
        <div className="order-image">
          <Link to={productUrl} className="product-image">
            <img src={image} alt={name} />
          </Link>
        </div>
        <div className="order-info">
          <div className="product-name-wrapper line-clamp-2 text-left">
            <Link to={productUrl} className="product-name">
              {name}
            </Link>
          </div>
          <div className="grid product-prices text-left">
            <div className="price-box" id={`orderProduct-${id}`}>
              <span className="price">
                <b>Giá : {parsePrice(price)}</b>
                <br /> Đơn vị : {unit || "hộp"}
              </span>
            </div>
          </div>
          <div className="grid product-quantity warpper-quantity">
            {quantity <= 0 ? (
              <ButtonCustom
                label="Thêm vào giỏ hàng"
                onClick={() => handleAddToCart()}
              />
            ) : (
              <div className="input-group-btn">
                <button
                  type="button"
                  className="qty-minus items-count"
                  aria-label="-"
                  onClick={() => minusQuantity(id)}
                >
                  <Minus size={20} />
                </button>
                <input
                  type="text"
                  name="updates[]"
                  className="qty-num number-sidebar"
                  maxLength={4}
                  value={quantity || 0}
                  min="0"
                  aria-label="quantity"
                  pattern="[0-9]*"
                  id={`quantity-${id}`}
                  onChange={(e) =>
                    updateQuantityProduct(id, parseInt(e.target.value) || 0)
                  }
                />
                <button
                  type="button"
                  className="qty-plus items-count"
                  aria-label="+"
                  onClick={() => plusQuantity(id)}
                >
                  <Plus size={20} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickOrderItem;
